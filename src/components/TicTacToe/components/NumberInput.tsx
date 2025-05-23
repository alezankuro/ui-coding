import { useEffect, useState } from 'react';

interface NumberInputProps {
    id?: string;
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    onChange: (value: number) => void;
    label?: string;
    hint?: string;
}

export function NumberInput({
    id,
    value,
    min = 0,
    max = 100,
    disabled,
    onChange,
    label,
    hint,
}: NumberInputProps) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? min : parseInt(e.target.value, 10);
        setInputValue(newValue);
    };

    const handleInputBlur = () => {
        const validValue = Math.max(min, Math.min(max, inputValue));
        setInputValue(validValue);
        onChange(validValue);
    };

    const increment = () => {
        if (inputValue < max) {
            const newValue = inputValue + 1;
            setInputValue(newValue);
            onChange(newValue);
        }
    };

    const decrement = () => {
        if (inputValue > min) {
            const newValue = inputValue - 1;
            setInputValue(newValue);
            onChange(newValue);
        }
    };

    return (
        <div className="number-input-container">
            {label && <label htmlFor={id}>{label}</label>}

            <div className="number-input-controls">
                <button
                    type="button"
                    className="number-input-button decrement"
                    onClick={decrement}
                    disabled={inputValue <= min}
                >
                    <span>−</span>
                </button>

                <input
                    id={id}
                    type="number"
                    className="number-input"
                    value={inputValue}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />

                <button
                    type="button"
                    className="number-input-button increment"
                    onClick={increment}
                    disabled={inputValue >= max}
                >
                    <span>+</span>
                </button>
            </div>

            {hint && <span className="number-input-hint">{hint}</span>}
        </div>
    );
}

export default NumberInput;
