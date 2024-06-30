import { useState, useEffect, useContext } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  AuditOutlined,
  BookOutlined,
  LogoutOutlined,
  SettingOutlined,
  SketchOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
import "./index.scss";

function ManagerHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/manager-page">User</Link>,
    },
    {
      key: "sub1",
      icon: <SketchOutlined />,
      label: "Manage Product",
      children: [
        {
          key: "bridals",
          label: <Link to="/manager-bridal-page">Bridals</Link>,
        },
        {
          key: "diamonds",
          label: <Link to="/manager-diamond-page">Diamond</Link>,
        },
        { key: "rings", label: <Link to="/manager-ring-page">Rings</Link> },
        {
          key: "timepieces",
          label: <Link to="/manager-timepieces-page">Timepieces</Link>,
        },
      ],
    },
    {
      key: "4",
      icon: <BookOutlined />,
      label: <Link to="/manager-warranty">Manage Warranty</Link>,
    },
    {
      key: "5",
      icon: <AuditOutlined />,
      label: <Link to="/manager-certificate">Manager Certificate</Link>,
    },
    {
      key: "sub2",
      icon: <SettingOutlined />,
      label: "Manage Promotions",
      children: [
        { key: "events", label: <Link to="">Events</Link> },
        { key: "vouchers", label: <Link to="">Vouchers</Link> },
      ],
    },
    user
      ? {
          key: "6",
          icon: <LogoutOutlined />,
          label: (
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          ),
        }
      : null,
  ];

  return (
    <div className="manager-header">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
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

export default ManagerHeader;
