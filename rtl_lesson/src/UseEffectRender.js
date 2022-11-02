import React,{useEffect,useState} from 'react'
import axios from "axios"

const UseEffectRender = () => {
    const [ user, setUser ] = useState( null )
    const fetchJSON = async () => {
        const res = await axios.get( "https://jsonplaceholder.typicode.com/users/1" )
        return res.data
    }
    useEffect( () => {
        const fetchUser = async () => {
            const user = await fetchJSON()
            setUser(user)
        }
        fetchUser()
    }, [] )
    
  return (
      <div>
          { user ? <p>i am { user.name },,{ user.email }</p> : <p>Loading</p>}
    </div>
  )
}

export default UseEffectRender
