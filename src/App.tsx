import React, {useState, useEffect, useCallback} from 'react';

import './App.css';

import {Matrix, ActionBar} from './components'

interface mtxCell {
  value: number | null
  isWet: boolean
}

type mtxType = mtxCell[][]

const App: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(17)
  
  const initMatrixHandler: (value: number) => mtxType = (value) => {
    let matrix: mtxType = [];
    for(let i = 0; i<value; i++) {
      matrix[i] = []
      for(let j = 0; j<value; j++) {
        matrix[i][j] =  {
          value: null,
          isWet: false
        }
      }
    }
    return matrix
  }

  const [matrixState, setMatrixState] = useState(initMatrixHandler(matrixSize))
  

  const generateMatrixHandler: () => void = () => {
    const newMatrix: mtxType = [...matrixState]
    for(let i = 0; i<newMatrix.length; i++) {
      for(let j = 0; j<newMatrix.length; j++) {
        const newValue: number = Math.floor(Math.random() * 100)
        newMatrix[i][j] = {
          value: newValue,
          isWet: false
        };
      }
    }
    setMatrixState([...newMatrix])
  }

  const putWaterHandler: (rowIndex: number, colIndex:  number) => void = useCallback((rowIndex: number, colIndex: number) => {

    // for(let i = 0; i<listToFlood.length; i ++) {
    //   if(!matrixState[list][rowIndex].value === null || matrixState[colIndex][rowIndex].isWet) {

    //   }
    // }
    if(matrixState[colIndex][rowIndex].value === null || matrixState[colIndex][rowIndex].isWet) {
      return
    } else {
      let newMatrix: mtxType = [...matrixState]
      newMatrix[colIndex][rowIndex] = {...newMatrix[colIndex][rowIndex], isWet: true}
      setMatrixState([...newMatrix])
    }
  }, [matrixState])

  const checkAround: (colIndex: number, rowIndex: number) => {colIndex: number, rowIndex: number} |null  = useCallback((colIndex, rowIndex) => {
   const minColIndex: number = (colIndex - 1 > -1) ? colIndex - 1 : 0
   const maxColIndex: number = (colIndex + 2 > matrixSize) ? matrixSize : colIndex + 2
   const minRowIndex: number = (rowIndex - 1 > -1) ? rowIndex -1 : 0
   const maxRowIndex: number = (rowIndex +2 > matrixSize) ? matrixSize: rowIndex+2
   for(let i = minColIndex; i<maxColIndex; i++) {
     for(let j = minRowIndex; j<maxRowIndex; j++) {
         if((matrixState[i][j].value! < matrixState[colIndex][rowIndex].value!) && !matrixState[i][j].isWet) {
           return ({colIndex: i, rowIndex: j})
         }
     }
   }
   return null
  },[matrixState, matrixSize])

  const findWater: () => {colIndex:number, rowIndex: number} | null = useCallback( () => {
    for(let i = 0; i<matrixState.length; i++) {
      for(let j = 0; j< matrixState[i].length; j++) {
        if(matrixState[i][j].isWet) {
          //i: col, j:row
          const newWetCell = checkAround(i, j)
          if(newWetCell) {
            return newWetCell
          }
        }
      }
    }
    return null
  },[matrixState, checkAround])

  useEffect(() => {
    setTimeout(() => {
      const newWetCell = findWater()
      if(newWetCell) {
        putWaterHandler( newWetCell.rowIndex, newWetCell.colIndex)
      }
    }, 1000)
  }, [matrixState, findWater, putWaterHandler])

  return (
    <div className="App">
      <Matrix matrix={matrixState} clicked={putWaterHandler}/>
      <ActionBar clicked={generateMatrixHandler}/>
    </div>
  );
}

export default App;
