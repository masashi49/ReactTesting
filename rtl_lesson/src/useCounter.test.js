
// hooksをテストするライブラリをインストール
// yarn add @testing-library/react-hooks 
// yarn add react-test-renderer

import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";
import { cleanup } from "@testing-library/react"

afterEach( () => {
    cleanup()
} )

describe( "useCounter custom hooks", () => {
    it( "should increment by 1", () => {
        const { result } = renderHook( () => useCounter( 3 ) ) // カスタムフックをレンダーする renderHookは resultを返す
        expect( result.current.count ).toBe( 3 ) // resultの中にはhooksでreturnされたものが入っており、currentで取り出せる

        // hooks内の関数を走らせる時はactで囲む
        act( () => {
            result.current.increment()
            result.current.increment()
        } )
        expect( result.current.count ).toBe( 5 )
    } )
    it( "should decrement by 1", () => {
        const { result } = renderHook( () => useCounter( 3 ) )
        expect( result.current.count ).toBe( 3 )
        act( () => {
            result.current.decrement()
        } )
        expect( result.current.count ).toBe( 2 )
    } )
    it( "should double by 1", () => {
        const { result } = renderHook( () => useCounter( 3 ) )
        expect( result.current.count ).toBe( 3 )
        act( () => {
            result.current.double()
        } )
        expect( result.current.count ).toBe( 6 )
    } )
    it( "should triple by 1", () => {
        const { result } = renderHook( () => useCounter( 3 ) )
        expect( result.current.count ).toBe( 3 )
        act( () => {
            result.current.triple()
        } )
        expect( result.current.count ).toBe( 9 )
        act( () => {
            result.current.triple()
        } )
        expect( result.current.count ).toBe( 27 )
        act( () => {
            result.current.decrement()
        } )
        expect( result.current.count ).toBe( 26 )
    } )
    it( "should reset by 1", () => {
        const { result } = renderHook( () => useCounter( 3 ) )
        expect( result.current.count ).toBe( 3 )
        act( () => {
            result.current.reset()
        } )
        expect( result.current.count ).toBe( 0 )
    } )
} )
