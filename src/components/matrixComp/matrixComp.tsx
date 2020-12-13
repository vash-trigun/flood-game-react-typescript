import React from 'react';

import Cols from './colComp/colComp'

import './matrixComp.css'

interface mtxCell {
    value: number | null
    isWet: boolean
  }

interface matrixProps {
    matrix: mtxCell[][]
    clicked: (rowIndex: number, colIndex: number) => void
}

const MatrixComp: React.FC<matrixProps> = (props) => {

    const {matrix, clicked} = props

    const matrixContainer: React.ReactNode = matrix.map((row, colIndex) => {
        return <Cols key={`row-${colIndex}`} row={row} clicked={clicked} colIndex={colIndex}/>
    })
    

    return(
        <>
        <div className="matrix">
        {matrixContainer}
        </div>
        </>
    )
}

export default MatrixComp