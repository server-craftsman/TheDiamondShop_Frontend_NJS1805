import { useState, useEffect, useContext } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
  AuditOutlined,
  BookOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  SketchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../AuthContext";

function ManagerPage() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, logout } = useContext(AuthContext);
  
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/user">User</Link>,
    },
    {
      key: "sub1",
      icon: <SketchOutlined />,
      label: "Manage Product",
      children: [
        { key: "bridals", label: <Link to="/manager-bridal-page">Bridals</Link> },
        { key: "diamonds", label: <Link to="/manager-diamond-page">Diamond</Link> },
        { key: "rings", label: <Link to="/manager-ring-page">Rings</Link> },
        { key: "timepieces", label: <Link to="/manager-timepieces-page">Timepieces</Link> },
      ],
    },
    { key: "4", icon: <BookOutlined />, label: "Manage Warranty" },
    {
      key: "5",
      icon: <AuditOutlined />,
      label: <Link to="/view-certificate">View Certificate</Link>,
    },
    {
      key: "sub2",
      icon: <SettingOutlined />,
      label: "Manage Promotions",
      children: [
        { key: "events", label: <Link to="/view-promotion-event">View Promotion Events</Link> },
        { key: "vouchers", label: <Link to="/view-promotion-voucher">View Promotion Vouchers</Link> },
      ],
    },
    user ? {
      key: "6",
      icon: <LogoutOutlined />,
      label: <Link to="/login" onClick={logout}>Logout</Link>,
    } : null,
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 860,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></Content>
        <Outlet />
      </Layout>
    </Layout>
  );
}

export default ManagerPage;
