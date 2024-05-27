import "./index.scss";
import { Link } from "react-router-dom";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import logo from "../assets/logo.png";

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
          <li>
            <Link to="/login">SIGN UP</Link>
          </li>
          <li onClick={() => setShowSearch(true)}>
            <SearchOutlined />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
