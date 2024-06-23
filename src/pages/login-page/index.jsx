import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { LockOutlined, MailOutlined, WarningOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../register-page/index";
import { useState, useContext } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import "../forgot-password-page";
import { AuthContext } from "../../AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};


  const googleAuth = () => {
    window.open("http://localhost:8090/auth/google/customer", "_self");
  };

  // Thêm trình nghe sự kiện cho các sự kiện tin nhắn từ cửa sổ xác thực
  window.addEventListener(
    "message",
    (event) => {
      // Kiểm tra nếu tin nhắn đến từ miền xác thực của bạn
      if (event.origin === "http://localhost:8090") {
        // Kiểm tra nếu tin nhắn chứa dữ liệu mong đợi
        if (event.data && event.data.token) {
          localStorage.setItem("user", JSON.stringify(event.data.token));
          login(event.data);
          navigate("/", { state: { message: event.data.message } });
        }
      }
    },
    false
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { email, password },
        { withCredentials: false }
      );

      if (response.data.token) {
        const user = {
          token: response.data.token,
          role: response.data.roleName
        }
        localStorage.setItem("user", JSON.stringify(user));
        login(response.data);
        setMessage(response.data.message);
        switch (response.data.roleName) {
          case 'Admin':
            navigate("/admin-page", { state: { message: response.data.message } });
            break;
          case 'Manager':
            navigate("/manager-page", { state: { message: response.data.message } });
            break;
          case 'Customer':
           navigate("/designer-page", { state: { message: response.data.message } });
           break;
          case 'Sale':
            navigate("/sale-page", { state: { message: response.data.message } });
            break;
          case 'Delivery':
            navigate("/timepiece-page", { state: { message: response.data.message } });
            break;
          default:
            navigate("/", { state: { message: response.data.message } });
        }
      } else {
        setMessage("Invalid email or password");
      }
      //   localStorage.setItem("user", JSON.stringify(response.data.token));
      //   login(response.data);
      //   setMessage(response.data.message);
      //   navigate("/", { state: { message: response.data.message } });
      // } else {
      //   setMessage("Invalid email or password");
      // }
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
                <EyeTwoTone
                    onClick={toggleShowPassword}
                    style={{ position: 'absolute', right: '18px', cursor: 'pointer', top: '15px' }}
                />
            ) : (
                <EyeInvisibleOutlined
                    onClick={toggleShowPassword}
                    style={{ position: 'absolute', right: '18px', cursor: 'pointer', top: '15px' }}
                />
            )}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me{" "}
            </label>

            <Link to="/forgot-password-page" className="forgot">
              Forgot password
            </Link>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            <button onClick={googleAuth}>
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
