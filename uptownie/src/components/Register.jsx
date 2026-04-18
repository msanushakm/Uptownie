import { useState } from "react";
import "./Register.css";
import {Link} from "react-router-dom"
import axios from 'axios'

function Register(){
    const[firstName, setFirstName]=useState();
    const[secondName, setSecondName]=useState();
    const[email, setEmail]=useState();
    const[password, setPassword]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{firstName,secondName,email,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

    return(
        <>
        <div id="mainContainer">
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <h4 style={{ textAlign: "center" }}>Home {'>'} Create Account</h4>
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="first name" 
                id="first name" 
                className="inputs" 
                placeholder="First name"
                onChange={(e)=>setFirstName(e.target.value)}
                />
                <br /><br />
                <input 
                type="text" 
                name="second name" 
                id="second name" 
                className="inputs" 
                placeholder="Second name"
                onChange={(e)=>setSecondName(e.target.value)}
                />
                <br /><br />
                <input 
                type="email" 
                name="email" 
                id="email" 
                className="inputs" 
                placeholder="Email" 
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
                <br /><br />
                <input 
                type="password" 
                name="password" 
                className="inputs" 
                id="password" 
                placeholder="Password" 
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <br /><br />
                <p>Sign up for early Sale access plus tailored new arrivals,<br/> 
                    trends and promotions. To opt out, click unsubscribe in <br/>
                    our emails.</p>
                <input type="submit" value="Register" id="regbtn" />
            </form><br/>
                <Link to="/login"><button id="loginbtn">Log In</button></Link>
        </div>
        </div>
        </>
    )
}

export default Register;