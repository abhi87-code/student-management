import React, { useState } from 'react';

const Add = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    percentage: '',
    contactNumber: ''
  });


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/student/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add student');
      }

      setMessage('Student added successfully!');
      setFormData({
        name: '',
        branch: '',
        percentage: '',
        contactNumber: ''
      });
    } catch (err) {
      console.error('Add student failed:', err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="view-container">
      <h2 className="view-title">Add New Student</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Enter Branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="percentage"
          placeholder="Enter Percentage"
          value={formData.percentage}
          onChange={handleChange}
          required
        />
       <input
  type="text"
  name="contactNumber"
  value={formData.contactNumber}
  onChange={handleChange}
  placeholder="Enter Contact Number"
/>

        <button type="submit" className="back-button">Add Student</button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      <button onClick={() => setCurrentPage('home')} className="back-button">
        Go Back to Home
      </button>
    </div>
  );
};

export default Add;
  