import React from "react"
import {render ,screen , cleanup} from "@testing-library/react"
import FrameworkList from "./FrameworkList"

afterEach( () => cleanup() )

describe( "rendring the list with props", () => {
    it( "Should render No data when no data proped", () => {
        render( <FrameworkList /> )
        expect(screen.getByText("noData")).toBeInTheDocument()
    } )
    it( "Should render list item correctly", () => {
        const dummyData = [ {
            id: 1,
            item:"React dummy"
        },{
            id: 2,
            item:"Anguler dummy"
        },{
            id: 3,
            item:"Vue dummy"
            } ]
        render( <FrameworkList frameworks={ dummyData } /> )

        // screenに出力されたliタグの情報を取得する
        const frameworkItems = screen
            .getAllByRole( "listitem" ) // roleはli。複数あるのでgetAlllByRoleにした。
            .map( ( ele ) => ele.textContent ) // [ 'React dummy', 'Anguler dummy', 'Vue dummy' ] // textContentは文字列を返す

        // ダミーデータのitemだけを配列にする(こちらはpropsに渡していない)
        const dummyuItems = dummyData.map( ( ele ) => ele.item )
        expect( frameworkItems ).toEqual( dummyuItems ) // propsで渡したもの、渡していないものをtoEqualで同じかどうかexpectする
        expect(screen.queryByText("nodata")).toBeNull() //propsが渡されているテストなので、nodataはでない事をテストする。
    })
})
