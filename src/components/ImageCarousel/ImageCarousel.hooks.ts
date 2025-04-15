import { useEffect, useRef, useState } from 'react';

export function useCarouselNav(initial = 0, total = 0) {
    const [current, setCurrent] = useState(initial);
    const [next, setNext] = useState<number | null>(null);
    const [isTransitioning, seIsTransitioning] = useState(false);

    const goToIndex = (index: number) => {
        setNext(index % total);

        requestAnimationFrame(() => {
            seIsTransitioning(true);
        });
    };
    const goNext = () => goToIndex(current + 1);
    const goPrev = () => goToIndex(current ? current - 1 : total - 1);

    const onTransitionEnd = () => {
        setCurrent(next!);
        setNext(null);
        seIsTransitioning(false);
    };

    return {
        current,
        setCurrent,
        next,
        setNext,
        isTransitioning,
        seIsTransitioning,
        goNext,
        goPrev,
        goToIndex,
        onTransitionEnd,
    };
}

export function useAutoNavigate(
    current: number,
    goNext: () => void,
    autoPlayTime: number | null = null,
) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (autoPlayTime === null) return;

        timerRef.current = setTimeout(goNext, autoPlayTime);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current, autoPlayTime, goNext]);
}
