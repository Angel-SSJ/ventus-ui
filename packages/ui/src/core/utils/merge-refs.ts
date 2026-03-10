import type { MutableRefObject, Ref, RefCallback } from "react";

type PossibleRef<T> = Ref<T> | MutableRefObject<T> | undefined | null;

function assignRef<T>(ref: PossibleRef<T>, value: T): void | (() => void) {
	if (typeof ref === "function") {
		const cleanup = ref(value);
		return typeof cleanup === "function" ? cleanup : undefined;
	}

	if (ref != null) {
		(ref as MutableRefObject<T>).current = value;
	}
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
	return (value: T) => {
		const cleanups: (() => void)[] = [];

		for (const ref of refs) {
			const cleanup = assignRef(ref, value);
			if (cleanup) {
				cleanups.push(cleanup);
			}
		}

		if (cleanups.length > 0) {
			return () => {
				for (const cleanup of cleanups) {
					cleanup();
				}
			};
		}

		return undefined;
	};
}
