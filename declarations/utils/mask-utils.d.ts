interface CompiledMasks {
    mask: string;
    definition?: Record<string, string>;
    startsWith: string;
    default: boolean;
    lazy?: boolean;
}
export interface DynamicMasked {
    rawInputValue: string;
    compiledMasks: CompiledMasks[];
}
export declare const maskSpecialCharDefinition: {
    '#': RegExp;
    '&': RegExp;
    $: RegExp;
};
export declare function getMaskForPrefixOrDefault(_appended: string, dynamicMasked: DynamicMasked): CompiledMasks | undefined;
export {};
//# sourceMappingURL=mask-utils.d.ts.map