//お決まり3点セット
import React from "react";
import { screen, render, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// test用のstoreを作るお決ま2点りセット
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// storeのreducer
import customCounterReducer from "./features/customCounter/customCounterSlice";

// 今回テストする内容
import ReduxAsync from "./ReduxAsync";

afterEach( () => {
    cleanup()
} )
describe( "ReduxAsync test", () => {
    let store
    beforeEach( () => { // 各テストの前にsoteを作る。store.jsと同じ事をしている
        store = configureStore( {
            reducer: {
                customCounter: customCounterReducer
            }
        } )
    } )
    it( "Should display value with 100 + payload", async () => {
        render(
            <Provider store={ store }>
                <ReduxAsync />
            </Provider>
        )
        await userEvent.click( screen.getByText( "FetchDummy" ) )
        expect( await screen.findByTestId( "count-value" ) ).toHaveTextContent( "105" )
    } )
} )
