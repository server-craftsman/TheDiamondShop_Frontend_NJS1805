// import React, {useState, useEffect} from 'react'
// import {Table, Input, Button, message, Layout, Menu, theme} from 'antd';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {
//     AuditOutlined,
//     BookOutlined,
//     LogoutOutlined,
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     SettingOutlined,
//     ExceptionOutlined,
//     UserOutlined,
//   } from "@ant-design/icons";

// function Certificate() {
//   const { Header, Sider, Content } = Layout;
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//     const [reportNumber, setreportNumber] = useState('');
//     const [reportData, setreportData] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const columns = [
//         { title: 'GIA Report Number', dataIndex: 'GIAReportNumber', key: 'GIAReportNumber' },
//         { title: 'Inspection Date', dataIndex: 'InspectionDate', key: 'InspectionDate' },
//         { title: 'Clarity Grade', dataIndex: 'ClarityGrade', key: 'ClarityGrade' },
//         { title: 'Shape and Cutting Style', dataIndex: 'ShapeAndCuttingStyle', key: 'ShapeAndCuttingStyle' },
//         { title: 'Measurements', dataIndex: 'Measurements', key: 'Measurements' },
//         { title: 'Carat Weight', dataIndex: 'CaratWeight', key: 'CaratWeight' },
//         { title: 'Color Grade', dataIndex: 'ColorGrade', key: 'ColorGrade' },
//         { title: 'Symmetry Grade', dataIndex: 'SymmetryGrade', key: 'SymmetryGrade' },
//         { title: 'Cut Grade', dataIndex: 'CutGrade', key: 'CutGrade' },
//         { title: 'Polish Grade', dataIndex: 'PolishGrade', key: 'PolishGrade' },
//         { title: 'Fluorescence', dataIndex: 'Fluorescence', key: 'Fluorescence' },
//       ];

//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get('http://localhost:8090/certificate/lookup', {
//             params: {
//                 GIAReportNumber: reportNumber,
//               },
//           });
//           setreportData(response.data);
//         } catch (error) {
//           message.error('Certificate not available');
//         } finally {
//           setLoading(false);
//         }
//       };

//     //   useEffect(() => {
//     //     fetchData();
//     //   }, []);

//   return (
//     <div>
//       <Layout>
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
//           <Link to="/view-certificate">View Certificate</Link>
//           </Menu.Item>
//           <Menu.SubMenu key="sub2" icon={<SettingOutlined />} title="Manage Promotions">
//           <Menu.Item key="6">
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
//             minHeight: 1000,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//         <Input
//         placeholder="Enter GIA Report Number"
//         value={reportNumber}
//         onChange={(e) => setreportNumber(e.target.value)}
//         style={{ width: 200, marginRight: 10 }}
//       />
//       <Button type="primary" onClick={fetchData} loading={loading}>
//         Lookup
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={reportData}
//         rowKey="GIAReportNumber"
//         style={{ marginTop: 20 }}
//       />
//         </Content>
//       </Layout>
//     </Layout>
//     </div>
//   )
// }

// export default Certificate;

import React, { useState } from 'react';
import { Table, Input, Button, message, Layout, Menu, theme, Space } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

function Certificate() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [reportNumber, setReportNumber] = useState('');
  const [reportNumbers, setReportNumbers] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'GIA Report Number', dataIndex: 'GIAReportNumber', key: 'GIAReportNumber' },
    { title: 'Inspection Date', dataIndex: 'InspectionDate', key: 'InspectionDate' },
    { title: 'Clarity Grade', dataIndex: 'ClarityGrade', key: 'ClarityGrade' },
    { title: 'Shape and Cutting Style', dataIndex: 'ShapeAndCuttingStyle', key: 'ShapeAndCuttingStyle' },
    { title: 'Measurements', dataIndex: 'Measurements', key: 'Measurements' },
    { title: 'Carat Weight', dataIndex: 'CaratWeight', key: 'CaratWeight' },
    { title: 'Color Grade', dataIndex: 'ColorGrade', key: 'ColorGrade' },
    { title: 'Symmetry Grade', dataIndex: 'SymmetryGrade', key: 'SymmetryGrade' },
    { title: 'Cut Grade', dataIndex: 'CutGrade', key: 'CutGrade' },
    { title: 'Polish Grade', dataIndex: 'PolishGrade', key: 'PolishGrade' },
    { title: 'Fluorescence', dataIndex: 'Fluorescence', key: 'Fluorescence' },
  ];

  const fetchData = async (reportNumber) => {
    try {
      const response = await axios.get(`http://localhost:8090/products/${reportNumber}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for report number ${reportNumber}:`, error);
      message.error(`Certificate for ${reportNumber} not available`);
      return [];
    }
  };
  
  const handleAddReportNumber = async () => {
    if (reportNumber && !reportNumbers.includes(reportNumber)) {
      setReportNumbers([...reportNumbers, reportNumber]);
      setLoading(true);
      try {
        const newData = await fetchData(reportNumber);
  
        // Ensure each item has a unique key
        const uniqueNewData = newData.map((item, index) => ({
          ...item,
          uniqueKey: `${item.GIAReportNumber}-${index}`,
        }));
  
        setReportData([...reportData, ...uniqueNewData]);
      } finally {
        setLoading(false);
      }
    }
    setReportNumber('');
  };

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
            margin: '16px',
            padding: '24px',
            minHeight: '280px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Space>
            <Input
              placeholder="Enter GIA Report Number"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
              style={{ width: 200 }}
            />
            <Button type="primary" onClick={handleAddReportNumber} loading={loading}>
              Add
            </Button>
          </Space>
          <Table
            columns={columns}
            dataSource={reportData}
            rowKey="uniqueKey"
            style={{ marginTop: 20 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Certificate;


