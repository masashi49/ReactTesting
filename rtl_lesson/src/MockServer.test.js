import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

//テストの時はコンポーネント側のエンドポイントではなく、テスト用に作成した下記mocサーバーへアクセスしてくれる。
// req, res, ctxリクエスト,レスポンス,コンテキスト
const server = setupServer(
    rest.get( "https://jsonplaceholder.typicode.com/users/1", ( req, res, ctx ) => { //reqは今回使わないよ
        return res( ctx.status( 200 ), ctx.json( { username: "Bred dummy" } ) );
    } )
);

// beforeAll このファイルのテストが始まる前に一度だけ実行する
beforeAll( () => {
    server.listen() // モックっサーバー起動
} )

afterEach( () => {
    server.resetHandlers() // これはお決まり
} )

// 最後に一回だけ呼びだしたい
afterAll( () => {
    server.close() // サーバー停止
} )

describe( "Mocking API", () => {
    //成功
    it( "[Fetch success]Should display fetched data correctly and button disable", async () => {
        render( <MockServer /> );
        await userEvent.click( screen.getByRole( "button" ) );
        expect( await screen.findByRole( "heading" ) ).toHaveTextContent( "Bred dummy" );// toHaveTextContent指定した文字列と同じものがあるか。非同期なのでfindを使って待つ。
        expect( screen.getByRole( "button" ) ).toHaveAttribute( "disabled" ) // disabledの属性があるか
    } )
    //失敗 
    it( "[Fetch Error ]Should display error msg , no render heading and button abled", async () => {
        //このitの中だけで有効となる
        server.use(
            rest.get( "https://jsonplaceholder.typicode.com/users/1", ( req, res, ctx ) => {
                return res( ctx.status( 404 ) ); // 404を返す
            } ) )
        render( <MockServer /> );
        await userEvent.click( screen.getByRole( "button" ) );
        expect( await screen.findByTestId( "error" ) ).toHaveTextContent( "Fetching Feild" ) //findByTestId 非同期なので表示を待つ。toHaveTextContentでテキストがマッチするか
        expect( screen.queryByRole( "heading" ) ).toBeNull() // queryByRoleはawaitいらない
        expect( screen.getByRole( "button" ) ).not.toHaveAttribute( "disabled" ) // ボタンにdisabledの属性が.notか。(notで否定なので、存在しないかになる。)
    } )
} )
