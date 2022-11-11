import reducer, { fetchDummy } from "./features/customCounter/customCounterSlice";

describe( "extraReducers", () => {
    const initialState = {
        mode: 0,
        value: 0
    }
    it( "shoule output 100 + payload when fulfiled", () => {
        const action = { type: fetchDummy.fulfilled.type, payload: 5 } //actionを作る
        const state = reducer( initialState, action )//reducerに渡して計算させ、返す
        expect( state.value ).toEqual( 105 )
    } )
    it( "shoule output 100 - payload when fulfiled", () => {
        const action = { type: fetchDummy.rejected.type, payload: 5 } //actionを作る
        const state = reducer( initialState, action )//reducerに渡して計算させ、返す
        expect( state.value ).toEqual( 95 )
    } )

} )
