import { RefObject, useEffect, useRef } from 'react';

import { getTabbableElements } from './ModalDialog.utils';

export function useKeydown(key: string, callback: (event: KeyboardEvent) => void) {
    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            if (event.key === key) {
                return callback(event);
            }
        }

        document.addEventListener('keydown', onKeydown);

        return () => document.removeEventListener('keydown', onKeydown);
    }, [key, callback]);
}

export function useOutsideClick(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
    useEffect(() => {
        function onClick(event: MouseEvent | TouchEvent) {
            const isOutside =
                event.target instanceof Node && ref.current && !ref.current.contains(event.target);

            if (isOutside) {
                callback();
            }
        }

        document.addEventListener('mousedown', onClick);
        document.addEventListener('touchstart', onClick);

        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('touchstart', onClick);
        };
    }, [ref, callback]);
}

export function useFocusOnFirstTabbableElement(elRef: RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const tabbableElements = getTabbableElements(elRef.current);
        const firstElement = tabbableElements[0];

        if (firstElement instanceof HTMLElement) {
            firstElement.focus();
        }
    }, [elRef]);
}

export function useReturnFocus() {
    const activeElRef = useRef<Element | null>(null);

    useEffect(() => {
        activeElRef.current = document.activeElement;

        return () => {
            if (activeElRef.current instanceof HTMLElement) {
                activeElRef.current.focus();
            }
        };
    }, []);
}

export function useFocusTrap(elRef: RefObject<HTMLDivElement | null>) {
    function trapFocus(event: KeyboardEvent) {
        if (!elRef.current) return;

        const tabbableElements = getTabbableElements(elRef.current);
        const firstElement = tabbableElements[0];
        const lastElement = tabbableElements[tabbableElements.length - 1];
        const { activeElement } = document;

        if (event.shiftKey) {
            if (activeElement === firstElement && lastElement instanceof HTMLElement) {
                event.preventDefault();
                lastElement?.focus();
            }
        } else {
            if (activeElement === lastElement && firstElement instanceof HTMLElement) {
                event.preventDefault();
                firstElement?.focus();
            }
        }
    }

    useKeydown('Tab', trapFocus);
}
