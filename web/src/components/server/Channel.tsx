import { useState, useEffect } from "react";
import { IChannel, IMessage } from "../../interfaces";
import axios from "axios";
import API_URL from "../../constants";

interface IChannelProps {
  channel: IChannel;
}

export default function Channel({ channel }: IChannelProps) {
  let [text, setText] = useState("");
  let [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/message/channel/${channel.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((response) => {
        if (response.data.messages) {
          setMessages(response.data.messages);
        }
      })
      .catch((e) => console.error(e));
  }, [channel]);

  let sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    axios
      .post(
        `${API_URL}/api/message/create`,
        {
          text,
          channelId: channel.id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message) {
          //
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div id="Channel">
      {messages.map((m, mIdx) => <p key={mIdx} style={{'color':'white'}}>{m.text}</p>)}
      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={(e) => sendMessage(e)}>Submit</button>
    </div>
  );
}
