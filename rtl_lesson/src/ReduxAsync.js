import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//  state.customCounter.valueと、関数をimport
import { selectCount, fetchDummy } from './features/customCounter/customCounterSlice'
const ReduxAsync = () => {
    const count = useSelector( selectCount )
    const dispatch = useDispatch()
    return (
        <div>
            <span data-testId="count-value">fetchDummyは{ count }です</span>
            <button onClick={ () => dispatch( fetchDummy( 5 ) ) }>FetchDummy</button>
        </div>
    )
}

export default ReduxAsync
