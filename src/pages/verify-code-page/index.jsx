import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../assets/logo.png";
import axios from "axios";

const VerificationCode = () => {
  const [verifyCode, setVerifyCode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("emailForVerification");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8090/auth/verify-capcha",
        {
          email,
          verifyCode,
        }
      );

      if (response.data.message === " Code verified") {
        navigate("/reset-password");
      } else {
        alert("Invalid or expired verify code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Failed to verify code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/auth/forgot-password",
        { email }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error resending verify code:", error);
      alert("Failed to resend verify code. Please try again.");
    }
  };

  return (
    <div className="password-form">
      <div className="logo-bg">
        <img width={550} src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <h2 className="title">Enter Verification Code</h2>
        <p>
          We have sent the verification code to your email. Please check your
          email!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Verification Code</label>
            <input
              className="input--style-4"
              type="text"
              name="verifyCode"
              placeholder="Enter verification code..."
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              required
            />
          </div>
          <div className="submit-group">
            <button className="btn btn--radius-2 btn--blue" type="submit">
              Continue
            </button>

            <button
              className="btn btn--radius-2 btn--blue"
              type="button"
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

export default VerificationCode;
