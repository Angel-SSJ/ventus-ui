import { tv as tvBase, type VariantProps } from "tailwind-variants";

const tv: typeof tvBase = (options, config) =>
	tvBase(options, {
		...config,
		twMerge: true,
		twMergeConfig: {
			...config?.twMergeConfig,
			classGroups: {
				...config?.twMergeConfig?.classGroups,
			},
		},
	});

export { tv, type VariantProps };
