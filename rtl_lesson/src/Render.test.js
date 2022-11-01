import React from "react"
import {render, screen} from "@testing-library/react";
import Render from "./Render";

// Test Suites: ファイルの数
// Tests : テストケースの数

describe( "Rendering", () => {
    it( "Should render all th elements correctly", () => {
        render( <Render /> ) // 最初にコンポーネントを取得する
        //screen.debug(); // renderされた内容の表示ができる
        //screen.debug(screen.getByRole("heading")) // hタグを取得できる

        //https://jestjs.io/docs/expect
        expect( screen.getByRole( "heading" ) ).toBeTruthy(); //hgeadingが存在する
        expect( screen.getByRole( "textbox" ) ).toBeTruthy();
        expect( screen.getAllByRole( "button" )[0]).toBeTruthy();
        expect( screen.getAllByRole( "button" )[ 1 ] ).toBeTruthy();
        //screen.debug(screen.getByText("Udemy"))
        expect( screen.getByText( "Udemy" ) ).toBeTruthy();
        expect( screen.queryByText( 'udeeee' ) ).toBeNull() // queryByで、nullを返す。toBeNullで存在しない事を証明する 
        expect( screen.getByTestId( "copyright" ) ).toBeTruthy();
    } )
})
