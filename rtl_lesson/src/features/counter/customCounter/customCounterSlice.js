// reduxjs/toolkitとは、reduxを扱いやすくするためのライブラリ
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; //createAsyncThunk非同期系の関数を使いやすく作成してくれる
import axios from "axios"

const sleep = ( msec ) => {
    const start = new Date()
    while ( new Date() - start < msec );
}

// 非同期関数 2秒待機する
export const fetchDummy = createAsyncThunk( "fetch/dummy", async ( num ) => {
    await sleep( 2000 )
    return num
} )

//Apiにアクセスする非同期関数
export const fetchJSON = createAsyncThunk( "fetch/api", async () => {
    const res = await axios.get( "https://jsonplaceholder.typicode.com/users/1" )
    const { username } = res.data
    return username
} )

export const customCounterSlice = createSlice( {
    name: 'customCounter',
    initialState: {
        value: 0,
        status: 'idle',
        mode: 0,
        userName: ""
    },
    reducers: {
        increment: ( state ) => {
            switch ( state.mode ) {
                case 0:
                    state.value += 1
                    break
                case 1:
                    state.value += 100
                    break
                case 2:
                    state.value += 10000
                    break
                default:
                    break
            }
            state.value += 1;
        },
        decrement: ( state ) => {
            state.value -= 1;
        },
        incrementByAmount: ( state, action ) => {
            switch ( state.mode ) {
                case 0:
                    state.value += action.payload
                    break
                case 1:
                    state.value += 100 * action.payload
                    break
                case 2:
                    state.value += 10000 * action.payload
                    break
                default:
                    break

            }
            state.value += action.payload;
        },
    },
} );

export const { increment, decrement, incrementByAmount } = customCounterSlice.actions;

export const selectCount = ( state ) => state.customCounter.value;

export default customCounterSlice.reducer;
