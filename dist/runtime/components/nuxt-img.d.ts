export declare const imgProps: {
    placeholder: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor | ArrayConstructor)[];
        default: any;
    };
    src: {
        type: StringConstructor;
        required: boolean;
    };
    format: {
        type: StringConstructor;
        default: any;
    };
    quality: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    background: {
        type: StringConstructor;
        default: any;
    };
    fit: {
        type: StringConstructor;
        default: any;
    };
    modifiers: {
        type: () => Record<string, any>;
        default: any;
    };
    preset: {
        type: StringConstructor;
        default: any;
    };
    provider: {
        type: StringConstructor;
        default: any;
    };
    sizes: {
        type: () => string | Record<string, any>;
        default: any;
    };
    preload: {
        type: BooleanConstructor;
        default: any;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    alt: {
        type: StringConstructor;
        default: any;
    };
    referrerpolicy: {
        type: StringConstructor;
        default: any;
    };
    usemap: {
        type: StringConstructor;
        default: any;
    };
    longdesc: {
        type: StringConstructor;
        default: any;
    };
    ismap: {
        type: BooleanConstructor;
        default: any;
    };
    loading: {
        type: StringConstructor;
        default: any;
    };
    crossorigin: {
        type: () => boolean | "anonymous" | "use-credentials";
        default: any;
        validator: (val: any) => boolean;
    };
    decoding: {
        type: () => "async" | "auto" | "sync";
        default: any;
        validator: (val: any) => boolean;
    };
};
declare const _default: import("vue").DefineComponent<{
    placeholder: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor | ArrayConstructor)[];
        default: any;
    };
    src: {
        type: StringConstructor;
        required: boolean;
    };
    format: {
        type: StringConstructor;
        default: any;
    };
    quality: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    background: {
        type: StringConstructor;
        default: any;
    };
    fit: {
        type: StringConstructor;
        default: any;
    };
    modifiers: {
        type: () => Record<string, any>;
        default: any;
    };
    preset: {
        type: StringConstructor;
        default: any;
    };
    provider: {
        type: StringConstructor;
        default: any;
    };
    sizes: {
        type: () => string | Record<string, any>;
        default: any;
    };
    preload: {
        type: BooleanConstructor;
        default: any;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    alt: {
        type: StringConstructor;
        default: any;
    };
    referrerpolicy: {
        type: StringConstructor;
        default: any;
    };
    usemap: {
        type: StringConstructor;
        default: any;
    };
    longdesc: {
        type: StringConstructor;
        default: any;
    };
    ismap: {
        type: BooleanConstructor;
        default: any;
    };
    loading: {
        type: StringConstructor;
        default: any;
    };
    crossorigin: {
        type: () => boolean | "anonymous" | "use-credentials";
        default: any;
        validator: (val: any) => boolean;
    };
    decoding: {
        type: () => "async" | "auto" | "sync";
        default: any;
        validator: (val: any) => boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placeholder: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor | ArrayConstructor)[];
        default: any;
    };
    src: {
        type: StringConstructor;
        required: boolean;
    };
    format: {
        type: StringConstructor;
        default: any;
    };
    quality: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    background: {
        type: StringConstructor;
        default: any;
    };
    fit: {
        type: StringConstructor;
        default: any;
    };
    modifiers: {
        type: () => Record<string, any>;
        default: any;
    };
    preset: {
        type: StringConstructor;
        default: any;
    };
    provider: {
        type: StringConstructor;
        default: any;
    };
    sizes: {
        type: () => string | Record<string, any>;
        default: any;
    };
    preload: {
        type: BooleanConstructor;
        default: any;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    alt: {
        type: StringConstructor;
        default: any;
    };
    referrerpolicy: {
        type: StringConstructor;
        default: any;
    };
    usemap: {
        type: StringConstructor;
        default: any;
    };
    longdesc: {
        type: StringConstructor;
        default: any;
    };
    ismap: {
        type: BooleanConstructor;
        default: any;
    };
    loading: {
        type: StringConstructor;
        default: any;
    };
    crossorigin: {
        type: () => boolean | "anonymous" | "use-credentials";
        default: any;
        validator: (val: any) => boolean;
    };
    decoding: {
        type: () => "async" | "auto" | "sync";
        default: any;
        validator: (val: any) => boolean;
    };
}>>, {
    width: string | number;
    height: string | number;
    fit: string;
    format: string;
    provider: string;
    preset: string;
    modifiers: any;
    sizes: any;
    quality: string | number;
    background: string;
    preload: boolean;
    alt: string;
    referrerpolicy: string;
    usemap: string;
    longdesc: string;
    ismap: boolean;
    loading: string;
    crossorigin: boolean | "anonymous" | "use-credentials";
    decoding: "async" | "auto" | "sync";
    placeholder: string | number | boolean | unknown[];
}>;
export default _default;
