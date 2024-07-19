import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ExceptionOutlined,
  BookOutlined,
  AuditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { AuthContext } from "../../AuthContext";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Nav = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

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

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <span>Welcome,{userProfile?.LastName}</span>,
      link: "/sale-page",
    },
    {
      key: "2",
      icon: <ExceptionOutlined />,
      label: "Order",
      children: [
        { key: "2-1", label: "View Order", link: "/view-order" },
        { key: "2-2", label: "Verify Order", link: "/view-order-confirm" },
      ],
    },
    {
      key: "3",
      icon: <BookOutlined />,
      label: "View Warranty",
      link: "/view-warranty",
    },
    {
      key: "4",
      icon: <AuditOutlined />,
      label: "View Certificate",
      link: "/view-certificate",
    },
    {
      key: "5",
      icon: <SettingOutlined />,
      label: "View Promotions",
      children: [
        {
          key: "5-1",
          label: "View Promotion Events",
          link: "/view-promotion-event",
        },
        {
          key: "5-2",
          label: "View Promotion Vouchers",
          link: "/view-promotion-voucher",
        },
      ],
    },
    {
      key: "6",
      icon: <SettingOutlined />,
      label: "View Request Warranty",
      link: "/view-requestwarranty",
    },
    user
      ? {
          key: "7",
          icon: <LogoutOutlined />,
          label: (
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          ),
        }
      : null,
  ];

  // Filter out null values from menuItems
  const filteredMenuItems = menuItems.filter((item) => item !== null);

  return (
    <div className="sidebar-sale">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1", "sub2"]}
        >
          {filteredMenuItems.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>
                    <Link to={child.link}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    </div>
  );
};

export default Nav;
