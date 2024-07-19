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
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
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
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/manager-page">Welcome,{userProfile?.LastName}</Link>,
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
      label: "Manager Warranty",
      children: [
        {
          key: "Order Warranty",
          label: <Link to="/manager-order-warranty">Order Warranty</Link>,
        },
        {
          key: "Request Warranty",
          label: <Link to="/manager-request-warranty">Request Warranty</Link>,
        },
      ],
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
        { key: "events", label: <Link to="/manager-event">Events</Link> },
        { key: "vouchers", label: <Link to="manage-voucher">Vouchers</Link> },
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
