import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { LockOutlined, MailOutlined, WarningOutlined } from "@ant-design/icons";
import "../register-page/index";
import { useState, useContext } from "react";
import axios from "axios";
import logo from "../../components/assets/logo.png";
import "../forgot-password-page";
<<<<<<< HEAD
import { AuthContext } from '../../AuthContext';
=======
>>>>>>> 1044ce79cb82d9f37665d52a896416c43ebaad09

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const googleAuth = () => {
    window.open(
        "http://localhost:8090/auth/google/customer",
        "_self"
    );
};


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { email, password },
        { withCredentials: false }
      );

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        login(response.data);
        setMessage(response.data.message);
        navigate("/", { state: { message: response.data.message } });
=======
      const response = await axios.post("http://localhost:8090/auth/login", {
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
        } else if (response.data.SaleInformation) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.SaleInformation)
          );
          setMessage("Login successful as Sale Staff!");
          navigate("/", { state: { message } });
        } else if (response.data.DeliveryInformation) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.DeliveryInformation)
          );
          setMessage("Login successful as Delivery Staff");
          navigate("/", { state: { message } });
        }
>>>>>>> 1044ce79cb82d9f37665d52a896416c43ebaad09
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data || "Invalid email or password");
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      console.error("Error logging in:", error);
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
          <div>
<<<<<<< HEAD
            <button onClick={googleAuth}>
=======
            <button>
>>>>>>> 1044ce79cb82d9f37665d52a896416c43ebaad09
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png?f=webp"
                alt=""
                width={15}
              />
              <span> Login with google </span>
            </button>
          </div>
          <div className="register-link">
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
