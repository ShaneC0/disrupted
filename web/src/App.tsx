import {useState, useEffect} from 'react';
import Auth from './components/Auth'
import Main from './components/Main'
import axios from "axios"
import API_URL from "./constants"

export default function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [userData, setUserData] = useState({id: "", username: ""})

  useEffect(() => {
    if(localStorage.token) {
      axios.get(`${API_URL}`, {
        headers: {
          'authorization': `Bearer ${localStorage.token}`
        }
      })
          .then(response => {
            let {user} = response.data
            if(user) {
              setUserData(user)
              setIsLoggedIn(true)
            }
          })
          .catch(error => {
              console.error(error)
          })
    }
  }, [])

  return (
    <div id="App">
      {isLoggedIn ? <Main userData={userData} /> : <Auth  setIsLoggedIn={setIsLoggedIn} /> }
    </div>
  );
}

