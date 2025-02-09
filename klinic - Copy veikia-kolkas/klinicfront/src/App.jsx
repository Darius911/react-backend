import { Routes, Route } from 'react-router'
import './App.css'


import LoginForm from './components/LoginForm'
import CreateAppointment from './components/CreateAppointment'
import AppointmentsAll from './components/AppointmentsAll'
import Navigation from './components/Navigation'
import EditAppointment from './components/EditAppointment'

function App() {
 

  return (
    <>
    <Navigation />
      <Routes>
        <Route 
        path="/" 
        element={<LoginForm />} />

        <Route 
        path="/newappointments" 
        element={<CreateAppointment />} />

        <Route 
        path="/appointments"
        element={<AppointmentsAll />} />

        <Route 
        path="/appointments/:id"
        element={<EditAppointment />} />
      </Routes>

    </>
  )
}

export default App
