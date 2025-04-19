import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FireBase";
import "./admin.css";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id));
        if (userDoc.exists()) {
          setUser({
            id: userDoc.id,
            ...userDoc.data(),
            createdAt: userDoc.data().createdAt.toDate(),
          });
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error fetching user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="table-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="table-container">
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2 className="form-title">User Details</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{user.role}</td>
          </tr>
          <tr>
            <td>Activity Level</td>
            <td>{user.activityLevel || "N/A"}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{user.address || "N/A"}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{user.age || "N/A"}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{user.gender || "N/A"}</td>
          </tr>
          <tr>
            <td>Goal</td>
            <td>{user.goal || "N/A"}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{user.height || "N/A"}</td>
          </tr>
          <tr>
            <td>Lifestyle</td>
            <td>{user.lifestyle || "N/A"}</td>
          </tr>
          <tr>
            <td>Meal Preference</td>
            <td>{user.mealPreference || "N/A"}</td>
          </tr>
          <tr>
            <td>Medical Conditions</td>
            <td>{user.medicalConditions || "N/A"}</td>
          </tr>
          <tr>
            <td>Sleep Time</td>
            <td>{user.sleepTime || "N/A"}</td>
          </tr>
          <tr>
            <td>Wake Time</td>
            <td>{user.wakeTime || "N/A"}</td>
          </tr>
          <tr>
            <td>Water Goal</td>
            <td>{user.waterGoal || "N/A"}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{user.weight || "N/A"}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{user.createdAt.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => navigate("/admin")}
        className="form-button"
        style={{ marginTop: "20px", width: "200px" }}
      >
        Back to User List
      </button>
    </div>
  );
}

export default UserDetail;
