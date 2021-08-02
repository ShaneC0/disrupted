import {Dispatch, SetStateAction, useState} from "react"
import axios from "axios"
import '../styles/Auth.css'
import API_ROUTE from '../constants'
import IValidationError from "../interfaces"
import Input from './Input'

interface IAuthProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function Auth({setIsLoggedIn}: IAuthProps) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [authMethod, setAuthMethod] = useState("signup")
    let [validationErrors, setValidationErrors] = useState<Array<IValidationError>>([])
    let [serverErrors, setServerErrors] = useState([])

    let attemptLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       e.preventDefault();
       axios.post(`${API_ROUTE}/api/auth/${authMethod}`, {
           username,
           password
        }).then(response => {
            if(response.data.token) {
                localStorage.token = response.data.token
                setIsLoggedIn(true)
            }
        }).catch(error => {
            console.log(error.response.data)
            if('validationErrors' in error.response.data) {
                setValidationErrors(error.response.data.validationErrors)
            }
        })
    }

    let switchAuthMethod = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault() 
        setAuthMethod(authMethod == "signup" ? "signin" : "signup")
    }

    let switchTag = authMethod == "signup" ? 
        <p className="switchtag">Already have an account? <button onClick={e => switchAuthMethod(e)} className="switch">Log In</button></p> : 
        <p className="switchtag">Don't have an account? <button onClick={e => switchAuthMethod(e)} className="switch">Get Started</button></p> 


    return (
        <div id="Auth">
            <form>
                <p className="header-1">
                    welcome to disrupted.
                </p>
                <p className="header-2">
                    join us in the future of connectivity. 
                </p>

                <Input 
                    element="username" 
                    password={false} 
                    update={setUsername} 
                    errors={validationErrors.filter(err => err.property === "username")[0]}/>

                <Input 
                    element="password" 
                    password={true} 
                    update={setPassword} 
                    errors={validationErrors.filter(err => err.property === "password")[0]} />

                <button className="submit" onClick={e => attemptLogin(e)}>
                    {authMethod == "signup" ? "Get Started" : "Log In"}
                </button>

                {switchTag}
            </form>
        </div>
    )
}