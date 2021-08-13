import { useState, useEffect, createContext } from "react";
import Auth from "./components/auth/Auth";
import Main from "./components/main/Main";
import axios from "axios";
import API_URL from "./constants";
import { IUser } from "./interfaces";

export const UserContext = createContext<IUser | {}>({});

export default function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [user, setUser] = useState<IUser>({ id: "", username: "" });

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get(`${API_URL}`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          let { user } = response.data;
          if (user) {
            setUser(user);
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div id="App">
        {isLoggedIn ? (
          <Main />
        ) : (
          <Auth setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </UserContext.Provider>
  );
}
