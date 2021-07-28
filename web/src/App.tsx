import {useState} from 'react';
import './styles/App.css';
import Auth from './components/Auth'

export default function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      {isLoggedIn ? 'logged in' : <Auth  setIsLoggedIn={setIsLoggedIn} /> }
    </div>
  );
}

