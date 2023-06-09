import { useMemo } from "react";

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
export const DOTS = "...";
interface usePaginationProps {
	totalPages: number;
	currentPage: number;
	siblingCount?: number;
}
export const usePagination = ({ totalPages, currentPage, siblingCount = 2 }: usePaginationProps) => {
	return useMemo(() => {
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
		const itemCount = 3 + 2 * siblingCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftRange = range(1, itemCount);
			return [...leftRange, DOTS, totalPages];
		} else if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightRange = range(totalPages - itemCount + 1, totalPages);
			return [1, DOTS, ...rightRange];
		} else if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [1, DOTS, ...middleRange, DOTS, totalPages];
		}
	}, [totalPages, currentPage, siblingCount]);
};
