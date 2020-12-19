export interface IMtxCell {
    value: number | null
    isWet: boolean
}

export interface ICoordinates {
    rowIdx: number,
    colIdx: number,
}

export interface ISize {
  rowsSize: number,
  colsSize: number
}

export interface IActionBarProps {
    clicked: () => void
    changed: (size: string) => void
}

export interface IDropDownCompProps {
    changed: (size: string) => void
}

export interface IMatrixProps {
    matrix: IMtxCell[][]
    clicked: (cell: ICoordinates[]) => void
}

export interface IColCompProps {
    row: IMtxCell[],
    clicked: (cell: ICoordinates[]) => void
    colIndex: number
}

export interface ICellCompProps {
    cell: IMtxCell
    clicked: (cell: ICoordinates[]) => void
    rowIndex: number
    colIndex: number
}
