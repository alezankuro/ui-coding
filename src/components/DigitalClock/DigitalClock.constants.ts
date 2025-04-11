export const DIGIT_CLASSES = {
    0: {
        top: ['clock-digit--border-left', 'clock-digit--border-right', 'clock-digit--border-top'],
        bottom: [
            'clock-digit--border-left',
            'clock-digit--border-right',
            'clock-digit--border-bottom',
        ],
    },
    1: {
        top: ['clock-digit--border-right'],
        bottom: ['clock-digit--border-right'],
    },
    2: {
        top: [
            'clock-digit--border-top',
            'clock-digit--border-right',
            'clock-digit--border-top-bottom',
        ],
        bottom: [
            'clock-digit--border-left',
            'clock-digit--border-bottom',
            'clock-digit--border-bottom-top',
        ],
    },
    3: {
        top: [
            'clock-digit--border-top',
            'clock-digit--border-right',
            'clock-digit--border-top-bottom',
        ],
        bottom: [
            'clock-digit--border-right',
            'clock-digit--border-bottom',
            'clock-digit--border-bottom-top',
        ],
    },
    4: {
        top: [
            'clock-digit--border-left',
            'clock-digit--border-right',
            'clock-digit--border-top-bottom',
        ],
        bottom: ['clock-digit--border-right', 'clock-digit--border-bottom-top'],
    },
    5: {
        top: [
            'clock-digit--border-top',
            'clock-digit--border-left',
            'clock-digit--border-top-bottom',
        ],
        bottom: [
            'clock-digit--border-right',
            'clock-digit--border-bottom-top',
            'clock-digit--border-bottom',
        ],
    },
    6: {
        top: [
            'clock-digit--border-left',
            'clock-digit--border-top',
            'clock-digit--border-top-bottom',
        ],
        bottom: [
            'clock-digit--border-left',
            'clock-digit--border-right',
            'clock-digit--border-bottom',
            'clock-digit--border-bottom-top',
        ],
    },
    7: {
        top: ['clock-digit--border-top', 'clock-digit--border-right'],
        bottom: ['clock-digit--border-right'],
    },
    8: {
        top: [
            'clock-digit--border-left',
            'clock-digit--border-right',
            'clock-digit--border-top',
            'clock-digit--border-top-bottom',
        ],
        bottom: [
            'clock-digit--border-left',
            'clock-digit--border-right',
            'clock-digit--border-bottom',
            'clock-digit--border-bottom-top',
        ],
    },
    9: {
        top: [
            'clock-digit--border-left',
            'clock-digit--border-right',
            'clock-digit--border-top',
            'clock-digit--border-top-bottom',
        ],
        bottom: [
            'clock-digit--border-right',
            'clock-digit--border-bottom',
            'clock-digit--border-bottom-top',
        ],
    },
};

export type Digit = keyof typeof DIGIT_CLASSES;

export const ONE_SECOND = 1000;

export const SEPRATOR_POSITIONS = [2, 4];
