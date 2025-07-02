import React, { useState, useEffect } from 'react';
import '../App.css';

const View = ({ setCurrentPage }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/students', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const raw = await response.text();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${raw}`);
        }
        const data = JSON.parse(raw);
        // Debug: Check what keys are present
        // console.log("Fetched students:", data);
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load students. Please login again or try later.");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="view-container">
        <h2 className="view-title">Loading Students...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-container">
        <h2 className="view-title error-message">Error: {error}</h2>
        <button onClick={() => setCurrentPage('home')} className="back-button">
          Go Back to Home
        </button>
      </div>
    );
  }

  if (students.length === 0) {
    console.log("Fetched students:", students);

    return (
      <div className="view-container">
        <h2 className="view-title">No Students Found</h2>
        <p className="no-students-message">
          It looks like there are no students registered yet.
        </p>
        <button onClick={() => setCurrentPage('home')} className="back-button">
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="view-container">
      <h2 className="view-title">All Registered Students</h2>
      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.roll_Number}>
                <td>{student.roll_Number}</td>
                <td>{student.name}</td>
                <td>{student.percentage}</td>
                <td>{student.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="total-students">Total Students: {students.length}</p>
      <button onClick={() => setCurrentPage('home')} className="back-button">
        Go Back to Home
      </button>
    </div>
  );
};

export default View;
