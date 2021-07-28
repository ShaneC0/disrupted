import {Dispatch, SetStateAction, useState} from "react"

interface AuthProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function Auth({setIsLoggedIn}: AuthProps) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [authMethod, setAuthMethod] = useState("signup")

    let attemptLogin = async () => {
    }

    return (
        <form style={{"display":"flex", "flexDirection":"column", "width":"25%"}}>
            <input placeholder="username"  onChange={e => setUsername(e.target.value)} />
            <input placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={(e) => {
                e.preventDefault()
                attemptLogin()
            }}>Submit</button>
        </form>
    )
}