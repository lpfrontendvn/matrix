import React, {useState, useEffect} from 'react'
import './MatrixTable.css'
export default function MatrixTable({matrix, onDeleteRow, onAddRow, incrementCell, matrixParams}) {
  const[currentPercentShowIndex, setCurrentPersentIndex] = useState(null)
  const[hoveredCell, setHoveredCell] = useState(null)
  const[nearestSellAmounts, setNearestSellAmounts] = useState([])

  useEffect(()=> {
    if(hoveredCell) onCellHovered()
    else setNearestSellAmounts([])
  }, [hoveredCell])

  const onCellHovered = () => {
    let flaxMatrix = [...matrix]
    flaxMatrix.splice(matrix.length - 1, 1)
    flaxMatrix = flaxMatrix.flat()
    const currentElIndex = flaxMatrix.findIndex(el => el.id === hoveredCell.id)
    flaxMatrix.splice(currentElIndex, 1)
    flaxMatrix.sort((a, b) => {
      const currentDifference = Math.abs(hoveredCell.amount - a.amount)
      const nextDifference = Math.abs(hoveredCell.amount - b.amount)
      return currentDifference >= nextDifference ? 1 : -1
    });
    setNearestSellAmounts(flaxMatrix.slice(0, matrixParams.X))
  }

  const cellClasses = (index, cell) => {
    let classStr = 'matrix-cell'
    if(index === matrix.length - 1) classStr  += ' avarage-values-cells'
    if(hoveredCell?.id === cell.id)  classStr  += ' hovered-cell'
    if(nearestSellAmounts.includes(cell)) classStr  += ' nearest-amount-cell' 
    return  classStr
  } 

  const calculateRowSum = (row) => {
    return row.reduce((sum, current) => sum + current.amount, 0)
  }

  const calculatePercent = (amount, sum) => {
    return `${Math.round((amount * 100) / sum)}%`;
  }

  return (
    <div className="matrix-table">
      {matrix.map((row, index) => {
        const sum = calculateRowSum(row).toFixed(0)
        return <div key={index} className="matrix-row"> 
           {row.map((cell, cellIndex) => {
             return <div
                key={cell.id} 
                onClick={()=> incrementCell(index, cellIndex)}
                onMouseLeave={()=> setHoveredCell(null)}
                onMouseOver={()=> setHoveredCell(cell)}
                className={cellClasses(index, cell)}>
                  {currentPercentShowIndex === index ? calculatePercent(cell.amount, sum) : cell.amount} 
              </div>
           })} 
           <div className="matrix-cell sum-cell" 
              onMouseLeave={() => setCurrentPersentIndex(null)}
              onMouseOver={() => setCurrentPersentIndex(index)}>
              {sum}
          </div>
          {index !== matrix.length -1 && <button className="delete-row" onClick={()=>onDeleteRow(index)}>✕</button>}
        </div>
      })} 

      <button className="ui-button" onClick={onAddRow}>Add row</button>
    </div>
  )
}