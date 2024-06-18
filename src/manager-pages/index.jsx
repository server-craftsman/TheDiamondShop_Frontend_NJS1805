import { useState } from "react";
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
import { Button, Layout, Menu, theme } from "antd";

function ManagerPage() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: "2",
              icon: <SketchOutlined />,
              label: "Manage Product",
              children: [
                {
                  key: "bridals",
                  label: "Bridals",
                },
                {
                  key: "diamonds",
                  label: "Diamonds",
                },
                {
                  key: "rings",
                  label: "Rings",
                },
                {
                  key: "timepieces",
                  label: "Timepieces",
                },
              ],
            },
            {
              key: "3",
              icon: <BookOutlined />,
              label: "Manage Warranty",
            },
            {
              key: "4",
              icon: <AuditOutlined />,
              label: "Manage Certificate",
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: "Manage Promotions",
              children: [
                {
                  key: "events",
                  label: "Events",
                },
                {
                  key: "vouchers",
                  label: "Vouchers",
                },
              ],
            },
            {
              key: "6",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManagerPage;
