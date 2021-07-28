import {useState} from 'react';
import './styles/App.css';
import Auth from './components/Auth'
import Main from './components/Main'

export default function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      {isLoggedIn ? <Main /> : <Auth  setIsLoggedIn={setIsLoggedIn} /> }
    </div>
  );
}

