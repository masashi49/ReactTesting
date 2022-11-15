import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//  state.customCounter.valueと、関数をimport
import { selectCount, fetchDummy, selectUsername, fetchJSON } from './features/customCounter/customCounterSlice'
const ReduxAsync = () => {
    const count = useSelector( selectCount ) // storeからstateを取ってくる
    const username = useSelector( selectUsername ) // storeからstateを取ってくる
    const dispatch = useDispatch()
    return (
        <div>
            <span data-testid="count-value">{ count }</span> {/* data-testidは全部小文字*/ }
            <button onClick={ () => dispatch( fetchDummy( 5 ) ) }>FetchDummy</button>
            { username && <h1>{ username }</h1> }
            <button onClick={ () => dispatch( fetchJSON() ) }>fetchJSON</button> {/* fetchJSONをdispatch経由で実行*/ }
        </div>
    )
}

export default ReduxAsync
