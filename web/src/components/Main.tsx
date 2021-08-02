import { useState, useEffect } from "react"
import axios from "axios"
import API_URL from "../constants"

interface IMainProps {
    userData: {
        id: string,
        username: string
    }
}

export default function Main({userData}: IMainProps) {

    let [servers, setServers] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/api/server/user`, {
            headers: {
                'authorization': `Bearer ${localStorage.token}`
            }
        }).then(response => {
            if(response.data.servers) {
                setServers(response.data.servers)
            }
        }).catch(error => {
            console.error(error)
        })
    }, [])

    return (
        <div id="Main">
            yo
        </div>
    )
}