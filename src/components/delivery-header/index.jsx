import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

function DeliveryHeader() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Perform logout action
    navigate("/login"); // Navigate to login page
  };
  return (
    <div>
      <header className="delivery__header">
        <h1>Diamond Shop</h1>
        <li>
          <Link to="/delivery-completed">View complete</Link>
        </li>
        <li>
          <Link to="/delivery">View shipping</Link>
        </li>
        <li>
          <Link to="/delivery-confirm">View confirm</Link>
        </li>
        {user ? (
          <li className="user-menu">
            <UserOutlined />
            <ul className="dropdown">
              <li>
                <Button type="primary">
                  <Link to="/userProfile-page">Profile</Link>
                </Button>
              </li>
              <li>
                <Button type="primary" onClick={handleLogout}>
                  {/* <Link to="/login">Logout</Link> */}
                  Logout
                </Button>
              </li>
            </ul>
          </li>
        ) : null}
      </header>
    </div>
  );
}

export default DeliveryHeader;
