import { ReactNode } from 'react';

import { CrossIcon, ZeroIcon } from './components';

export enum BoardCellValue {
    Zero = '0',
    Cross = 'X',
    Empty = '',
}

export const DEFAULT_BOARD_SIZE = 3;

export const NEXT_PLAYER_CELL: Record<BoardCellValue, BoardCellValue> = {
    [BoardCellValue.Cross]: BoardCellValue.Zero,
    [BoardCellValue.Zero]: BoardCellValue.Cross,
    [BoardCellValue.Empty]: BoardCellValue.Zero,
};

export const CellValueMap: Record<BoardCellValue, () => ReactNode> = {
    [BoardCellValue.Cross]: () => <CrossIcon />,
    [BoardCellValue.Zero]: () => <ZeroIcon />,
    [BoardCellValue.Empty]: () => null,
};
