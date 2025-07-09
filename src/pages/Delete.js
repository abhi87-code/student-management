import React, { useState } from 'react';

const Delete = ({ setCurrentPage }) => {
  const [deleteType, setDeleteType] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchStudent = async () => {
    if (!studentId.trim()) {
      alert("Please enter a valid student ID.");
      return;
    }

    setLoading(true);
    setStudentData(null);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/student/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
      } else if (response.status === 404) {
        setMessage(`Student with ID ${studentId} not found.`);
      } else {
        setMessage("Failed to fetch student.");
      }
    } catch (err) {
      setMessage("Error occurred while fetching student.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteById = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete student with ID ${studentId}?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/student/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setMessage(`Student with ID ${studentId} deleted successfully.`);
        setStudentData(null);
        setStudentId('');
      } else {
        setMessage("Failed to delete student.");
      }
    } catch (err) {
      setMessage("Error occurred while deleting student.");
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all students?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/students', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setMessage("All students deleted successfully.");
        setStudentData(null);
      } else {
        setMessage("Failed to delete all students.");
      }
    } catch (err) {
      setMessage("Error occurred while deleting all.");
    }
  };

  return (
    <div className="view-container">
      <h2 className="view-title">Delete Student</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            value="all"
            checked={deleteType === 'all'}
            onChange={() => {
              setDeleteType('all');
              setStudentId('');
              setStudentData(null);
              setMessage('');
            }}
          /> Delete All Students
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="byId"
            checked={deleteType === 'byId'}
            onChange={() => {
              setDeleteType('byId');
              setMessage('');
              setStudentData(null);
            }}
          /> Delete Student by ID
        </label>
      </div>

      {deleteType === 'byId' && (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', width: '200px' }}
            />
            <button onClick={handleFetchStudent} className="back-button" style={{ marginLeft: '1rem' }}>
              Fetch
            </button>
          </div>

          {loading && <p>Loading student data...</p>}

          {studentData && (
            <div style={{ marginBottom: '1rem' }}>
              <p><strong>Name:</strong> {studentData.name}</p>
              <p><strong>Roll Number:</strong> {studentData.roll_Number}</p>
              <p><strong>Branch:</strong> {studentData.branch}</p>
              <p><strong>Percentage:</strong> {studentData.percentage}</p>

              <button onClick={handleDeleteById} className="back-button" style={{ marginTop: '1rem' }}>
                Delete
              </button>
            </div>
          )}
        </>
      )}

      {deleteType === 'all' && (
        <button onClick={handleDeleteAll} className="back-button">
          Delete All
        </button>
      )}

      {message && (
        <div style={{ marginTop: '1rem', color: '#e53e3e', fontWeight: 'bold' }}>{message}</div>
      )}

      <button onClick={() => setCurrentPage('home')} className="back-button" style={{ marginTop: '2rem' }}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Delete;
