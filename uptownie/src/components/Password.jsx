import { Link, useNavigate } from "react-router-dom";
import "./Passsword.css";
import { useState } from "react";
import axios from "axios";

function Password() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://uptownie.onrender.com/forgot-password", { email })
      .then(res => {
        if (res.data.status === "success") {
          navigate(`/reset-password/${email}`);
        } else {
          alert("Email not found");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Log In</h1>
      <h4 style={{ textAlign: "center" }}>Home {'>'} Account</h4>

      <div className="main">
        <div id="div1">
          <h2>Reset Your Password</h2>
          <p>We will send you an email to reset your<br/> password.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="inputts"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <br /><br />

            <input type="submit" value="Submit" />
            <Link to='/login'>
              <button type="button" id="canclebtn">Cancel</button>
            </Link>
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

export default Password;
