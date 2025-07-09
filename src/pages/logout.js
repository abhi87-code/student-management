import { useEffect } from "react";

const Logout = ({ setCurrentPage, setRole }) => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole('USER');
    setCurrentPage("login");
  }, [setCurrentPage, setRole]);

  return (
    <div className="view-container">
      <h2 className="view-title">Logging out...</h2>
    </div>
  );
};

export default Logout;
