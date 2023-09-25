import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router , Routes,Route, Navigate} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Protected from './Protected'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const[token,settoken] = useState(localStorage.getItem('token') || '')

    const logout = () =>{
      localStorage.removeItem('token')
      settoken('')
      
    }
  return (
    <Router>
      <div className="app">
        <header>
        <h1 className='mt-5'>MERN JWT Authentication</h1>
        {token && <button onClick={logout}>Logout</button>}
        </header>
        <main>
          <Routes>
            <Route path='/register' Component={Register}></Route>
            <Route path='/login' element={<Login settoken={settoken}></Login>}></Route>
            <Route path='/protected' element={token ? <Protected></Protected> : <Navigate to='/login'></Navigate>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
