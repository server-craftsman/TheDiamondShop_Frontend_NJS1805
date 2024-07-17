import { useState, useContext } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  UserOutlined,
  OrderedListOutlined,
  DeliveredProcedureOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Sider } = Layout;

function DeliveryHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/delivery-profile-page">User</Link>,
    },
    {
      key: "sub1",
      icon: <SketchOutlined />,
      label: "Ship diamond",
      children: [
        {
          key: "Completed",
          icon: <OrderedListOutlined />,
          label: <Link to="/delivery-completed">Completed</Link>,
        },
        {
          key: "Shipping",
          icon: <DeliveredProcedureOutlined />,
          label: <Link to="/delivery">Shipping</Link>,
        },
        {
          key: "Confirmation",
          icon: <FileDoneOutlined />,
          label: <Link to="/delivery-confirm">Confirmation</Link>,
        },
      ],
    },
    {
      key: "sub2",
      icon: <SketchOutlined />,
      label: "Warranty",
      children: [
    {
      key: "Take item warranty",
      icon: <FileProtectOutlined />,
      label: <Link to="/take-item-warranty">Take item warranty</Link>,
    },
    {
      key: "Return item warranty",
      icon: <FileProtectOutlined />,
      label: <Link to="/return-item-warranty">Return item warranty</Link>,
    },],},
    user
    ? {
        key: "6",
        icon: <LogoutOutlined />,
        label: (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        ),
      }
    : null,
  ];

  return (
    <div className="delivery-header">
      <header className="delivery__header">
        <h1 className="header-title">Diamond Shop</h1>
      </header>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
    </div>
  );
}

export default DeliveryHeader;
