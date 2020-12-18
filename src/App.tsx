import React, {useState, useEffect, useCallback} from 'react';

import './App.css';

import {Matrix, ActionBar} from './components'

interface mtxCell {
  value: number | null
  isWet: boolean
}

interface coordinates {
  rowIdx: number,
  colIdx: number,
}

interface size {
  rowsSize: number,
  colsSize: number
}

type mtxType = mtxCell[][]

const App: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<size>({
    rowsSize: 17,
    colsSize: 17
  })
  
  const initMatrixHandler: (size: size) => mtxType = (size) => {
    let matrix: mtxType = [];
    for(let i = 0; i<size.colsSize; i++) {
      matrix[i] = []
      for(let j = 0; j<size.rowsSize; j++) {
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
      for(let j = 0; j<newMatrix[i].length; j++) {
        const newValue: number = Math.floor(Math.random() * 100)
        newMatrix[i][j] = {
          value: newValue,
          isWet: false
        };
      }
    }
    setMatrixState([...newMatrix])
  }

  const putWaterHandler: (listNewWater:coordinates[]) => void = useCallback((listNewWater) => {
    let newMatrix: mtxType = [...matrixState];
    
    for(let i = 0; i<listNewWater.length; i++) {
        if(matrixState[listNewWater[i].colIdx][listNewWater[i].rowIdx].value !== null && !matrixState[listNewWater[i].colIdx][listNewWater[i].rowIdx].isWet) {
          newMatrix[listNewWater[i].colIdx][listNewWater[i].rowIdx].isWet = true;
        }
    }
      setMatrixState([...newMatrix])
  }, [matrixState])

  const checkAroundHandler: (cell: coordinates) => coordinates[] = useCallback((cell) => {
   const aroundList: coordinates[] = []
   const minColIndex: number = (cell.colIdx - 1 > -1) ? cell.colIdx - 1 : 0
   const maxColIndex: number = (cell.colIdx + 2 > matrixSize.colsSize) ? matrixSize.colsSize : cell.colIdx + 2
   const minRowIndex: number = (cell.rowIdx - 1 > -1) ? cell.rowIdx -1 : 0
   const maxRowIndex: number = (cell.rowIdx +2 > matrixSize.rowsSize) ? matrixSize.rowsSize: cell.rowIdx+2
   for(let i = minColIndex; i<maxColIndex; i++) {
     for(let j = minRowIndex; j<maxRowIndex; j++) {
         if((matrixState[i][j].value! < matrixState[cell.colIdx][cell.rowIdx].value!) && !matrixState[i][j].isWet) {
           aroundList.push({
             colIdx: i,
             rowIdx: j
           })
         }
     }
   }
   return aroundList
  },[matrixState, matrixSize])

  const findWaterHandler: () => coordinates[]= useCallback( () => {
    const waterList: coordinates[] = []
    for(let i = 0; i<matrixState.length; i++) {
      for(let j = 0; j< matrixState[i].length; j++) {
        if(matrixState[i][j].isWet) {
          //i: col, j:row
            waterList.push({
              colIdx: i,
              rowIdx: j
            })
        }
      }
    }
    return waterList
  },[matrixState])

  useEffect(() => {
    const timer = setTimeout(() => {
      const waterList = findWaterHandler()
      if(waterList.length > 0) {
        let newWaterList: coordinates[] = []
        for(let i=0; i<waterList.length; i++) {
          const aroundList = checkAroundHandler(waterList[i])
          newWaterList = newWaterList.concat(aroundList)
        }
        if(newWaterList.length>0) {
          putWaterHandler( newWaterList)
        }
      }
    }, 1000)
    return () => {
     clearTimeout(timer)
    }  
  }, [matrixState, findWaterHandler, putWaterHandler, checkAroundHandler])

  const changeSizeHandler:(size: string) => void = (size: string) => {
    let newRowSize: number;
    let newColSize: number;
    switch(size.toLocaleLowerCase()) {
      case 's' : newColSize = 10; newRowSize=10; break;
      case 'm' : newColSize=17; newRowSize=17; break;
      case 'l' : newColSize=50; newRowSize=17; break;
      default: newColSize=matrixSize.colsSize; newRowSize=matrixSize.rowsSize; break;
    }
    if(matrixSize.colsSize !== newColSize || matrixSize.rowsSize !== newRowSize) {
      const newMatrix = initMatrixHandler({
        colsSize: newColSize,
        rowsSize: newRowSize
      })
      setMatrixSize({
        colsSize: newColSize,
        rowsSize: newRowSize
      })
      setMatrixState([...newMatrix])
    }
  }

  console.log(matrixSize)
  return (
    <div className="App">
      <Matrix matrix={matrixState} clicked={putWaterHandler}/>
      <ActionBar clicked={generateMatrixHandler} changed={changeSizeHandler}/>
    </div>
  );
}

export default App;
