
import './App.css'
import ThemeContext from './ThemeContext';
import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserContext from './UserContext';
function App() {
 
const [theme, setTheme] = useState('light');

const [user, setUser] = useState({ name: 'Pavardenis', role: 'user'});

//sukuriame provaideri



  return (
    <ThemeContext.Provider value={{theme, setTheme}} >
      <UserContext.Provider value={{user, setUser}} >
    <Login />
    <Dashboard />
    </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
