import { useState, useEffect, useContext } from "react";
import { Avatar, Badge, Button, Dropdown, Input, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
    AuditOutlined,
    BarChartOutlined,
    BellOutlined,
    BookOutlined,
    DashboardOutlined,
    DownOutlined,
    LaptopOutlined,
    LogoutOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    ShoppingOutlined,
    SketchOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../AuthContext";
import Search from "antd/es/input/Search";
import logo from "../../assets/img/admin/logoAdmin.png";
import SubMenu from "antd/es/menu/SubMenu";
import "../admin-header/index.scss";


function HeaderAdmin() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const { admin, logoutAdmin } = useContext(AuthContext);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const profileMenu = (
        <Menu>
            <Menu.Item key="1">My Profile</Menu.Item>
            <Menu.Item key="2">Settings</Menu.Item>
            <Menu.Item key="3" onClick={logoutAdmin}>Log Out</Menu.Item>
        </Menu>
    );

    return (
        <Layout>

            {/* Sidebar */}
            <Sider trigger={null} collapsible collapsed={collapsed} className="sildeBar">
                <div className="demo-logo-vertical" />
                <h3>ADMINITRATOR</h3>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="2" icon={<LaptopOutlined />} title="Manage">
                        <Menu.Item key="customer">
                            <Link to="/customer">Customer</Link>
                        </Menu.Item>
                        <Menu.Item key="manager">
                            <Link to="/manager">Manager</Link>
                        </Menu.Item>
                        <Menu.Item key="sales-staff">
                            <Link to="/staff">Sales Staff</Link>
                        </Menu.Item>
                        <Menu.Item key="delivery-staff">
                            <Link to="/delivery">Delivery Staff</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        <Link to="/profile-page">User Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<TeamOutlined />}>
                        <Link to="/map-page">Map</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<ShoppingOutlined />}>
                        <Link to="/product-page">Product</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<BarChartOutlined />}>
                        <Link to="/charts-page">Charts</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<LogoutOutlined />} onClick={() => { logoutAdmin }}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Header */}
            <Layout className="site-layout">
    <Header style={{ padding: 0, background: colorBgContainer }}>
        <div className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
            <div className="d-flex align-items-center">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ fontSize: "16px", width: 64, height: 64 }}
                />

                {/* Search component (if uncommented) */}
                {/* <Search
                    placeholder="Search..."
                    enterButton
                    className="d-none d-md-flex ms-4"
                /> */}
            </div>

            <div className="ms-auto">
                <Dropdown trigger={['click']}>
                    <a className="nav-link">
                        <Badge count={5} offset={[10, 0]}>
                            <MailOutlined className="me-lg-2" />
                        </Badge>
                        <span className="d-none d-lg-inline-flex me-2">Message</span> <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown trigger={['click']}>
                    <a className="nav-link">
                        <Badge count={10} offset={[10, 0]}>
                            <BellOutlined className="me-lg-2" />
                        </Badge>
                        <span className="d-none d-lg-inline-flex me-2">Notification</span> <DownOutlined />
                    </a>
                </Dropdown>
                <Dropdown overlay={profileMenu} trigger={['click']}>
                    <a className="nav-link" onClick={(e) => e.preventDefault()}>
                        <Avatar src={logo} size="small" className="me-lg-2" />
                        <span className="d-none d-lg-inline-flex me-2">Quan Nguyen</span> <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </div>
    </Header>

    {/* Content and Outlet components */}
    <Outlet />
</Layout>



        </Layout>
    );
}

export default HeaderAdmin;