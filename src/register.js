import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";

function Register({ setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date(),
      });
      alert(`Registered successfully as ${role}!`);
      setShowRegister(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="welcome-panel">
        <h2 className="welcome-title">Welcome Back!</h2>
        <p className="welcome-text">
          To keep connected with us please login with your personal info
        </p>
        <button className="form-button" onClick={() => setShowRegister(false)}>
          SIGN IN
        </button>
      </div>
      <div className="form-panel">
        <h2 className="form-title">Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister} className="form">
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
          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              id="confirm-password"
            />
          </div>
          <div className="role-selection">
            <label className="role-label">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="role-radio"
              />
              <span></span>
              User (Website Access)
            </label>
            <label className="role-label">
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                className="role-radio"
              />
              <span></span>
              Admin (Admin Panel)
            </label>
          </div>
          <button type="submit" className="form-button">
            SIGN UP
          </button>
        </form>
        <p className="form-switch">
          Already have an account?{" "}
          <button
            onClick={() => setShowRegister(false)}
            className="switch-link"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
