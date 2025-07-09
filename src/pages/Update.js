import React, { useState } from 'react';

const Update = ({ setCurrentPage, role }) => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    branch: '',
    percentage: '',
    role: 'USER'
  });

  const fetchStudent = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/student/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Student not found');
      }
      const data = await response.json();
      setStudentData(data);
      setUpdatedData({
        name: data.name,
        branch: data.branch,
        percentage: data.percentage,
        role: data.role || 'USER', // You need to fetch this from backend!
      });
    } catch (err) {
      setError(err.message);
      setStudentData(null);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      // 1. Update student info
      const response = await fetch(`/student/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updatedData.name,
          branch: updatedData.branch,
          percentage: updatedData.percentage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      // 2. If admin and role changed, update role
      if (role === 'ADMIN' && studentData.role !== updatedData.role && studentData.username) {
        const roleResponse = await fetch(`/user/${studentData.username}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ role: updatedData.role })
        });
        if (!roleResponse.ok) {
          throw new Error('Failed to update user role');
        }
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
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
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
          {/* Only show role dropdown if logged-in user is ADMIN */}
          {role === 'ADMIN' && (
            <>
              <label>
                Role:
                <select
                  value={updatedData.role}
                  onChange={(e) => setUpdatedData({ ...updatedData, role: e.target.value })}
                  style={{ marginLeft: '1rem', padding: '0.4rem' }}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </label>
              <br /><br />
            </>
          )}
          <button onClick={handleUpdate} className="back-button">
            Submit Update
          </button>
        </div>
      )}
      <button onClick={() => setCurrentPage('home')} className="back-button" style={{ marginTop: '2rem' }}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Update;
