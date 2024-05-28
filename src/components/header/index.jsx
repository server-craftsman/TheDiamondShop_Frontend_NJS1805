import "./index.scss";
import { Link } from "react-router-dom";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "antd";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <div className={`header__search ${showSearch === true ? "active" : ""}`}>
        <input type="text" placeholder=" Search movie " />
        <CloseOutlined onClick={() => setShowSearch(false)} />
      </div>

      <div className="header__logo">
        <Link to={""}>
          <img src={logo} alt="" width={180} />
        </Link>
      </div>

      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/">BRIDAL</Link>
          </li>
          <li>
            <Link to="/">DIAMOND</Link>
          </li>
          <li>
            <Link to="/">JEWELRY</Link>
          </li>
          <li>
            <Link to="/">TIMEPIECES</Link>
          </li>
          <li>
            <Link to="/">DESIGNERS</Link>
          </li>

          <li onClick={() => setShowSearch(true)}>
            <SearchOutlined />
          </li>
          <li>
            <a>SIGN UP</a>
            <ul className="login-dropdown">
              <li>
                <Button type="primary"><Link to="/login">Login</Link></Button>
              </li>
              <li>
                <Button type="primary"><Link to="/register-page">Register</Link></Button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
