import React, { useState } from 'react';

const Update = ({ setCurrentPage }) => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    branch: '',
    percentage: ''
  });

  const fetchStudent = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/student/${studentId}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      const data = await response.json();
      setStudentData(data);
      setUpdatedData({
        name: data.name,
        branch: data.branch,
        percentage: data.percentage
      });
    } catch (err) {
      setError(err.message);
      setStudentData(null);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/student/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      alert('Student updated successfully!');
      setCurrentPage('home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="view-container">
      <h2 className="view-title">Update Student</h2>

      {/* ID Input Section */}
      <div>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button onClick={fetchStudent} className="back-button">
          Fetch Student
        </button>
      </div>

      {/* Loading/Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Form Section */}
      {studentData && (
        <div style={{ marginTop: '2rem' }}>
          <label>
            Name:
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              style={{ marginLeft: '1rem', padding: '0.4rem' }}
            />
          </label>
          <br /><br />

          <label>
            Branch:
            <input
              type="text"
              value={updatedData.branch}
              onChange={(e) => setUpdatedData({ ...updatedData, branch: e.target.value })}
              style={{ marginLeft: '1rem', padding: '0.4rem' }}
            />
          </label>
          <br /><br />

          <label>
            Percentage:
            <input
              type="number"
              value={updatedData.percentage}
              onChange={(e) => setUpdatedData({ ...updatedData, percentage: e.target.value })}
              style={{ marginLeft: '1rem', padding: '0.4rem' }}
            />
          </label>
          <br /><br />

          <button onClick={handleUpdate} className="back-button">
            Submit Update
          </button>
        </div>
      )}

      {/* Back to Home */}
      <button onClick={() => setCurrentPage('home')} className="back-button" style={{ marginTop: '2rem' }}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Update;
