import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../components/assets/logo.png";
import axios from "axios";

const ForgotPasswordCapchaCode = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/forgot-password", {
        email,
        userType: "account", // Hoặc userType khác tùy thuộc vào logic của bạn
      });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error sending reset password email:", error);
      alert("Failed to send reset password email. Please try again.");
    }
  };

  return (
    <div className="password-form">
      <div className="logo-bg">
        <img width={550} src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <h2 className="title">Forgot Password</h2>
        <p>
          Enter the email associated with your account and we`ll send you a link
          to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Email</label>
            <input
              className="input--style-4"
              type="email"
              name="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="submit-group">
            <Link to="/forgot-password-capcha-code" className="btn-link">
              <button className="btn btn--radius-2 btn--blue" type="submit">
                Continue
              </button>
            </Link>
            <Link to="/login" className="btn-link">
              <button className="btn btn--radius-2 btn--blue" type="submit">
                Return to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordCapchaCode;
