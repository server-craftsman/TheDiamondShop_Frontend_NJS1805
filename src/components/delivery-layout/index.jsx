import React from "react";
import DeliveryHeader from "../delivery-header";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function DeliveryLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DeliveryHeader />
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

export default DeliveryLayout;
