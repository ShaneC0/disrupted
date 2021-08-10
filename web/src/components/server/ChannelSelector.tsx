import { Dispatch, SetStateAction } from "react";
import { IChannel } from "../../interfaces";

interface IChannelSelectorProps {
  channels: Array<IChannel>;
  setCurrentChannel: Dispatch<SetStateAction<IChannel | undefined>>;
}

export default function ChannelSelector({
  channels,
  setCurrentChannel,
}: IChannelSelectorProps) {
  return (
    <div id="Channel-selector">
      {channels.map((channel, channelIdx) => (
        <button
          key={channelIdx}
          onClick={() => setCurrentChannel(channel)}
          className="channel-button"
        >
          {channel.name}
        </button>
      ))}
    </div>
  );
}
