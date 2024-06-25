import { Outlet } from "react-router-dom";
import Nav from "../nav-sale";
import { Layout, theme } from "antd";
// import HeaderBottom from "../headerbottom";

function LayoutSale() {
    const {  Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return <Layout style={{ minHeight: '100vh' }}>
    <Nav/>
    <Layout className="site-layout">
    <Content
          style={{
            margin: '16px',
            padding: '24px',
            minHeight: '280px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
    <Outlet />
    </Content>
    </Layout>
    </Layout>
}

export default LayoutSale;