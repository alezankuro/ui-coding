import { Digit } from './DigitalClock.constants';

export function getCurrentTimeString() {
    return new Date().toLocaleTimeString();
}

export function timeStringToDigits(time: string) {
    return time
        .replaceAll(':', '')
        .split('')
        .map((item) => {
            const val = parseInt(item, 10);

            return val <= 9 && val >= 0 ? (val as Digit) : 0;
        });
}

export function getCurrentTimeDigits() {
    return timeStringToDigits(getCurrentTimeString());
}
