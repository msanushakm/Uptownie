import "./Login.css";
import {Link} from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const[email, setEmail]=useState();
    const[password, setPassword]=useState();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('https://uptownie.onrender.com/login',{email,password})
        .then(result=>{
          console.log(result)
          if(result.data.status==="success"){
            localStorage.setItem("role",result.data.role);
            localStorage.setItem("user", JSON.stringify(result.data));
            if (result.data.role === "admin") {
              navigate("/admin")
            } else {
              navigate('/')
            }
          }
        })
        .catch(err=>console.log(err))
    }    
    return(
        <>
      <h1 style={{ textAlign: "center" }}>Log In</h1>
      <h4 style={{ textAlign: "center" }}>Home {'>'} Account</h4>

        <div className="mainn">
          
          <div id="div1">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <input 
              type="email" 
              name="email" 
              className="inputss" 
              id="email" 
              placeholder="Email" 
              onChange={(e)=>setEmail(e.target.value)}
              required/>
              <br /><br />

              <input 
              type="password" 
              name="password" 
              className="inputss" 
              id="password" 
              placeholder="Password" 
              onChange={(e)=>setPassword(e.target.value)}
              required/>
              <br /><br />

              <Link to="/forgotpw">Forgot your password?</Link>
              <br /><br />

              <input type="submit" value="Sign In" />
            </form>
          </div>

          <div id="div2">
            <h2>New Customer</h2>
            <p>
              Sign up for early Sale access plus tailored new<br />
              arrivals, trends and promotions. To opt out, click<br />
              unsubscribe in our emails.
            </p>
            <Link to='/register'><button id="reg">Register</button></Link>
          </div>

        </div>
    </>
  );
}

export default Login;
