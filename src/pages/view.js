import React, { useState, useEffect } from 'react';
import '../App.css'

const View = ({ setCurrentPage }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/students');

        const raw = await response.text(); // get plain text (not JSON yet)

        console.log("RAW RESPONSE:", raw); // check this in DevTools console

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${raw}`);
        }

        const data = JSON.parse(raw); // manually parse JSON now
        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError(err.message || "Failed to load students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return (
      <div className="view-container">
        <h2 className="view-title">Loading Students...</h2>
        <div className="loading-spinner"></div> {/* Simple loading spinner */}
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
    return (
      <div className="view-container">
        <h2 className="view-title">No Students Found</h2>
        <p className="no-students-message">It looks like there are no students registered yet.</p>
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
            {students.map((student) => (
              <tr key={student.roll_number}>
                <td>{student.roll_number}</td>
                <td>{student.name}</td>
                <td>{student.percentage}</td>
                <td>{student.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="total-students">Total Students: {students.length}</p>
      {/* Moved the button here */}
      <button onClick={() => setCurrentPage('home')} className="back-button">
        Go Back to Home
      </button>
    </div>
  );
};

export default View;