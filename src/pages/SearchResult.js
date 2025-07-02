import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResult = ({ searchQuery, setCurrentPage }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');
      axios
        .get('http://localhost:8080/student/search', {
          params: { query: searchQuery },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          setResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Something went wrong while fetching search results.');
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <div className="view-container">
      <h2 className="view-title">Search Results for: "{searchQuery}"</h2>

      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p className="no-students-message">No matching students found.</p>
      )}

      {results.length > 0 && (
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student) => (
                <tr key={student.roll_Number}>
                  <td>{student.roll_Number}</td>
                  <td>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>{student.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="back-button" onClick={() => setCurrentPage('home')}>
        Go Back to Home
      </button>
    </div>
  );
};

export default SearchResult;
