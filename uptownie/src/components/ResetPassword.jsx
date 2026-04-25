import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { email } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BASE_URL =
  window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://uptownie.onrender.com";
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/reset-password`, {
      email,
      password
    })
    .then(res => {
      if (res.data.status === "success") {
        alert("Password updated successfully");
        navigate("/login");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Set New Password</h2>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Update Password</button>
      </form>
    </>
  );
}

export default ResetPassword;
