import { useState } from "react"

export const useCounter = ( initialCount ) => {
    const [ count, setCount ] = useState( initialCount )

    const increment = () => {
        setCount( ( C ) => ++C )
    }
    const decrement = () => {
        setCount( ( C ) => --C )
    }

    const double = () => {
        setCount( ( C ) => C * 2 )
    }
    const triple = () => {
        setCount( ( C ) => C * 3 )
    }
    const reset = () => {
        setCount( 0 )
    }
    return { count, increment, decrement, double, triple, reset }
}
