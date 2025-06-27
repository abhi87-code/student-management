import {React} from 'react';

const Home = ({ setCurrentPage }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">
            Welcome to Student Management System
          </h1>
          <p className="hero-subtitle">
            Manage your students efficiently with our comprehensive solution.
          </p>
          <button className="hero-button" onClick={() => setCurrentPage('view')}>
            View All Students
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our System?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg className="icon-large" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                Our intuitive interface ensures a smooth experience for managing student records.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg className="icon-large" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-3-6h-3V8h-2v5H7v2h3v3h2v-3h3v-2z"/>
                </svg>
              </div>
              <h3 className="feature-title">Comprehensive Features</h3>
              <p className="feature-description">
                Add, view, update, and delete student records with complete CRUD operations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg className="icon-large" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-description">
                Your student data is secure with our reliable backend system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Start managing your students more efficiently today.
          </p>
          <button className="cta-button" onClick={() => setCurrentPage('add')}>
            Add New Student
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;