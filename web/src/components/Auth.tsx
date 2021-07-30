import {Dispatch, SetStateAction, useState} from "react"
import axios from "axios"
import '../styles/Auth.css'
import API_ROUTE from '../constants'

interface AuthProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function Auth({setIsLoggedIn}: AuthProps) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [authMethod, setAuthMethod] = useState("signup")

    let attemptLogin = async () => {
       axios.post(`${API_ROUTE}/api/auth/${authMethod}`, {
           username,
           password
        }).then(response => {
            if(response.data.token) {
                localStorage.token = response.data.token
                setIsLoggedIn(true)
            }
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div id="Auth">
            <form>
                <p className="header-1">
                    welcome to disrupted.
                </p>
                <p className="header-2">
                    join us in the future of connectivity. 
                </p>
                <input placeholder="Username" />
                <input placeholder="Password" type="password" />
                <button>{authMethod}</button>
            </form>
        </div>
    )
}