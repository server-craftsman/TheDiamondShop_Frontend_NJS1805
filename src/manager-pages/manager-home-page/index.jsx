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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="2"
            icon={<SketchOutlined />}
            title="Manage Product"
          >
            <Menu.Item key="bridals">Bridals</Menu.Item>
            <Menu.Item key="diamonds">
              <Link to="/manager-diamond-page">Diamond</Link>
            </Menu.Item>
            <Menu.Item key="rings">Rings</Menu.Item>
            <Menu.Item key="timepieces">Timepieces</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AuditOutlined />}>
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="5"
            icon={<SettingOutlined />}
            title="Manage Promotions"
          >
            <Menu.Item key="events">Events</Menu.Item>
            <Menu.Item key="vouchers">Vouchers</Menu.Item>
          </Menu.SubMenu>
          {user ? (
            <Menu.Item key="6" icon={<LogoutOutlined />} onClick={logout}>
              <Link to="/login">Logout</Link>
            </Menu.Item>
          ) : null}
        </Menu>
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
