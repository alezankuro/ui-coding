import { useEffect, useState } from 'react';

import { ColumnFilterTypes, RangeValue } from './DataTable.constants';

type TextFilterProps = {
    onChange(value: string): void;
};

export function TextFilter({ onChange }: TextFilterProps) {
    const [value, setValue] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => onChange(value), 1000);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
}

type RangeFilterProps = {
    onChange(value: [RangeValue, RangeValue] | null): void;
};

export function RangeFilter({ onChange }: RangeFilterProps) {
    const [range, setRange] = useState<[RangeValue, RangeValue]>([null, null]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const [start, end] = range;

            if (start == null && end === null) {
                onChange(null);
            } else {
                onChange(range);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [range]);

    return (
        <div className="range-column-filter">
            <input
                type="number"
                onChange={(e) =>
                    setRange(([, prevEnd]) => {
                        const value = e.target.valueAsNumber;

                        return [!isNaN(value) ? value : null, prevEnd];
                    })
                }
            />
            <input
                type="number"
                onChange={(e) =>
                    setRange(([prevStart]) => {
                        const value = e.target.valueAsNumber;

                        return [prevStart, !isNaN(value) ? value : null];
                    })
                }
            />
        </div>
    );
}

export type ColumnFilterProps = {
    type?: ColumnFilterTypes;
} & TextFilterProps &
    RangeFilterProps;

export function ColumnFilter({ type, onChange }: ColumnFilterProps) {
    if (!type) return null;

    if (type === 'text') {
        return <TextFilter onChange={onChange} />;
    }

    if (type === 'range') {
        return <RangeFilter onChange={onChange} />;
    }
}
