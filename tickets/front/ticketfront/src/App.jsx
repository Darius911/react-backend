
import { Route } from 'react-router'
import './App.css'
import TicketForm from './components/TicketForm';
import Ticket from './components/Ticket';
import { Routes} from 'react-router'
function App() {
  

  return (
    <>
    <Routes>
    <Route 
    path="/" 
    element={<TicketForm />} 
    />
    <Route
    path='/:id'
    element={<Ticket/>}
    />
    </Routes>
   
    </>
      
  )
}

export default App
