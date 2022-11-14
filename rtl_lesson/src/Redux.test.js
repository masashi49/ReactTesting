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
    it( "Should display value withdeCcrement by 1 per click", async () => {
        render(
            <Provider store={ store }>
                <Redux />
            </Provider>
        )
        await userEvent.click( screen.getByText( "+" ) )
        await userEvent.click( screen.getByText( "+" ) )
        await userEvent.click( screen.getByText( "+" ) ) // 3回クリックした
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 3 ) //このテストidは3というtextをもっているはずだ
    } )

    it( "Should display value with decrement by 1 per click", async () => {
        render(
            <Provider store={ store }>
                <Redux />
            </Provider>
        )
        await userEvent.click( screen.getByText( "-" ) )
        await userEvent.click( screen.getByText( "-" ) ) // 3回クリックした
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( -2 ) //このテストidは3というtextをもっているはずだ
    } )


    it( "Should display value with increment by 1 amount", async () => {
        render(
            <Provider store={ store }>
                <Redux />
            </Provider>
        )
        await userEvent.type( screen.getByPlaceholderText( "Enter" ), "30" )// プレースホルダーにEnterを持っている要素(ここではinput)に対して、30とタイピングする
        await userEvent.click( screen.getByText( "incremtneBuAmount" ) )//incremtneBuAmountをクリックする
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 30 )
    } )

    it( "Should display value with increment by 1 amount input Text", async () => {
        render(
            <Provider store={ store }>
                <Redux />
            </Provider>
        )
        const inputEnter = screen.getByPlaceholderText( "Enter" )
        await userEvent.type( inputEnter, "あああああ" )// 日本語を入力
        await userEvent.click( screen.getByText( "incremtneBuAmount" ) )//incremtneBuAmountをクリックする
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 0 ) //数字以外は弾いているので、0のままのはず

        await userEvent.type( inputEnter, "100" )// 100を入力
        await userEvent.click( screen.getByText( "incremtneBuAmount" ) )//incremtneBuAmountをクリックする
        await userEvent.type( inputEnter, "あああああ" )
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 0 )
    } )

    it( "Should display value with increment by 1 amount input Text after number", async () => {
        render(
            <Provider store={ store }>
                <Redux />
            </Provider>
        )
        const inputEnter = screen.getByPlaceholderText( "Enter" )
        await userEvent.type( inputEnter, "100" )
        await userEvent.click( screen.getByText( "incremtneBuAmount" ) )
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 100 )
        await userEvent.type( inputEnter, "-90" )
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 10 )
        await userEvent.type( inputEnter, "あああああ" )
        expect( screen.getByTestId( "count-value" ) ).toHaveTextContent( 10 )
    } )


} )
