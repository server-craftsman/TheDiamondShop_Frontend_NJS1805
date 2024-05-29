import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { LockOutlined, MailOutlined, WarningOutlined } from "@ant-design/icons";
import "../register-page/index";
import { useState } from "react";
import axios from "axios";
import logo from "../../components/assets/logo.png";
import "../password-page";

// import videobg from "../../components/assets/videobg.mp4"
// import logo diamong store
// import { AiFillGoogleCircle, AiFillFacebook, AiOutlineWhatsApp, AiOutlineCaretDown } from "react-icons/ai";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/api/login", {
        email,
        password,
      });
      if (response.data.status) {
        if (response.data.AdminInformation) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.AdminInformation)
          );
          setMessage("Login successful as Admin!");
          navigate("/", { state: { message } });
        } else if (response.data.ManagerInformation) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.ManagerInformation)
          );
          setMessage("Login successful as Manager!");
          navigate("/", { state: { message } });
        } else if (response.data.CustomerInformation) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.CustomerInformation)
          );
          setMessage("Login successful as Customer!");
          navigate("/", { state: { message } });
        } else if (response.data.SaleStaffInformation) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.SaleStaffInformation)
          );
          setMessage("Login successful as Sale Staff!");
          navigate("/", { state: { message } });
        }
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred. Please try again.!");
    }
  };

  //form login
  return (
    <div className="form-login">
      <div className="logo-bg">
        <img width={550} src={logo} alt="" />
      </div>

      <div className="login">
        <form action="" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MailOutlined className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LockOutlined className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me{" "}
            </label>

            <Link to="/password-page" className="forgot">
              Forgot password
            </Link>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div className="register-link">
            {/* <p>-------------Or continue with------------</p>
            <br />
            <div className="social-media">
              <a href="#" className="social-icon"> <AiFillGoogleCircle /> </a>

              <a href="#" className="social-icon"> <AiFillFacebook /> </a>

              <a href="#" className="social-icon"> <AiOutlineWhatsApp /></a>

            </div> */}
            <br />
            <p>
              You don't have account?
              <Link to="/register-page" className="register">
                {" "}
                Register
              </Link>
            </p>
          </div>

          {message && (
            <p className="message">
              <WarningOutlined /> {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
