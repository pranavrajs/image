
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['image']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['image']?: ModuleOptions }
}


export { default } from './module'
