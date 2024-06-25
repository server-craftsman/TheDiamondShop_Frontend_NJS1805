// //import React from 'react'
// import { useEffect, useState } from "react";
// import { Button, Layout, Menu, Table, theme } from "antd";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import {
//   AuditOutlined,
//   BookOutlined,
//   LogoutOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   SettingOutlined,
//   ExceptionOutlined,
//   UserOutlined,
// } from "@ant-design/icons";

// function PromotionVoucher() {
//     const { Header, Sider, Content } = Layout;
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const [promotionVoucher, setpromotionVoucher] = useState([]);
//   const columns = [
//     {
//       title: "VoucherID",
//       dataIndex: "VoucherID",
//       key: "VoucherID",
//     },
//     {
//         title: "VoucherName",
//         dataIndex: "VoucherName",
//         key: "VoucherName",
//       },
//       {
//         title: "UsagedQuantity",
//         dataIndex: "UsagedQuantity",
//         key: "UsagedQuantity",
//       },
//       {
//         title: "TotalQuantity",
//         dataIndex: "TotalQuantity",
//         key: "TotalQuantity",
//       },
//       {
//         title: "Type",
//         dataIndex: "Type",
//         key: "Type",
//       },
//       {
//         title: "ValidFrom",
//         dataIndex: "ValidFrom",
//         key: "ValidFrom",
//       },
//       {
//         title: "ExpirationDate",
//         dataIndex: "ExpirationDate",
//         key: "ExpirationDate",
//       },
//       {
//         title: "Condition",
//         dataIndex: "Condition",
//         key: "Condition",
//       },
//       {
//         title: "Prerequisites",
//         dataIndex: "Prerequisites",
//         key: "Prerequisites",
//       },
//       {
//         title: "Discount",
//         dataIndex: "Discount",
//         key: "Discount",
//       },             
//   ];

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8090/vouchers");
//       setpromotionVoucher(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
  
//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed} >
//       <div className="demo-logo-vertical" />
//         <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
//           <Menu.Item key="1" icon={<UserOutlined />}>
//             <Link to="/user">User</Link>
//           </Menu.Item>
//           <Menu.SubMenu key="sub1" icon={<ExceptionOutlined />} title="Order">
//             <Menu.Item key="2">
//               <Link to="/view-order">View Order</Link>
//             </Menu.Item>
//             <Menu.Item key="3">
//               <Link to="/view-order-confirm">Verify Order</Link>
//             </Menu.Item>
//           </Menu.SubMenu>
//           <Menu.Item key="4" icon={<BookOutlined />}>
//             Manage Warranty
//           </Menu.Item>
//           <Menu.Item key="5" icon={<AuditOutlined />}>
//             View Certificate
//           </Menu.Item>
//           <Menu.SubMenu key="sub2" icon={<SettingOutlined />} title="Manage Promotions">
//             <Menu.Item key="6">
//             <Link to="/view-promotion-event">View promotion Events</Link>
//             </Menu.Item>
//             <Menu.Item key="7">
//             <Link to="/view-promotion-voucher">View promotion vouchers</Link>
//             </Menu.Item>
//           </Menu.SubMenu>
//           <Menu.Item key="8" icon={<LogoutOutlined />}>
//             Logout
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout className="site-layout">
//       <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{ fontSize: "16px", width: 64, height: 64 }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 860,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Table dataSource={promotionVoucher} columns={columns} />
//         </Content>
//       </Layout>
//     </Layout>
//   )
// }

// export default PromotionVoucher

//import React from 'react'
import { useEffect, useState } from "react";
import { Button, Layout, Menu, Table, theme } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

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

function PromotionVoucher() {
    const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [promotionVoucher, setpromotionVoucher] = useState([]);
  const columns = [
    {
      title: "VoucherID",
      dataIndex: "VoucherID",
      key: "VoucherID",
    },
    {
        title: "VoucherName",
        dataIndex: "VoucherName",
        key: "VoucherName",
      },
      {
        title: "UsagedQuantity",
        dataIndex: "UsagedQuantity",
        key: "UsagedQuantity",
      },
      {
        title: "TotalQuantity",
        dataIndex: "TotalQuantity",
        key: "TotalQuantity",
      },
      {
        title: "Type",
        dataIndex: "Type",
        key: "Type",
      },
      {
        title: "ValidFrom",
        dataIndex: "ValidFrom",
        key: "ValidFrom",
      },
      {
        title: "ExpirationDate",
        dataIndex: "ExpirationDate",
        key: "ExpirationDate",
      },
      {
        title: "Condition",
        dataIndex: "Condition",
        key: "Condition",
      },
      {
        title: "Prerequisites",
        dataIndex: "Prerequisites",
        key: "Prerequisites",
      },
      {
        title: "Discount",
        dataIndex: "Discount",
        key: "Discount",
      },             
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/vouchers");
      setpromotionVoucher(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/user">User</Link>,
    },
    {
      key: "sub1",
      icon: <ExceptionOutlined />,
      label: "Order",
      children: [
        { key: "2", label: <Link to="/view-order">View Order</Link> },
        { key: "3", label: <Link to="/view-order-confirm">Verify Order</Link> },
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
        { key: "6", label: <Link to="/view-promotion-event">View Promotion Events</Link> },
        { key: "7", label: <Link to="/view-promotion-voucher">View Promotion Vouchers</Link> },
      ],
    },
    { key: "8", icon: <LogoutOutlined />, label: "Logout" },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        >
          <Table dataSource={promotionVoucher} columns={columns} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default PromotionVoucher
