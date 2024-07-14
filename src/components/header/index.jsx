import "./index.scss";
import { Link } from "react-router-dom";
import { SearchOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Button, Dropdown, Menu } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../CartContext";
import { AuthContext } from "../../AuthContext";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { cartItems, clearCart } = useCart();
  const [userProfile, setUserProfile] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const handleSearchSubmit = () => {
    // Xử lý tìm kiếm (ví dụ: lấy kết quả)
    console.log("Tìm kiếm:", searchInput);
    // Bạn có thể cập nhật trạng thái hoặc thực hiện các hành động khác ở đây
  };
  const handleLogout = () => {
    clearCart(); // Clear cart when user logs out
    logout(); // Call logout function from AuthContext
  };
  // const userMenu = (
  //   <Menu>
  //     <Menu.Item key="0">
  //       <Link to="/userProfile-page">Profile</Link>
  //     </Menu.Item>
  //     <Menu.Item key="1">
  //       <Link to="/historyOrder-page">History Order</Link>
  //     </Menu.Item>
  //     <Menu.Item key="2" onClick={logout}>
  //     <Link to="/login">Logout</Link>
  //     </Menu.Item>
  //   </Menu>
  // );
  const fetchUserProfile = async () => {
    try {
      const token = user?.token; // Retrieve token from AuthContext

      if (!token) {
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await fetch(
        "http://localhost:8090/auth/account",
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Assuming you store the token in localStorage
          },
        }
      );
      const data = await response.json();
      setUserProfile(data.user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <header className="header">
      <div className={`header__search ${showSearch === true ? "active" : ""}`}>
        <input
          type="text"
          placeholder=" Search Products "
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <CloseOutlined onClick={() => setShowSearch(false)} />
        <SearchOutlined onClick={handleSearchSubmit}>Search</SearchOutlined>
      </div>

      <div className="header__logo">
        <Link to={"/"}>
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
          <li>
            <Link to="/instruct-page">INSTRUCT</Link>
          </li>
          <li>
            <Link to="/priceDiamond-page">PRICE</Link>
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
            // <Dropdown overlay={userMenu} trigger={["hover"]}>
            //   <UserOutlined style={{ fontSize: "1.5em", cursor: "pointer" }} />
            // </Dropdown>

            <li>
              <a>
                <UserOutlined style={{ fontSize: "25px" }} />
              </a>
              <ul className="login-dropdown">
              {userProfile && (
                  <>
                    <li>
                      <img src={userProfile.Image} alt="User" />
                    </li>
                    <li>
                      <div>
                        {userProfile.FirstName} {userProfile.LastName}
                      </div>
                    </li>
                    <li>
                      <div>{userProfile.Email}</div>
                    </li>
                  </>
                )}
                <li>
                  <Button>
                    <AccountCircleIcon />
                    <Link className="link" to="/userProfile-page">
                      Profile
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button>
                    <DescriptionIcon />
                    <Link className="link" to="/historyOrder-page">
                      History Order
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button onClick={handleLogout}>
                    <LogoutIcon />
                    <Link className="link" to="/login">
                      Logout
                    </Link>
                  </Button>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <a>SIGN UP</a>
              <ul className="login-dropdown">
                <li>
                  <Button>
                    <Link className="link" to="/login">
                      Login
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button>
                    <Link className="link" to="/register-page">
                      Register
                    </Link>
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
