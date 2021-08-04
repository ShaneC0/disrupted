import { IChannel } from "../../interfaces";

interface IChannelProps {
    channel: IChannel
}

export default function Channel({channel}: IChannelProps) {

    return (
        <div id="Channel">Channel</div>
    )
}