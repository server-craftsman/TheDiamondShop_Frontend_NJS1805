 import { useEffect, useState } from "react";
//import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, Layout, Menu, Table, theme, } from "antd";
import {
  ExceptionOutlined,
  UserOutlined,
  BookOutlined,
  AuditOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SalePage() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} >
      <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<ExceptionOutlined />} title="Order">
            <Menu.Item key="2">
              <Link to="/view-order">View Order</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/view-order-confirm">Verify Order</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4" icon={<BookOutlined />}>
            Manage Warranty
          </Menu.Item>
          <Menu.Item key="5" icon={<AuditOutlined />}>
            View Certificate
          </Menu.Item>
          <Menu.SubMenu key="sub2" icon={<SettingOutlined />} title="Manage Promotions">
            <Menu.Item key="6">
            <Link to="/view-promotion-event">View promotion Events</Link>
            </Menu.Item>
            <Menu.Item key="7">
            <Link to="/view-promotion-voucher">View promotion vouchers</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="8" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
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
        >
          {/* Sale Profile */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SalePage;


