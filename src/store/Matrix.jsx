import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createMatrix, deleteRow, addRow, incrementCell } from './matrix'
import './Matrix.css'
import MatrixForm from '../components/MatrixForm/MatrixForm'
import MatrixTable from '../components/MatrixTable/MatrixTable'

export default function Matrix() {
  const { matrix, matrixParams } = useSelector((state) => state.matrix)
  const dispatch = useDispatch()
  return (
    <section className="matrix-container">
      {matrix
        ? <MatrixTable
          matrix={matrix}
          matrixParams={matrixParams}
          incrementCell={(rowIndex, cellIndex) => dispatch(incrementCell({ rowIndex, cellIndex }))}
          onDeleteRow={index => dispatch(deleteRow(index))}
          onAddRow={() => dispatch(addRow())} />
        :
        <MatrixForm onCreateMatrix={params => dispatch(createMatrix(params))} />}
    </section>
  )
}