import React, { ReactNode } from 'react'

import CellComp from './CellComp/CellComp'

import {IColCompProps} from '../../../shared/interfaces'


const ColComp: React.FC<IColCompProps> = (props) => {

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