import {useState, useEffect} from 'react';
import './styles/App.css';
import Auth from './components/Auth'
import Main from './components/Main'
import axios from "axios"
import API_URL from "./constants"


export default function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [user, setUser] = useState({})

  useEffect(() => {
    if(localStorage.token) {
      axios.get(`${API_URL}`)
          .then(response => {
            if(response.data.user) {
              setUser(response.data.user)
              setIsLoggedIn(true)
            }
          }).catch(error => {
              console.error(error)
          })
    }
  }, [])

  return (
    <div className="App">
      {isLoggedIn ? <Main /> : <Auth  setIsLoggedIn={setIsLoggedIn} /> }
    </div>
  );
}

