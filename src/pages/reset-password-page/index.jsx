import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../components/assets/logo.png";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8090/auth/reset-password", { password });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="password-form">
      <div className="logo-bg">
        <img width={550} src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <h2 className="title">Reset Password</h2>
        <p>Please enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">New Password</label>
            <input
              className="input--style-4"
              type="password"
              name="password"
              placeholder="Enter new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="label">Confirm New Password</label>
            <input
              className="input--style-4"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit-group">
            <button
              className="btn btn--radius-2 btn--blue"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
