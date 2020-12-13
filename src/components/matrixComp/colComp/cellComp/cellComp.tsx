import React from 'react'
import './cellComp.css'

interface mtxCell {
    value: number | null
    isWet: boolean
  }

interface CellCompPropType {
    cell: mtxCell
    clicked: (rowIndex: number, colIndex: number) => void
    rowIndex: number
    colIndex: number
}

const CellComp: React.FC<CellCompPropType> = (props) => {

    const {cell, clicked, rowIndex, colIndex} = props

    const style: string = cell.value === null ? 'water' :cell.value<30 ?'grass': cell.value <60 ? 'hill' :'mountain'

    const waterColor: string | null = cell.isWet ? 'water' : 'blank'
    
    return (
        <div className={`cell`} onClick={() => clicked(rowIndex, colIndex)}>
        <div className={`cell ${waterColor}`}></div>
        <div className={`cell ${style}`}>{cell.value}</div>
        </div>
    )
}

export default CellComp