import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../FireBase";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [lifestyle, setLifestyle] = useState("Active");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("Lose Weight");
  const [activityLevel, setActivityLevel] = useState("Sedentary");
  const [mealPreference, setMealPreference] = useState("Veg");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [waterGoal, setWaterGoal] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        age,
        address,
        height,
        weight,
        lifestyle,
        gender,
        goal,
        activityLevel,
        mealPreference,
        medicalConditions,
        wakeTime,
        sleepTime,
        waterGoal,
        createdAt: new Date(),
      });

      await signOut(auth); // Sign out after registration
      alert(`Registered successfully as ${role}! Please log in.`);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <h2 style={{textAlign:"center"}}>Sign Up</h2>
    <div className="signup-container">
      {error && <p className="error-message">{error}</p>}
    
      <div className="signup-panel">
       
        <form onSubmit={handleRegister} className="SignUpForm">
          <div className="signup-flex-container">
            <div className="leftForm">
              <div className="signup-group">
                <label className="signup-label">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              </div>
              <div className="signup-group">
                <label className="signup-label">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="form-input" />
              </div>
            </div>
            <div className="RightForm">
              <div className="signup-group">
                <label className="signup-label">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Lifestyle</label>
                <select value={lifestyle} onChange={(e) => setLifestyle(e.target.value)} className="form-input">
                  <option>Active</option>
                  <option>Not Active</option>
                </select>
              </div>

              <div className="signup-group">
                <label className="signup-label">Gender</label>
                <div className="role-selection">
                  <label className="role-label"><input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male</label>
                  <label className="role-label"><input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female</label>
                  <label className="role-label"><input type="radio" value="Other" checked={gender === "Other"} onChange={(e) => setGender(e.target.value)} /> Other</label>
                </div>
              </div>

              <div className="signup-group">
                <label className="signup-label">Fitness Goal</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="form-input">
                  <option>Lose Weight</option>
                  <option>Gain Muscle</option>
                  <option>Maintain</option>
                </select>
              </div>

              <div className="signup-group">
                <label className="signup-label">Activity Level</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="form-input">
                  <option>Sedentary</option>
                  <option>Lightly Active</option>
                  <option>Very Active</option>
                </select>
              </div>

              <div className="signup-group">
                <label className="signup-label">Meal Preference</label>
                <select value={mealPreference} onChange={(e) => setMealPreference(e.target.value)} className="form-input">
                  <option>Veg</option>
                  <option>Non-Veg</option>
                  <option>Vegan</option>
                </select>
              </div>

              <div className="signup-group">
                <label className="signup-label">Medical Conditions</label>
                <textarea value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Wake-Up Time</label>
                <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Sleep Time</label>
                <input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="form-input" />
              </div>

              <div className="signup-group">
                <label className="signup-label">Water Intake Goal (Liters)</label>
                <input type="number" value={waterGoal} onChange={(e) => setWaterGoal(e.target.value)} className="form-input" min="0" />
              </div>

           <br />
              
            </div>
          </div>

          <button type="submit" className="form-button">SIGN UP</button>

          <p className="form-switch">
            Already have an account?{" "}
            <Link to="/login">
              <button className="switch-link">Sign In</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;
