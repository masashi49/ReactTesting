import React from "react"
import {render ,screen , cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RenderInput } from "./RenderInput"

describe( "Renderring", () => {
    it( "Should render all the elements corectly", () => {
        render( <RenderInput /> )
        expect( screen.getByRole( "button" ) ).toBeTruthy()
        expect(screen.getByPlaceholderText("Enter")).toBeTruthy()
    })
})
