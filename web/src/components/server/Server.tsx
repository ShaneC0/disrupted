import { useState, useEffect } from "react";
import { IChannel, IServer } from "../../interfaces";
import Channel from "./Channel";
import API_URL from "../../constants";
import axios from "axios";
import ChannelSelector from "./ChannelSelector";

interface IServerProps {
  server: IServer;
}

export default function Server({ server }: IServerProps) {
  let [channels, setChannels] = useState<Array<IChannel>>([]);
  let [currentChannel, setCurrentChannel] = useState<IChannel>();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/channel/server/${server.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((response) => {
        if (response.data.channels) {
          setChannels(response.data.channels);
          setCurrentChannel(response.data.channels[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [server]);

  let content = currentChannel ? (
    <Channel channel={currentChannel} />
  ) : (
    "No Channel Selected"
  );

  return (
    <div id="Server">
      <ChannelSelector
        channels={channels}
        setCurrentChannel={setCurrentChannel}
      />
      {content}
    </div>
  );
}
