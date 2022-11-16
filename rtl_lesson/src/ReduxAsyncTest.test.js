//お決まり3点セット
import React from "react";
import { screen, render, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// APIをモックするためのimport 2点セット
import { rest } from "msw"
import { setupServer } from "msw/node"

// test用のstoreを作るお決ま2点りセット
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// storeのreducer
import customCounterReducer from "./features/customCounter/customCounterSlice";

// 今回テストする内容
import ReduxAsync from "./ReduxAsync";

// mocサーバーをセットアップ

const server = setupServer(
    rest.get( "https://jsonplaceholder.typicode.com/users/1", ( req, res, ctx ) => {
        return res( ctx.status( 200 ), ctx.json( { username: "Bred dummy" } ) );
    } )
);

// このファイルのテストが始まる前に1度だけ実行
beforeAll( () => server.listen() ) // server.ほげは全部関数なので  server.ほげ() とする。

afterEach( () => { // 各テストケースが終わるたびに実行
    server.resetHandlers() // サーバーをいったんリセットする。各テストケースが終わるたびにこれをよびだすのはお決まり、そのためafterEachに記述するのが定例となっている。
    cleanup()
} )

afterAll( () => server.close() );

describe( "ReduxAsync API mokking", () => {
    let store
    beforeEach( () => { // 各テストの前にsoteを作る。store.jsと同じ事をしている
        store = configureStore( {
            reducer: {
                customCounter: customCounterReducer
            }
        } )
    } )
    it( "[Fetch sucess] Should display username in h1 tag", async () => {
        render(
            <Provider store={ store }>
                <ReduxAsync />
            </Provider>
        );
        expect( screen.queryByRole( "heading" ) ).toBeNull();
        await userEvent.click( screen.getByText( "FetchJSON" ) );
        expect( await screen.findByText( "Bred dummy" ) ).toBeInTheDocument();
    } );
    it( "[Fetch faild] Should display anonimous in h3 tag", async () => {

        // このテストの中だけでサーバーの処理を上書き
        server.use(
            rest.get( "https://jsonplaceholder.typicode.com/users/1", ( req, res, ctx ) => {
                return res( ctx.status( 404 ) ); // 404を返す
            } ) )

        render(
            <Provider store={ store }>
                <ReduxAsync />
            </Provider>
        );
        expect( screen.queryByRole( "heading" ) ).toBeNull();
        await userEvent.click( screen.getByText( "FetchJSON" ) );
        expect( await screen.findByText( "anonymous" ) ).toBeInTheDocument();
    } );
} )
