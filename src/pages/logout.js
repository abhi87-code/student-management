import { useEffect } from "react";

const Logout = ({ setCurrentPage }) => {
  useEffect(() => {
    // Remove JWT token from localStorage
    localStorage.removeItem("token");
    // Optionally clear other user data here

    // Redirect to login page
    setCurrentPage("login");
  }, [setCurrentPage]);

  return (
    <div className="view-container">
      <h2 className="view-title">Logging out...</h2>
    </div>
  );
};

export default Logout;
