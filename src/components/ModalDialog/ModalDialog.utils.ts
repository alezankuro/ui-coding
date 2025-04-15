export function getTabbableElements(element: HTMLDivElement | null) {
    if (!element) {
        return [];
    }

    return element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
}
