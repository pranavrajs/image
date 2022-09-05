import type { ExtractPropTypes } from 'vue';
export declare const baseImageProps: {
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
        type: () => 'anonymous' | 'use-credentials' | boolean;
        default: any;
        validator: (val: any) => boolean;
    };
    decoding: {
        type: () => 'async' | 'auto' | 'sync';
        default: any;
        validator: (val: any) => boolean;
    };
};
export interface BaseImageAttrs {
    width?: number;
    height?: number;
    alt?: string;
    referrerpolicy?: string;
    usemap?: string;
    longdesc?: string;
    ismap?: boolean;
    crossorigin?: '' | 'anonymous' | 'use-credentials';
    loading?: string;
    decoding?: 'async' | 'auto' | 'sync';
}
export interface BaseImageModifiers {
    width?: number;
    height?: number;
    format?: string;
    quality?: string | number;
    background?: string;
    fit?: string;
    [key: string]: any;
}
export declare const useBaseImage: (props: ExtractPropTypes<typeof baseImageProps>) => {
    options: import("vue").ComputedRef<{
        provider: string;
        preset: string;
    }>;
    attrs: import("vue").ComputedRef<BaseImageAttrs>;
    modifiers: import("vue").ComputedRef<BaseImageModifiers>;
};
