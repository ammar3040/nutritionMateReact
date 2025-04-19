  import React, { useState } from "react";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../FireBase";
import "./FormLogin.css"
  import { Link, useNavigate } from "react-router-dom";


  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
   let  navigate=useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
       
        navigate("/")
      } catch (err) {
        setError(err.message);
      }
    };

    return (
      <div style={{
        display:"flex",
        justifyContent:"center",
      }}>
      <div className="auth-container" style={{width:"600px"}}>
        <div className="form-panel" style={{margin:"0 auto",width:"600px",}}>
          <h2 className="form-title">Sign in</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin} className="LOginForm">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                id="email"
              
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                id="password"
              />
            </div>
          
            <button type="submit" className="form-button">
              SIGN IN
            </button>
           
          </form>
          <p className="form-switch">
            Don't have an account?{" "}
            <Link to="/signup">
            <button  className="switch-link">
              Sign Up
            </button>
            </Link>
          </p>
        </div>
        
      </div>
      </div>
    );
  }

  export default Login;
