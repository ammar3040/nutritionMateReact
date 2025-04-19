import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth } from '../../FireBase';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

export function BMICalculator() {
    // State variables
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [date, setDate] = useState(new Date());
    const [BMIResult, setBMIResult] = useState('');
    const [bmiHistory, setBmiHistory] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initialize Firestore
    const db = getFirestore();

    // Track user authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    // Load BMI history when user changes
    useEffect(() => {
        if (!currentUser) {
            setBmiHistory([]);
            return;
        }

        setLoading(true);
        const bmiCollection = collection(db, `users/${currentUser.uid}/bmiHistory`);
        const q = query(bmiCollection, orderBy("date", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const history = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBmiHistory(history);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser, db]);

    // Calculate BMI
    const calculateBMI = (weight, height) => {
        if (!weight || !height) return;
        const calculatedBMI = ((weight / height / height) * 10000).toFixed(1);
        setBMIResult(calculatedBMI);
        return calculatedBMI;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert("Please sign in to save your BMI data");
            return;
        }

        const bmiValue = calculateBMI(weight, height);
        if (!bmiValue) return;

        try {
            const bmiCollection = collection(db, `users/${currentUser.uid}/bmiHistory`);
            await addDoc(bmiCollection, {
                weight: parseFloat(weight),
                height: parseFloat(height),
                bmi: parseFloat(bmiValue),
                date: date.toISOString().split('T')[0], // YYYY-MM-DD format
                timestamp: new Date()
            });
        } catch (error) {
            console.error("Error saving BMI data:", error);
            alert("Failed to save BMI data");
        }
    };

    // Delete BMI record
    const deleteRecord = async (id) => {
        if (!currentUser) return;
        
        try {
            await deleteDoc(doc(db, `users/${currentUser.uid}/bmiHistory/${id}`));
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Failed to delete record");
        }
    };

    // Prepare chart data
    const chartData = {
        labels: bmiHistory.map(record => record.date),
        datasets: [
            {
                label: 'BMI History',
                data: bmiHistory.map(record => record.bmi),
                borderColor: '#9dca00',
                backgroundColor: 'rgba(157, 202, 0, 0.1)',
                tension: 0.1,
                fill: true
            }
        ]
    };

    return (
        <div className="bmi-container">
            <h1 className="bmi-title">BMI Calculator</h1>
            
            {!currentUser && (
                <div className="auth-alert">
                    <p>Sign in to save and track your BMI history</p>
                </div>
            )}

            <div className="bmi-form-container">
                <form onSubmit={handleSubmit} className="bmi-form">
                    <div className="form-group">
                        <label htmlFor="weight">Weight (kg):</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter weight in kg"
                            step="0.1"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Height (cm):</label>
                        <input
                            type="number"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter height in cm"
                            step="0.1"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="button"
                            className="calculate-btn"
                            onClick={() => calculateBMI(weight, height)}
                            disabled={!weight || !height}
                        >
                            Calculate BMI
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Your BMI:</label>
                        <input
                            type="text"
                            value={BMIResult}
                            readOnly
                            className="bmi-result"
                        />
                    </div>

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={!currentUser || !BMIResult}
                    >
                        {currentUser ? "Save Record" : "Sign In to Save"}
                    </button>
                </form>

                <div className="bmi-chart">
                    {bmiHistory.length > 0 ? (
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        min: Math.max(0, Math.min(...chartData.datasets[0].data) - 5)
                                    }
                                }
                            }}
                        />
                    ) : (
                        <p className="no-data">No BMI history available</p>
                    )}
                </div>
            </div>

            {loading && <p className="loading">Loading your BMI history...</p>}

            {bmiHistory.length > 0 && (
                <div className="bmi-history">
                    <h2>Your BMI History</h2>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Weight (kg)</th>
                                <th>Height (cm)</th>
                                <th>BMI</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bmiHistory.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.date}</td>
                                    <td>{record.weight}</td>
                                    <td>{record.height}</td>
                                    <td>{record.bmi}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteRecord(record.id)}
                                            className="delete-btn"
                                            disabled={!currentUser}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .bmi-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                    font-family: Arial, sans-serif;
                }
                
                .bmi-title {
                    text-align: center;
                    color: #333;
                    margin-bottom: 2rem;
                }
                
                .auth-alert {
                    background-color: #fff3cd;
                    color: #856404;
                    padding: 1rem;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                
                .bmi-form-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                .bmi-form {
                    flex: 1;
                    min-width: 300px;
                    background: #f9f9f9;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .form-group {
                    margin-bottom: 1rem;
                }
                
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                
                input, .react-datepicker-wrapper {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                
                .bmi-result {
                    font-weight: bold;
                    color: #333;
                }
                
                .calculate-btn, .save-btn {
                    width: 100%;
                    padding: 0.75rem;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .calculate-btn {
                    background-color: #9dca00;
                    color: white;
                }
                
                .calculate-btn:hover {
                    background-color: #8ab800;
                }
                
                .calculate-btn:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                
                .save-btn {
                    background-color: #007bff;
                    color: white;
                    margin-top: 1rem;
                }
                
                .save-btn:hover {
                    background-color: #0069d9;
                }
                
                .save-btn:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }
                
                .bmi-chart {
                    flex: 2;
                    min-width: 300px;
                    background: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    height: 400px;
                }
                
                .no-data {
                    text-align: center;
                    color: #6c757d;
                    margin-top: 3rem;
                }
                
                .loading {
                    text-align: center;
                    color: #6c757d;
                }
                
                .bmi-history {
                    margin-top: 2rem;
                }
                
                .history-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;
                }
                
                .history-table th, .history-table td {
                    padding: 0.75rem;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                
                .history-table th {
                    background-color: #f5f5f5;
                    font-weight: 600;
                }
                
                .delete-btn {
                    padding: 0.25rem 0.5rem;
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .delete-btn:hover {
                    background-color: #c82333;
                }
                
                .delete-btn:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}