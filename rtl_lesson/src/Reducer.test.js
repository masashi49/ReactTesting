import reducer, {
    increment,
    incrementByAmount,
} from "../src/features/customCounter/customCounterSlice"

describe( "Reducer of ReduxtoolKit", () => {
    describe( "increment action", () => {
        let initialState = {
            mode: 0, value: 1 // テスト用のstateを設定する
        }

        it( "Should increment by 1 with mode 0", () => {
            initialState.mode = 2
            const action = { type: increment.type } // increment用のactionを呼ぶ
            const state = reducer( initialState, action ) // テスト用のstateを渡し、新しいstateを計算して返す。incrementのmode:0は、1増やす。
            expect( state.value ).toEqual( 2 )
        } )
    } )
} )
