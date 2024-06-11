import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../components/assets/logo.png";
import axios from "axios";

const ForgotPasswordCapchaCode = () => {
  const [capchaCode, setCapchaCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/verify-capcha", { capchaCode });
      if (response.data.success) {
        navigate("/reset-password");
      } else {
        alert("Invalid or expired capcha code.");
      }
    } catch (error) {
      console.error("Error verifying capcha code:", error);
      alert("Failed to verify capcha code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post("/resend-capcha");
      alert(response.data.message);
    } catch (error) {
      console.error("Error resending capcha code:", error);
      alert("Failed to resend capcha code. Please try again.");
    }
  };

  return (
    <div className="password-form">
      <div className="logo-bg">
        <img width={550} src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <h2 className="title">Enter Capcha Code</h2>
        <p>
          We have sent the capcha code to your email. Please check your email!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Capcha Code</label>
            <input
              className="input--style-4"
              type="text"
              name="capchaCode"
              placeholder="Enter capcha code..."
              value={capchaCode}
              onChange={(e) => setCapchaCode(e.target.value)}
              required
            />
          </div>
          <div className="submit-group">
            <Link to="/reset-password">
              <button className="btn btn--radius-2 btn--blue" type="submit">
                Continue
              </button>
            </Link>
            <button
              className="btn btn--radius-2 btn--blue"
              onClick={handleResendCode}
            >
              Resend Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordCapchaCode;
