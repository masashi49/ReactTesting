// index.jsにて、Providerでstoreを渡してReduxを実現している。
// testも同じで、test用のReduxStoreを作成してからテストを書く。

// コンポーネントをチェックするReactTestingLibraryお決まりセット
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// storeを作成するお決まりセット
import { Provider } from "react-redux";
import Redux from "./Redux";
import { configureStore } from "@reduxjs/toolkit";

// export default customCounterSlice.reducer を呼び出す。(名前は分かりやすく変更)
// store.jsと同じ事をしている
import customCounterReducer from "../src/features/customCounter/customCounterSlice";


describe( "Redux Integration Test", () => {
    let store;
    beforeEach( () => { // 各テストの前にsoteを作る。store.jsと同じ事をしている
        store = configureStore( {
            reducer: {
                customCounter: customCounterReducer
            }
        } )
    } )

    // ↑ここまでが準備
    it( "Should display value with increment by 1 per click", async () => {
        render(
            <Provider store={ store }>
                <Redux />
            </Provider>
        )
        await userEvent.click( screen.getByText( "+" ) )
        await userEvent.click( screen.getByText( "+" ) )
        await userEvent.click( screen.getByText( "+" ) )
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 3 ) //このテストidは3というtextをもっているはずだ
    } )
} )
