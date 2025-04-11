import { Fragment, useEffect, useState } from 'react';

import { ClockDigit } from './ClockDigit.component';
import { ONE_SECOND, SEPRATOR_POSITIONS } from './DigitalClock.constants';
import { timeStringToDigits } from './DigitalClock.utils';
import { DigitalClockSeparator } from './DigitalClockSeparator.component';

import './DigitalClock.styles.css';

type DigitalClockProps = {
    time: Date;
};

export function DigitalClock({ time }: DigitalClockProps) {
    const digits = timeStringToDigits(time.toLocaleTimeString());

    return (
        <time className="digital-clock" dateTime={time.toLocaleTimeString()}>
            {digits.map((digit, index) => (
                <Fragment key={`digit-${index}`}>
                    {SEPRATOR_POSITIONS.includes(index) && (
                        <DigitalClockSeparator key={`separator-${index}`} />
                    )}
                    <ClockDigit key={`digit-${index}`} digit={digit} />
                </Fragment>
            ))}
        </time>
    );
}

export function CurrentTimeDigitalClock() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), ONE_SECOND);

        return () => clearInterval(interval);
    }, []);

    return <DigitalClock time={currentTime} />;
}
