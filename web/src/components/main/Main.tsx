import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../constants";
import { IServer } from "../../interfaces";
import ServerSelector from "./ServerSelector";
import Server from "../server/Server"
import "../../styles/Main.css";

interface IMainProps {
  userData: {
    id: string;
    username: string;
  };
}

export default function Main({ userData }: IMainProps) {
  let [servers, setServers] = useState<Array<IServer>>([]);
  let [currentServer, setCurrentServer] = useState<IServer>();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/server/user`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((response) => {
        if (response.data.servers) {
          setServers(response.data.servers);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="Main">
      <ServerSelector servers={servers} setCurrentServer={setCurrentServer} />
      <Server />
    </div>
  );
}
