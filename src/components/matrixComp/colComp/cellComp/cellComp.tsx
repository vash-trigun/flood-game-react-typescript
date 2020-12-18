import React from 'react'
import './cellComp.css'

interface mtxCell {
    value: number | null
    isWet: boolean
}
interface coordinates {
    rowIdx: number,
    colIdx: number,
}
interface CellCompPropType {
    cell: mtxCell
    clicked: (cell: coordinates[]) => void
    rowIndex: number
    colIndex: number
}

const CellComp: React.FC<CellCompPropType> = (props) => {

    const {cell, clicked, rowIndex, colIndex} = props

    const style: string = cell.value === null ? 'water' :cell.value<30 ?'grass': cell.value <60 ? 'hill' :'mountain'

    const waterColor: string | null = cell.isWet ? 'water' : 'blank'
    
    return (
        <div className={`cell`} onClick={() => clicked([{rowIdx: rowIndex, colIdx: colIndex}])}>
        <div className={`cell ${waterColor}`}>
            {/*JUST TO CHECK IF IT'S WORKING PROPERLY*/}
            {/* {cell.isWet ? cell.value : null} */}
        </div>
        <div className={`cell ${style}`}>
            {/*JUST TO CHECK IF IT'S WORKING PROPERLY*/}
            {/* {!cell.isWet ? cell.value : null} */}
            {cell.value}
        </div>
        </div>
    )
}

export default CellComp