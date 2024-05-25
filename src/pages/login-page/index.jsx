import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../register-page/index";
import { useState } from "react";
import axios from "axios";

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
        }
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <form action="" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <UserOutlined className="icon" />
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
            <input type="checkbox" />
            Remember me
          </label>
          <Link className="forgot">Forgot password</Link>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div className="register-link">
          <p>
            Create new account?{" "}
            <Link to="/register-page" className="register">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LoginForm;
