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
            const action = { type: increment.type } // increment用のactionを呼ぶ
            const state = reducer( initialState, action ) // テスト用のstateを渡し、新しいstateを計算して返す。incrementのmode:0は、1増やす。
            expect( state.value ).toEqual( 2 )
        } )
        it( "Should increment by 100 with mode 1", () => {
            let initialState = {
                mode: 1, value: 1
            }
            const action = { type: increment.type } // increment用のactionを呼ぶ
            const state = reducer( initialState, action ) // テスト用のstateを渡し、新しいstateを計算して返す。incrementのmode:0は、1増やす。
            expect( state.value ).toEqual( 101 )
        } )
        it( "Should increment by 10000 with mode 2", () => {
            let initialState = {
                mode: 2, value: 1
            }
            const action = { type: increment.type } // increment用のactionを呼ぶ
            const state = reducer( initialState, action ) // テスト用のstateを渡し、新しいstateを計算して返す。incrementのmode:0は、1増やす。
            expect( state.value ).toEqual( 10001 )
        } )
    } )
    describe( "incrementByAmonut action", () => {
        let initialState = {
            mode: 0, value: 1 // テスト用のstateを設定する
        }

        it( "Should increment by payload value with mode 0", () => {
            const action = { type: incrementByAmount.type, payload: 1 }
            const state = reducer( initialState, action )
            console.log( state.value )
            expect( state.value ).toEqual( 4 )
        } )
    } )
} )
