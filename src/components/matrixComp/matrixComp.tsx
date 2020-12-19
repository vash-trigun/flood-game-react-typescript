import React from 'react';

import Cols from './ColComp/ColComp'

import './MatrixComp.css'

import {IMatrixProps } from '../../shared/interfaces'

const MatrixComp: React.FC<IMatrixProps> = (props) => {

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