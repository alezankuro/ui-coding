import { InputHTMLAttributes, useEffect, useId, useRef } from 'react';

type CheckboxInputProps = {
    checked: boolean | 'indeterminate';
    label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>;

export function CheckboxInput({ checked, label, ...props }: CheckboxInputProps) {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const id = useId();

    useEffect(() => {
        if (!checkboxRef.current) return;

        checkboxRef.current.indeterminate = checked === 'indeterminate';
    }, [checked]);

    return (
        <label htmlFor={id}>
            <input
                ref={checkboxRef}
                id={id}
                type="checkbox"
                checked={checked !== 'indeterminate' && checked}
                {...props}
            />
            {label}
        </label>
    );
}
