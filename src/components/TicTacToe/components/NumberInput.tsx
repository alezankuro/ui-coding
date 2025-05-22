import { useEffect, useState } from 'react';

interface NumberInputProps {
    id?: string;
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    label?: string;
    hint?: string;
}

export function NumberInput({
    id,
    value,
    min = 0,
    max = 100,
    onChange,
    label,
    hint,
}: NumberInputProps) {
    const [inputValue, setInputValue] = useState(value);

    // Update local state when prop changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? min : parseInt(e.target.value, 10);
        setInputValue(newValue);
    };

    const handleInputBlur = () => {
        // Validate and apply constraints when input loses focus
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
                    −
                </button>

                <input
                    id={id}
                    type="number"
                    className="number-input"
                    value={inputValue}
                    min={min}
                    max={max}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />

                <button
                    type="button"
                    className="number-input-button increment"
                    onClick={increment}
                    disabled={inputValue >= max}
                >
                    +
                </button>
            </div>

            {hint && <span className="number-input-hint">{hint}</span>}
        </div>
    );
}

export default NumberInput;
