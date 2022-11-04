import React from "react";
import {render , screen} from "@testing-library/react"
import UseEffectRender from "./UseEffectRender";

describe( "useEffect rendering", () => {
    // 非同期系のテストは、asyncをつける
    it("Shhould render only after async function resolved", async () => {
        render( <UseEffectRender /> )
        expect( screen.queryByText( /I am/ ) ).toBeNull() //非同期処理が走る前は、存在しない。正規表現を使うことで、文字列の一部を見つけてくれる
        expect (await screen.findByText(/I am/)).toBeInTheDocument() //findはUIの更新を待ってからノードを取得する際に使用する
    } )
    
})
