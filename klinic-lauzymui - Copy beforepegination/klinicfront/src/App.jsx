import { Routes, Route } from 'react-router'
import './App.css'


import LoginForm from './components/LoginForm'
import CreateAppointment from './components/CreateAppointment'
import AppointmentsAll from './components/AppointmentsAll'

import EditAppointment from './components/EditAppointment'
import MyAppointmentsAll from './components/MyAppointmentsAll'
import SignupForm from './components/SignupForm'
import StarsRating from './components/StarsRating'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
 

  return (
    <>
    
      <Routes>
        <Route 
        path="/" 
        element={<LoginForm />} />

        <Route 
        path="/signup" 
        element={<SignupForm />} /> 
        

        <Route 
        path="/newappointments" 
        element={<CreateAppointment />} />

        <Route 
        path="/appointments"
        element={
          <ProtectedRoute>
          <AppointmentsAll/>
          </ProtectedRoute>
          } />

        <Route 
        path="/appointments/:id"
        element={<EditAppointment />} />
        <Route 
        path="/myappointments/rating/:id" 
        element={<StarsRating />} />

<Route 
  path="/myappointments"
  element={<MyAppointmentsAll />} 
/>
      </Routes>

    </>
  )
}

export default App
