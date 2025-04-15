import { DISPOSED_LEFT_CLASS, DISPOSED_RIGHT_CLASS } from './ImageCarousel.constants';

export function classNames(classes: Record<string, boolean | undefined>) {
    return Object.entries(classes)
        .filter(([, val]) => Boolean(val))
        .map(([key]) => key)
        .join(' ');
}

export function shouldSlideLeft(next: number, current: number, total: number) {
    if (current === total - 1 && next === 0) return true;

    if (current === 0 && next === total - 1) return false;

    return next > current;
}

export function getImgTransitionClasses(next: number | null, current: number, total: number) {
    if (next === null) {
        return {
            currentClass: '',
            nextClass: '',
        };
    }

    if (shouldSlideLeft(next, current, total)) {
        return {
            currentClass: DISPOSED_LEFT_CLASS,
            nextClass: DISPOSED_RIGHT_CLASS,
        };
    }

    return {
        currentClass: DISPOSED_RIGHT_CLASS,
        nextClass: DISPOSED_LEFT_CLASS,
    };
}
