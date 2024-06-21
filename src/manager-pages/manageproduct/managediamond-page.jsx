//import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Layout,
  Menu,
  theme,
  Table,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
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
function ManageDiamondPage() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [diamonds, setDiamonds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/diamonds"
      );
      setDiamonds(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddDiamond = async (values) => {
    try {
      await axios.post("http://localhost:8090/products/add-diamond", values);
      fetchData(); // Refresh the list
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const columns = [
    {
      title: "Diamond ID",
      dataIndex: "DiamondID",
      key: "DiamondID",
    },
    {
      title: "Origin",
      dataIndex: "DiamondOrigin",
      key: "DiamondOrigin",
    },
    {
      title: "Carat Weight",
      dataIndex: "CaratWeight",
      key: "CaratWeight",
    },
    {
      title: "Color",
      dataIndex: "Color",
      key: "Color",
    },
    {
      title: "Clarity",
      dataIndex: "Clarity",
      key: "Clarity",
    },
    {
      title: "Cut",
      dataIndex: "Cut",
      key: "Cut",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Shape",
      dataIndex: "Shape",
      key: "Shape",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (text, record) => (
        <img
          src={record.Image}
          alt="Diamond"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    // Add other necessary columns here
  ];

  return (
    <Layout>
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
              Manage Warranty
            </Menu.Item>
            <Menu.Item key="4" icon={<AuditOutlined />}>
              Manage Certificate
            </Menu.Item>
            <Menu.SubMenu
              key="5"
              icon={<SettingOutlined />}
              title="Manage Promotions"
            >
              <Menu.Item key="events">Events</Menu.Item>
              <Menu.Item key="vouchers">Vouchers</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="6" icon={<LogoutOutlined />}>
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
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Add Diamond
            </Button>
            <Table dataSource={diamonds} columns={columns} rowKey="DiamondID" />
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Add Diamond"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddDiamond}>
          <Form.Item
            name="diamondOrigin"
            label="Diamond Origin"
            rules={[
              { required: true, message: "Please input the diamond origin!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caratWeight"
            label="Carat Weight"
            rules={[
              { required: true, message: "Please input the carat weight!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please input the color!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="clarity"
            label="Clarity"
            rules={[{ required: true, message: "Please input the clarity!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cut"
            label="Cut"
            rules={[{ required: true, message: "Please input the cut!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="shape"
            label="Shape"
            rules={[{ required: true, message: "Please input the shape!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="polish" label="Polish">
            <Input />
          </Form.Item>
          <Form.Item name="symmetry" label="Symmetry">
            <Input />
          </Form.Item>
          <Form.Item name="tablePercentage" label="Table Percentage">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="depth" label="Depth">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="measurements" label="Measurements">
            <Input />
          </Form.Item>
          <Form.Item name="giaReportNumber" label="GIA Report Number">
            <Input />
          </Form.Item>
          <Form.Item name="stockNumber" label="Stock Number">
            <Input />
          </Form.Item>
          <Form.Item name="labReportNumber" label="Lab Report Number">
            <Input />
          </Form.Item>
          <Form.Item name="gemstone" label="Gemstone">
            <Input />
          </Form.Item>
          <Form.Item name="gradingReport" label="Grading Report">
            <Input />
          </Form.Item>
          <Form.Item name="descriptors" label="Descriptors">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="fluorescence" label="Fluorescence">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventory">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Diamond
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default ManageDiamondPage;
