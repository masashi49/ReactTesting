// reduxjs/toolkitとは、reduxを扱いやすくするためのライブラリ
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; //createAsyncThunk非同期系の関数を使いやすく作成してくれる
import axios from "axios"

const sleep = ( msec ) => {
    const start = new Date()
    while ( new Date() - start < msec );
}

// 非同期関数の場合、createAsyncThunkを呼び出す。 2秒待機する
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
        status: '',
        mode: 0,
        username: ""
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
        },
    },

    // 非同期の計算を行う場合はextraReducersにて書く
    extraReducers: ( builder ) => {
        builder.addCase( fetchDummy.fulfilled, ( state, action ) => {
            state.value = 100 + action.payload
        } )
        builder.addCase( fetchDummy.rejected, ( state, action ) => {
            state.value = 100 - action.payload
        } )
        builder.addCase( fetchJSON.fulfilled, ( state, action ) => {
            state.username = action.payload
        } )
    }

} );

export const { increment, decrement, incrementByAmount } = customCounterSlice.actions;

export const selectCount = ( state ) => state.customCounter.value;
export const selectUsername = ( state ) => state.customCounter.username;

export default customCounterSlice.reducer;
