import React, { useEffect, useState } from 'react';

const ManageAccess = ({ setCurrentPage }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/user/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (username, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/user/${username}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (!response.ok) throw new Error('Failed to update role');
      setUsers(users.map(u => u.username === username ? { ...u, role: newRole } : u));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="view-container">
      <h2 className="view-title">Manage User Access</h2>
      {loading && <div className="loading-spinner">Loading users...</div>}
      {error && <p className="error-message">{error}</p>}
      {!loading && users.length > 0 && (
        <table className="students-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'USER' ? (
                    <button
                      onClick={() => handleRoleChange(user.username, 'ADMIN')}
                      className="back-button"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user.username, 'USER')}
                      className="back-button"
                    >
                      Make User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && users.length === 0 && (
        <p className="no-students-message">No users found.</p>
      )}
      <button onClick={() => setCurrentPage('home')} className="back-button" style={{ marginTop: '2rem' }}>
        Go Back to Home
      </button>
    </div>
  );
};

export default ManageAccess;
