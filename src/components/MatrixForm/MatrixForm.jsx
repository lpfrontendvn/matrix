import React, {useState} from 'react'
import './MatrixForm.css'
export default function MatrixForm({onCreateMatrix}) {
const [M, setM] = useState('')
const [N, setN] = useState('')
const [X, setX] = useState('')

  return (
    <div className="matrix-form-container"> 
      <h1 className="title">Matrix Builder</h1>
      <form onSubmit={() => onCreateMatrix({M, X, N})}>
        <div className="matrix-form-row">
          <span> Enter the number of columns </span>
          <input className="input" type='number' max="10" onChange={e => setM(Math.abs(e.target.value))} value={M}/>
        </div>
        <div className="matrix-form-row">
          <span> Enter the number of rows </span>
          <input className="input" type='number' max="10" onChange={e => setN(Math.abs(e.target.value))} value={N}/>
        </div>
        <div className="matrix-form-row">
          <span> Enter the number of cells </span>
          <input className="input" type='number' max="10" onChange={e => setX(Math.abs(e.target.value))} value={X}/>
        </div>
          <button className="ui-button"
            type="submit"
            disabled={!M || !N || !X}
            
          >
            Create matrix
          </button>
      </form>  
    </div>
  )
}