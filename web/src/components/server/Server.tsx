import {useState, useEffect} from "react"
import { IChannel, IServer } from "../../interfaces"
import API_URL from "../../constants"
import axios from "axios"

interface IServerProps {
    server: IServer
}

export default function Server({server}: IServerProps) {
    let [channels, setChannels] = useState<Array<IChannel>>([])
    let [currentChannel, setCurrentChannel] = useState<IChannel>()

    return (
        <div>{server.name}</div>
    )
}