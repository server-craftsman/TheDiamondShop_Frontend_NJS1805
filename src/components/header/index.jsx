import "./index.scss";
import { Link } from "react-router-dom";
import { SearchOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Button, Dropdown, Menu, Typography } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../CartContext";
import { AuthContext } from "../../AuthContext";
import { Avatar, Box } from "@mui/material";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { cartItems, clearCart } = useCart();
  const [userProfile, setUserProfile] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const handleSearchSubmit = () => {
    // Xử lý tìm kiếm (ví dụ: lấy kết quả)
    console.log("Tìm kiếm:", searchInput);
    // Bạn có thể cập nhật trạng thái hoặc thực hiện các hành động khác ở đây
  };
  const handleLogout = () => {
    clearCart(); // Clear cart when user logs out
    logout(); // Call logout function from AuthContext
  };
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        setFetchError("Token not found in AuthContext");
        setLoading(false);
        return;
      }

      console.log("Fetching user profile with token:", token);

      const response = await fetch(
        "http://localhost:8090/features/view-profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Assuming you store the token in localStorage
          },
          withCredentials: true, // Ensure credentials are sent
        }
      );
      const data = await response.json();
      setUserProfile(data.user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // Custom styles
const styles = {
  navbarItem: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
    alignItems: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'Playfair Display, serif', // Example of an elegant font
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  
    borderRadius: '8px',
    zIndex: 1000,
  },
  avatar: {
    width: '50px',
    height: '50px',
  },
  button: {
    margin: '10px 0',
    backgroundColor: '#FFFFFF', // Gold color for luxury
    color: '#000000',
    fontWeight: 'bold',
  },
};

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
            <Link to="/ourstore-page">OURSTORE</Link>
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
          <li className="cart">
            <span>{cartItems.length}</span>
            <Link to="/cart-page">
              <AiOutlineShoppingCart />
            </Link>
          </li>
      
          {user ? (
        <li style={{marginLeft: "20px"}}>
          <a style={styles.navbarItem}>
            {userProfile?.Image && (
              <Avatar src={userProfile.Image} alt="Avatar Account" style={styles.avatar} />
            )}
            <Typography variant="h6" component="span">
              Welcome, {userProfile?.LastName || 'Guest'}
            </Typography>
          </a>
          <ul style={styles.dropdownMenu} className="login-dropdown">
            {userProfile && (
              <div style={{display: "flex", justifyContent: "center"}}>
                {userProfile.Image && (
                  <img src={userProfile.Image} style={{width: "60px", height: "60px"}} />
                )}
                <div>
                <li style={{ marginLeft: '20px' }}>
                  <Typography variant="body1" style={{fontWeight: "bold"}}>
                    {userProfile.FirstName} {userProfile.LastName}
                  </Typography>
                </li>
                <li style={{ marginLeft: '20px', fontWeight: "bold" }}>
                  <Typography variant="body2">{userProfile.Email}</Typography>
                </li>
                </div>
              </div>
            )}
            <li>
              <Button style={styles.button}>
                <AccountCircleIcon />
                <Link className="link" to="/userProfile-page" style={{ color: '#000000', textDecoration: 'none' }}>
                  Profile
                </Link>
              </Button>
            </li>
            <li>
              <Button style={styles.button}>
                <DescriptionIcon />
                <Link className="link" to="/historyOrder-page" style={{ color: '#000000', textDecoration: 'none' }}>
                  History Order
                </Link>
              </Button>
            </li>
            <li style={{backgroundColor: "#2A67FF", borderRadius: "5px", textAlign: "center"}}>
              <Button style={{backgroundColor: "#2A67FF" }} onClick={handleLogout}>
                {/* <LogoutIcon /> */}
                <Link className="link" to="/login" style={{ color: '#FFFFFF', textDecoration: 'none', marginLeft: "60px"}}>
                  Logout
                </Link>
              </Button>
            </li>
          </ul>
        </li>
      ) : (
        <li style={{ paddingTop: '20px' }}>
          <a>SIGN UP</a>
          <ul style={styles.dropdownMenu} className="login-dropdown">
            <li>
              <Button style={styles.button}>
                <Link className="link" to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
                  Login
                </Link>
              </Button>
            </li>
            <li>
              <Button style={styles.button}>
                <Link className="link" to="/register-page" style={{ color: '#fff', textDecoration: 'none' }}>
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
