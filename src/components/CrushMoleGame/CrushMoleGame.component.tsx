import { CSSProperties, useEffect, useRef, useState } from 'react';

import { CrushMoleGameSerivce, FieldValue } from './CrushMoleGame';

import './styles.css';

interface CrushMoleGameProps {
    game: CrushMoleGameSerivce;
}

export function CrushMoleGame({ game }: CrushMoleGameProps) {
    const fieldRef = useRef<HTMLDivElement>(null);
    const [field, setField] = useState(game.field);

    useEffect(() => {
        setField(game.field);
    }, [game]);

    useEffect(() => {
        if (!fieldRef.current) return;

        function onClick(event: PointerEvent) {
            if ((event.target as HTMLDivElement)?.dataset.mole !== 'true') {
                return;
            }

            game.clearField();
            setField(game.field);
            game.crushMole()?.then((field) => setField(field));
        }

        fieldRef.current.addEventListener('pointerdown', onClick);

        return () => {
            fieldRef.current?.removeEventListener('pointerdown', onClick);
        };
    }, [game]);

    return (
        <div
            className="game-field"
            style={{ '--field-size': game.fieldSize } as CSSProperties}
            ref={fieldRef}
        >
            {field.map((cell, index) => {
                return (
                    <div key={index} className="field-cell" data-mole={cell === FieldValue.MOLE}>
                        {cell === FieldValue.MOLE ? '@' : null}
                    </div>
                );
            })}
        </div>
    );
}
