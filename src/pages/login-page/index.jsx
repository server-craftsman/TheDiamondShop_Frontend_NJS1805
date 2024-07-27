// import { Link, useNavigate } from "react-router-dom";
// import "./index.scss";
// import {
//   MailOutlined,
//   WarningOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import { useState, useContext } from "react";
// import axios from "axios";
// import logo from "../../components/assets/logo.png";
// import { AuthContext } from "../../AuthContext";
// import { Checkbox } from "antd";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [showPassword, setShowPassword] = useState(false);
//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const googleAuth = () => {
//     window.open("http://localhost:8090/auth/google/customer", "_self");
//   };
  

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8090/auth/login",
//         { email, password },
//         { withCredentials: false }
//       );

//       console.log("Login response:", response);

//       if (response.data.token) {
//         const { token, roleName, message, FirstName, LastName, PhoneNumber } =
//           response.data;
//         setMessage(message);

//         // Store token in localStorage
//         localStorage.setItem("accessToken", token);

//         // Store user info in localStorage
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             FirstName,
//             LastName,
//             PhoneNumber,
//           })
//         );

//         // Update context with user info
//         login({ token, FirstName, LastName, PhoneNumber });

//         switch (roleName) {
//           case "Admin":
//             navigate("/admin-page");
//             break;
//           case "Manager":
//             navigate("/manager-page");
//             break;
//           case "Customer":
//             navigate("/", { state: { FirstName, LastName, PhoneNumber } });
//             break;
//           case "Sale":
//             navigate("/sale-page");
//             break;
//           case "Delivery":
//             navigate("/delivery-profile-page");
//             break;
//           default:
//             navigate("/");
//         }
//       } else {
//         setMessage("Invalid email or password");
//       }
//     } catch (error) {
//       setMessage("Error logging in");
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <div className="form-login">
//       <div className="logo-bg">
//         <img width={550} src={logo} alt="" />
//       </div>

//       <div className="login">
//         <form onSubmit={handleLogin}>
//           <h1>Login</h1>
//           <div className="input-box">
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <MailOutlined className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {showPassword ? (
//               <EyeTwoTone
//                 onClick={toggleShowPassword}
//                 style={{
//                   position: "absolute",
//                   right: "18px",
//                   cursor: "pointer",
//                   top: "15px",
//                 }}
//               />
//             ) : (
//               <EyeInvisibleOutlined
//                 onClick={toggleShowPassword}
//                 style={{
//                   position: "absolute",
//                   right: "18px",
//                   cursor: "pointer",
//                   top: "15px",
//                 }}
//               />
//             )}
//           </div>
//           <div className="remember-forgot">
//             <label>
//               <Checkbox>Remember me</Checkbox>
//             </label>
//             <Link to="/forgot-password-page" className="forgot">
//               Forgot password
//             </Link>
//           </div>
//           <div>
//             <button type="submit">Login</button>
//           </div>
//           <div>
//             <button type="button" onClick={googleAuth}>
//               <img
//                 src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png?f=webp"
//                 alt=""
//                 width={15}
//               />
//               <span> Login with google </span>
//             </button>
//           </div>
//           <div className="register-link">
//             <br />
//             <p>
//               You don`t have account?
//               <Link to="/register-page" className="register">
//                 Register
//               </Link>
//             </p>
//           </div>

//           {message && (
//             <p className="message">
//               <WarningOutlined /> {message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import "./index.scss";
import logo from "../../components/assets/logo.png";
import { MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox } from "antd";
import { WarningOutlined } from "@mui/icons-material";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Function to initiate Google OAuth
  const googleAuth = () => {
    window.location.href = "http://localhost:8090/auth/google/customer";
  };

  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { email, password },
        { withCredentials: false }
      );

      if (response.data.token) {
        const { token, roleName, message, FirstName, LastName, PhoneNumber } = response.data;
        setMessage(message);

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify({ FirstName, LastName, PhoneNumber }));

        login({ token, FirstName, LastName, PhoneNumber });

        switch (roleName) {
          case "Admin":
            navigate("/admin-page");
            break;
          case "Manager":
            navigate("/manager-page");
            break;
          case "Customer":
            navigate("/", { state: { FirstName, LastName, PhoneNumber } });
            break;
          case "Sale":
            navigate("/sale-page");
            break;
          case "Delivery":
            navigate("/delivery-profile-page");
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

  // Handle Google OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const roleName = params.get('roleName');
    const FirstName = params.get('FirstName');
    const LastName = params.get('LastName');
    const PhoneNumber = params.get('PhoneNumber');
    const Email = params.get('email');
    const password = params.get('password');

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify({ FirstName, LastName, PhoneNumber, Email, password }));

      login({ token, FirstName, LastName, PhoneNumber, Email, password });

      switch (roleName) {
        case "Admin":
          navigate("/admin-page");
          break;
        case "Manager":
          navigate("/manager-page");
          break;
        case "Customer":
          navigate("/", { state: { FirstName, LastName, PhoneNumber, Email, password } });
          break;
        case "Sale":
          navigate("/sale-page");
          break;
        case "Delivery":
          navigate("/delivery-profile-page");
          break;
        default:
          navigate("/");
      }
    }
  }, [location.search, login, navigate]);

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
              <Checkbox>Remember me</Checkbox>
            </label>
            <Link to="/forgot-password-page" className="forgot">
              Forgot password
            </Link>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          {/* <div>
            <button type="button" onClick={googleAuth}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png?f=webp"
                alt=""
                width={15}
              />
              <span> Login with Google </span>
            </button>
          </div> */}
          <div className="register-link">
            <br />
            <p>
              You don’t have an account?
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
