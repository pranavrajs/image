import { withLeadingSlash } from 'ufo';
import { useNuxt, createResolver, resolvePath, defineNuxtModule, addAutoImport, addComponent, addTemplate, addPlugin } from '@nuxt/kit';
import { promises } from 'fs';
import { resolve, dirname, normalize } from 'pathe';
import { hash } from 'ohash';
import { eventHandler } from 'h3';

const ipxSetup = async (_providerOptions, moduleOptions) => {
  const nuxt = useNuxt();
  const hasUserProvidedIPX = nuxt.options.serverHandlers.find((handler) => handler.route?.startsWith("/_ipx")) || nuxt.options.devServerHandlers.find((handler) => handler.route?.startsWith("/_ipx"));
  if (hasUserProvidedIPX) {
    return;
  }
  const ipxOptions = {
    dir: resolve(nuxt.options.srcDir, moduleOptions.dir || nuxt.options.dir.public),
    domains: moduleOptions.domains,
    sharp: moduleOptions.sharp,
    alias: moduleOptions.alias
  };
  if (!nuxt.options.dev) {
    const resolver = createResolver(import.meta.url);
    ipxOptions.dir = "";
    nuxt.options.runtimeConfig.ipx = ipxOptions;
    nuxt.options.serverHandlers.push({
      route: "/_ipx/**",
      handler: resolver.resolve("./runtime/ipx")
    });
  }
  const { createIPX, createIPXMiddleware } = await import('ipx').catch((err) => {
    console.error("[@nuxt/image] `ipx` is an optional dependency for local image optimization and is not installed.");
    throw new Error(err);
  });
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  nuxt.options.devServerHandlers.push({
    route: "/_ipx",
    handler: eventHandler(async (event) => {
      await middleware(event.req, event.res);
    })
  });
};

const BuiltInProviders = [
  "cloudflare",
  "cloudinary",
  "contentful",
  "cloudimage",
  "fastly",
  "glide",
  "imagekit",
  "gumlet",
  "imgix",
  "ipx",
  "netlify",
  "layer0",
  "prismic",
  "sanity",
  "twicpics",
  "strapi",
  "storyblok",
  "unsplash",
  "vercel",
  "imageengine"
];
const providerSetup = {
  ipx: ipxSetup,
  static: ipxSetup,
  async vercel(_providerOptions, moduleOptions, nuxt) {
    const imagesConfig = resolve(nuxt.options.rootDir, ".vercel_build_output/config/images.json");
    await promises.mkdir(dirname(imagesConfig), { recursive: true });
    await promises.writeFile(imagesConfig, JSON.stringify({
      domains: moduleOptions.domains,
      sizes: Array.from(new Set(Object.values(moduleOptions.screens || {})))
    }, null, 2));
  }
};
async function resolveProviders(nuxt, options) {
  const providers = [];
  for (const key in options) {
    if (BuiltInProviders.includes(key)) {
      providers.push(await resolveProvider(nuxt, key, { provider: key, options: options[key] }));
    }
  }
  for (const key in options.providers) {
    providers.push(await resolveProvider(nuxt, key, options.providers[key]));
  }
  return providers;
}
async function resolveProvider(_nuxt, key, input) {
  if (typeof input === "string") {
    input = { name: input };
  }
  if (!input.name) {
    input.name = key;
  }
  if (!input.provider) {
    input.provider = input.name;
  }
  const resolver = createResolver(import.meta.url);
  input.provider = BuiltInProviders.includes(input.provider) ? await resolver.resolve("./runtime/providers/" + input.provider) : await resolvePath(input.provider);
  const setup = input.setup || providerSetup[input.name];
  return {
    ...input,
    setup,
    runtime: normalize(input.provider),
    importName: `${key}Runtime$${hash(input.provider, 4)}`,
    runtimeOptions: input.options
  };
}
function detectProvider(userInput) {
  if (process.env.NUXT_IMAGE_PROVIDER) {
    return process.env.NUXT_IMAGE_PROVIDER;
  }
  if (userInput && userInput !== "auto") {
    return userInput;
  }
  if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.NOW_BUILDER) {
    return "vercel";
  }
  return "ipx";
}

const module = defineNuxtModule({
  defaults: {
    staticFilename: "[publicPath]/image/[hash][ext]",
    provider: "auto",
    dir: void 0,
    presets: {},
    domains: [],
    sharp: {},
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536
    },
    internalUrl: "",
    providers: {},
    alias: {}
  },
  meta: {
    name: "@nuxt/image",
    configKey: "image",
    compatibility: {
      nuxt: "^3.0.0-rc.4"
    }
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    options.domains = options.domains.map((d) => {
      if (!d.startsWith("http")) {
        d = "http://" + d;
      }
      return new URL(d).hostname;
    }).filter(Boolean);
    options.alias = Object.fromEntries(Object.entries(options.alias).map((e) => [withLeadingSlash(e[0]), e[1]]));
    options.provider = detectProvider(options.provider);
    options[options.provider] = options[options.provider] || {};
    const imageOptions = pick(options, [
      "screens",
      "presets",
      "provider",
      "domains",
      "alias"
    ]);
    const providers = await resolveProviders(nuxt, options);
    for (const p of providers) {
      if (typeof p.setup === "function") {
        await p.setup(p, options, nuxt);
      }
    }
    const runtimeDir = resolver.resolve("./runtime");
    nuxt.options.alias["#image"] = runtimeDir;
    nuxt.options.build.transpile.push(runtimeDir);
    addAutoImport({
      name: "useImage",
      from: resolver.resolve("runtime/composables")
    });
    addComponent({
      name: "NuxtImg",
      filePath: resolver.resolve("./runtime/components/nuxt-img")
    });
    addComponent({
      name: "NuxtPicture",
      filePath: resolver.resolve("./runtime/components/nuxt-picture")
    });
    addTemplate({
      filename: "image-options.mjs",
      getContents() {
        return `
${providers.map((p) => `import * as ${p.importName} from '${p.runtime}'`).join("\n")}

export const imageOptions = ${JSON.stringify(imageOptions, null, 2)}

imageOptions.providers = {
${providers.map((p) => `  ['${p.name}']: { provider: ${p.importName}, defaults: ${JSON.stringify(p.runtimeOptions)} }`).join(",\n")}
}
        `;
      }
    });
    addPlugin({ src: resolver.resolve("./runtime/plugin") });
  }
});
function pick(obj, keys) {
  const newobj = {};
  for (const key of keys) {
    newobj[key] = obj[key];
  }
  return newobj;
}

export { module as default };
