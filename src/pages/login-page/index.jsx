import { Link } from "react-router-dom";
import "./index.scss";
import { UserOutlined,LockOutlined } from "@ant-design/icons";
import "../register-page/index";

const LoginForm = () => {
  return (
    <div className="login">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="User name" required />
          <UserOutlined className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
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
            Create new account?  <Link to="/register-page" className="register"> Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
