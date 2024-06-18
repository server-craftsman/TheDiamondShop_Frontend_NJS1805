//import React from 'react'
import { useEffect, useState } from "react";
import { Button, Layout, Menu, Table, theme } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import './orderpages.scss'
import {
    AuditOutlined,
    BookOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    ExceptionOutlined,
    UserOutlined,
  } from "@ant-design/icons";

function ViewOrderConfirm() {
const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [orderdetail, setOrderDetail] = useState([]);

  const columns = [
    {
      title: "OrderID",
      dataIndex: "OrderID",
      key: "OrderID",
    },
    {
      title: "Orderdate",
      dataIndex: "Orderdate",
      key: "Orderdate",
    },
    {
      title: "Firstname",
      dataIndex: "Firstname",
      key: "Firstname",
    },
    {
      title: "Lastname",
      dataIndex: "Lastname",
      key: "Lastname",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "TotalPrice",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
    {
      title: "OrderStatus",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
    },
    ];
    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8090/features/view-order-confirm");
          setOrderDetail(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <Layout>
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
            minHeight: 1000,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Table dataSource={orderdetail} columns={columns} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ViewOrderConfirm;
