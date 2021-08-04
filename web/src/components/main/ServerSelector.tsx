import { IServer } from "../../interfaces";
import { Dispatch } from "react";

interface IServerSelectorProps {
  servers: Array<IServer>;
  setCurrentServer: Dispatch<React.SetStateAction<IServer | undefined>>;
}

export default function ServerSelector({
  servers,
  setCurrentServer,
}: IServerSelectorProps) {
  return (
    <div id="server-selector">
      {servers.map((s, sIdx) => (
        <button
          className="server-button"
          key={sIdx}
          onClick={(e) => {
            setCurrentServer(s);
          }}
        >
          {s.name.charAt(0).toUpperCase()}
        </button>
      ))}
      <button className="server-button">+</button>
      <button
        className="server-button"
        onClick={(e) => {
          delete localStorage.token;
          window.location.reload();
        }}
      >
        X
      </button>
    </div>
  );
}
