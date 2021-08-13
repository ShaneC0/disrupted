import { useState, useEffect, useContext } from "react";
import { IChannel, IMessage } from "../../interfaces";
import { UserContext } from "../../App";
import axios from "axios";
import API_URL from "../../constants";
import { io } from "socket.io-client";

interface IChannelProps {
  channel: IChannel;
}

const socket = io(API_URL);

export default function Channel({ channel }: IChannelProps) {
  const user = useContext(UserContext);
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

    socket.on("message", (data) => {
      if (data.channelId === channel.id) {
        setMessages((old) => [...old, data]);
      }
    });
  }, [channel]);

  let sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    //Typescript returns a default HTML Element for document queries so you have to cast
    (document.getElementById("message-input") as HTMLInputElement).value = "";

    socket.emit("message", {
      user,
      channelId: channel.id,
      text,
    });

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
          setMessages((prev) => [...prev, response.data.message]);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div id="Channel">
      <div id="message-component">
        {messages.map((m, mIdx) => (
          <div className="message-item" key={mIdx}>
            <p className="message-username">{m.user.username}</p>
            <p className="message-text">{m.text}</p>
          </div>
        ))}
      </div>
      <div id="input-component">
        <input id="message-input" onChange={(e) => setText(e.target.value)} />
        <button onClick={(e) => sendMessage(e)}>Submit</button>
      </div>
    </div>
  );
}
