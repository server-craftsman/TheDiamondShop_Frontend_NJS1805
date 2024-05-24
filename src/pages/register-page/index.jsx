import { Link } from "react-router-dom";
import "./index.scss"
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import "../login-page/index"

const RegisterForm = () => {
  return (
    <div className="register">
      <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="Full Name" required />
          <UserOutlined className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Email..." required />
          <MailOutlined className="icon" />
        </div>
        <div className="input-box">
          <input type="phone" placeholder="Phone" required />
          <PhoneOutlined className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Birthday" required />
          <TableOutlined  className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Address" required />
          <HomeOutlined className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <LockOutlined className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm Password" required />
          <LockOutlined className="icon" />
        </div>
        <div>
          <Link to='/'>
            <button type="submit">Register</button>
          </Link>
        </div>

      </form>
      
    </div>
    
    
  );
};

export default RegisterForm;
