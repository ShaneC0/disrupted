import {Dispatch, SetStateAction, useState} from "react"
import axios from "axios"
import API_ROUTE from '../constants'

interface AuthProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function Auth({setIsLoggedIn}: AuthProps) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [authMethod, setAuthMethod] = useState("signup")

    let attemptLogin = async () => {
       axios.post(`${API_ROUTE}/auth/${authMethod}`, {
           username,
           password
        }).then(response => {
            console.log(response.data)
            if(response.data.token) {
                localStorage.token = response.data.token
                setIsLoggedIn(true)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <form style={{"display":"flex", "flexDirection":"column", "width":"25%"}}>
            {authMethod}
            <input placeholder="username"  onChange={e => setUsername(e.target.value)} />
            <input placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={(e) => {
                e.preventDefault()
                attemptLogin()
            }}>Submit</button>
            <button onClick={(e) => {
                e.preventDefault()
                setAuthMethod(authMethod == "signup" ? "signin" : "signup")
            }} >Switch</button>
        </form>
    )
}