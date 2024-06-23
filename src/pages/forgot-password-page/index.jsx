import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../assets/logo.png";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/auth/forgot-password",
        {
          email,
          userType: "account",
        }
      );
      if (
        response.data.message ===
        "Password reset instructions sent to your email"
      ) {
        sessionStorage.setItem("emailForVerification", email);
        navigate("/verify-code");
      } else {
        alert(
          "The email address you entered is not associated with an account."
        );
      }
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
            <button className="btn btn--radius-2 btn--blue" type="submit">
              Continue
            </button>
            <Link to="/login" className="btn-link">
              <button className="btn btn--radius-2 btn--blue" type="button">
                Return to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
