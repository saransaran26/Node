import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const[formdata,setformdata] = useState({
        username:'',
        password:''
    })

    const handlechange =  (e) =>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
    const handleloginpage = () => {
        navigate('/login')
    }
    const handleinputs = async (e) =>{
        // e.preventDefault();
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:4000/api/register",formdata)
            console.log(response.data);
            navigate('/login')
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleinputs}>
            <div>
            <label htmlFor="username">Username : </label>
            <input type="text" id='username' name="username" onChange={handlechange} value={formdata.username} required
            
            />
            </div>

            <div>
            <label htmlFor="password" >password : </label>
            <input type="text" id='password' name="password" onChange={handlechange} value={formdata.password} required 
            />
            </div>
            <button type='submit' >Register</button>
            <button onClick={handleloginpage}>Login in</button>
        </form>
    </div>
  )
}

export default Register