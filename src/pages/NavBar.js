import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaEye, FaPlus, FaUserShield, FaBars } from 'react-icons/fa';

const Navbar = ({ setCurrentPage, setSearchQuery, role }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm.trim());
      setCurrentPage('searchResult');
      setSearchTerm('');
    }
  };

  // Style for nav buttons
  const navButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: 'none'
  };

  return (
    <div
      className="navbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1rem 2rem',
        background: '#f0f0f0',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="nav-left">
        <button
          className="project-title"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1976d2'
          }}
          onClick={() => setCurrentPage('home')}
        >
          Student Management
        </button>
      </div>

      <div
        className="nav-search"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Search by Name / Roll / Branch"
          className="search-input"
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            width: '250px'
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-button"
          style={{
            background: '#4c51bf',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div
        className="nav-right"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {/* View is always visible */}
        <button className="nav-button" style={navButtonStyle} onClick={() => setCurrentPage('view')}>
          <FaEye className="icon" /> View
        </button>

        {/* ADMIN: Add and Manage Access visible, Hamburger for more */}
        {role === 'ADMIN' && (
          <>
            <button className="nav-button" style={navButtonStyle} onClick={() => setCurrentPage('add')}>
              <FaPlus className="icon" /> Add
            </button>
            <button className="nav-button" style={navButtonStyle} onClick={() => setCurrentPage('manageAccess')}>
              <FaUserShield className="icon" /> Manage Access
            </button>
            <DropdownButton
              id="dropdown-basic-button"
              title={<FaBars />}
              align="end"
              menuVariant="dark"
              className="floating-dropdown"
              style={navButtonStyle}
            >
              <Dropdown.Item onClick={() => setCurrentPage('update')}>Update</Dropdown.Item>
              <Dropdown.Item onClick={() => setCurrentPage('delete')}>Delete</Dropdown.Item>
              <Dropdown.Item onClick={() => setCurrentPage('logout')}>Logout</Dropdown.Item>
            </DropdownButton>
          </>
        )}

        {/* USER: Only Logout visible */}
        {role !== 'ADMIN' && (
          <button className="nav-button" style={navButtonStyle} onClick={() => setCurrentPage('logout')}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
