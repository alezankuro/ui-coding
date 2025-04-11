import clsx from 'clsx';

import { Digit, DIGIT_CLASSES } from './DigitalClock.constants';

type ClockDigitProps = {
    digit?: Digit;
};

export function ClockDigit({ digit = 0 }: ClockDigitProps) {
    return (
        <div className="clock-digit">
            <div className={clsx('clock-digit__block', DIGIT_CLASSES[digit].top)}></div>
            <div className={clsx('clock-digit__block', DIGIT_CLASSES[digit].bottom)}></div>
        </div>
    );
}
