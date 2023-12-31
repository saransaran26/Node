import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({settoken}) {
    const navigate = useNavigate()
    const[formdata,setformdata] = useState({
        username:'',
        password:''
    })

    const handlechange =  (e) =>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }

    const handlenewuser = ()=>{
        navigate('/register')
    }
    const handleinputs = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:4000/api/login",formdata)
            console.log(response.data);
            const {token} = response.data
            settoken(token)
            localStorage.setItem('token',token)
            navigate('/protected')
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='registerbody'>
        <h1 className='mt-4'>Login</h1>
        <form onSubmit={handleinputs}>
            <div className='register mt-4'>
            <label htmlFor="username">Username : </label>
            <input type="text" id='username' name="username" onChange={handlechange} value={formdata.username} />
            </div>

            <div className='register mt-4'>
            <label htmlFor="password">password : </label>
            <input type="password" id='password' name="password" onChange={handlechange} value={formdata.password} />
            </div>
            <button type='submit' className='mt-5 btn btn-primary me-5'>Login</button>
            <button onClick={handlenewuser} className='mt-5 btn btn-dark'>New User</button>
        </form>
    </div>
  )
}

export default Login