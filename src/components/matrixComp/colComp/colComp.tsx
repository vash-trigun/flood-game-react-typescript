import React, { ReactNode } from 'react'
import CellComp from './cellComp/cellComp'

interface mtxCell {
    value: number | null,
    isWet: boolean,
    
  }

interface ColCompPropType {
    row: mtxCell[],
    clicked: (rowIndex: number, colIndex: number) => void
    colIndex: number
}

const ColComp: React.FC<ColCompPropType> = (props) => {

    const {row, clicked, colIndex }= props

    const rowContainer: ReactNode = row.map((value, rowIndex) => {
        return <CellComp key={`cell-${rowIndex}`} cell={value} clicked={clicked} rowIndex={rowIndex} colIndex={colIndex}/>
    })

    return (
        <div className="col">
            {rowContainer}
        </div>
    )
}

export default ColComp