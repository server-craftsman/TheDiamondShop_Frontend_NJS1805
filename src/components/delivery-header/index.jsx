import { useState, useContext, useEffect } from "react";
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
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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


  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/delivery-profile-page">Welcome,{userProfile?.LastName }</Link>,
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
