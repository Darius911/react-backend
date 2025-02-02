
import './App.css'
import { Routes, Route } from 'react-router'

import CreateForm from './components/CreateForm'
import InvoicesAll from './components/InvoicesAll'
import UpdateForm from './components/UpdateForm'

function App() {
  

  return (
    <div className='bg-gray-950'>
    

     <main>
      <Routes>
      <Route
        path="/newinvoice"
        element={<CreateForm/>}
        />

        <Route
        path="/"
        element={<InvoicesAll/>}
        />
        <Route
        path="/invoices/:invoice_code"
        element={<UpdateForm/>}
        />
      </Routes>


     </main>
    </div>
  )
}

export default App
