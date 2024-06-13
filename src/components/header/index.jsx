import "./index.scss";
import { Link } from "react-router-dom";
import { SearchOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { Button, Dropdown, Menu} from "antd";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../CartContext";
import { AuthContext } from "../../AuthContext";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useContext(AuthContext);
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/userProfile-page">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
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
            <Link to="/bridal-page">BRIDAL</Link>
          </li>
          <li>
            <Link to="/diamond-page">DIAMOND</Link>
          </li>
          <li>
            <Link to="/ring-page">RINGS</Link>
          </li>
          <li>
            <Link to="/timepiece-page">TIMEPIECES</Link>
          </li>
          <li>
            <Link to="/designer-page">DESIGNERS</Link>
          </li>
          <li>
            <Link to="/ourstore-page">OUR STORE</Link>
          </li>
        </ul>
      </nav>
      <nav className="header-end">
        <ul>
          <li onClick={() => setShowSearch(true)}>
            <SearchOutlined />
          </li>
          <li className="cart">
            <span>{cartItems.length}</span>
            <Link to="/cart-page">
              <AiOutlineShoppingCart />
            </Link>
          </li>
          {user ? (
            <Dropdown overlay={userMenu} trigger={['hover']}>
              <UserOutlined style={{ fontSize: '1.5em', cursor: 'pointer' }} />
            </Dropdown>
          ) : (
            <li>
            <a>SIGN UP</a>
            <ul className="login-dropdown">
              <li>
                <Button type="primary">
                  <Link to="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button type="primary">
                  <Link to="/register-page">Register</Link>
                </Button>
              </li>
            </ul>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;