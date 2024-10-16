import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Headers from './components/Headers';
import PrivateRoute from './components/PrivateRoute';
import NewTicket from './pages/NewTicket';
import GetTicktes from './pages/GetTicktes';
import Ticket from './pages/Ticket';
 
function App() {
  return (
  <>
  <Router>
    <div className='container'>

      <Headers />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/login' element ={<Login />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/new-ticket' element ={<PrivateRoute />}>
        <Route path='/new-ticket' element ={<NewTicket />} />
        </Route>
        <Route path='/tickets' element ={<PrivateRoute />}>
        <Route path='/tickets' element ={<GetTicktes />} />
        </Route>
        <Route path='/ticket/:ticketId' element ={<PrivateRoute />}>
        <Route path='/ticket/:ticketId' element ={<Ticket />} />
        </Route>
      </Routes>
    </div>
  </Router>
  <ToastContainer />
  </>
  );
}

export default App;
