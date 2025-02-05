
import './App.css'
import LoginForm from './components/LoginForm'
import {Route, Routes} from 'react-router'
import Home from './components/Home'
import Tours from './components/Tours'
import ProtectedRoute from './components/ProtectedRoute'
import DashBoard from './components/DashBoard'

function App() {
  

  return (
    <>
    <Routes>
      <Route 
      path="/" 
      element={<Home />} 
      />

      <Route 
      path="/login" 
      element={<LoginForm />} 
      />
      <Route
      path='/tours'
      element={<Tours />}
      />

      <Route
      path='/dashboard'
      element={
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      }
      />
    </Routes>
     
    </>
  )
}

export default App
