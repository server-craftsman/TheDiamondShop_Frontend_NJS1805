import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import './index.scss'
function DeliveryHeader() {
  const { user, logout } = useContext(AuthContext);
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={logout}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {" "}
      <header className="delivery__header">
        <h1>Diamond Shop</h1>
        <Link to="/delivery-completed">View complete</Link>
        <Link to="/delivery">View shiping</Link>
        {user ? (
          <Dropdown overlay={userMenu} trigger={["hover"]}>
            <UserOutlined
              style={{ fontSize: "1.5em", cursor: "pointer" }}
            ></UserOutlined>
          </Dropdown>
        ) : null}
      </header>
    </div>
  );
}

export default DeliveryHeader;
