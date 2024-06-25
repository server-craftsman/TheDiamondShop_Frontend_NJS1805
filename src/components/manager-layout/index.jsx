import React from "react";
import ManagerHeader from "../manager-header";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

function ManagerLayout() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ManagerHeader />
      <Layout className="site-layout">
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            minHeight: "280px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManagerLayout;
