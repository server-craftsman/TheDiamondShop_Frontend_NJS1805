import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import {
  MailOutlined,
  WarningOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import logo from "../../components/assets/logo.png";
import { AuthContext } from "../../AuthContext";
import { Checkbox } from "antd";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [token, setToken] = useState(""); 
  const [roleName, setRoleName] = useState(""); 

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const googleAuth = () => {
    window.open("http://localhost:8090/auth/google/customer", "_self");
  };

  window.addEventListener(
    "message",
    (event) => {
      if (event.origin === "http://localhost:8090") {
        if (event.data && event.data.token) {
          localStorage.setItem("user", JSON.stringify(event.data));
          // localStorage.setItem("token", event.data.token);
          login(user);
          navigate("/", { state: { message: event.data.message } });
        }
      }
    },
    false
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login({ token: storedToken });
    }
  }, [login]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { email, password },
        { withCredentials: false }
      );

      console.log("Login response:", response);

      if (response.data.token) {

        const { token, roleName, message } = response.data;
        setMessage(message);

        // Store token in localStorage
      localStorage.setItem('accessToken', token);
        login({ token });

        switch (roleName) {
          case "Admin":
            navigate("/admin-page");
            break;
          case "Manager":
            navigate("/manager-page");
            break;
          case "Customer":
            navigate("/");
            break;
          case "Sale":
            navigate("/sale-page");
            break;
          case "Delivery":
            navigate("/timepiece-page");
            break;
          default:
            navigate("/");
        }
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      setMessage("Error logging in");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="form-login">
      <div className="logo-bg">
        <img width={550} src={logo} alt="" />
      </div>

      <div className="login">
        <form onSubmit={handleLogin}>
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <EyeTwoTone
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: "18px",
                  cursor: "pointer",
                  top: "15px",
                }}
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: "18px",
                  cursor: "pointer",
                  top: "15px",
                }}
              />
            )}
          </div>
          <div className="remember-forgot">
            <label>
            <Checkbox >Remember me</Checkbox>
            </label>
            <Link to="/forgot-password-page" className="forgot">
              Forgot password
            </Link>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            <button type="button" onClick={googleAuth}>
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
              You don`t have account?
              <Link to="/register-page" className="register">
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
