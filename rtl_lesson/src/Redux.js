import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectCount, increment, decrement, incrementByAmount } from './features/customCounter/customCounterSlice'


const Redux = () => {
  const [ number, setNumber ] = useState( 0 )
  const count = useSelector( selectCount ) // state.customCounter.valueが返る
  const dispatch = useDispatch()
  return (
    <div>
      <h3>Redux Integretion Test</h3>
      <div>
        <button onClick={ () => dispatch( increment() ) }>+</button>
        <span data-testid="count-value">{ count }</span>
        <button onClick={ () => dispatch( decrement() ) }>-</button>
        <button onClick={ () => dispatch( incrementByAmount( number | 0 ) ) }>{/*numberだったらnumber、そうでなかったら0とできる。*/ }
          incremtneBuAmount
        </button>
        <input
          type="text"
          placeholder='Enter'
          value={ number }
          onChange={ ( e ) => setNumber( e.target.value ) } />
      </div>
    </div>
  )
}

export default Redux
