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
function ManageBridalPage() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [bridals, setBridals] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddBridalVisible, setIsAddBridalVisible] = useState(false);
  const [isEditBridalVisible, setIsEditBridalVisible] = useState(false);
  const [form] = Form.useForm();
  //const [editingBridals, setEditingBridals] = useState(null); // To store the diamond being edited
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/bridals"
      );
      setBridals(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddBridals = async (values) => {
    try {
      await axios.post("http://localhost:8090/products/add-bridals", values);
      fetchData(); // Refresh the list
      setIsAddBridalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error adding bridals:", error);
    }
  };
  const handleEditBridals = (record) => {
    //setEditingBridals(record); // Set the diamond to be edited
    setIsEditBridalVisible(true); // Show the modal
    form.setFieldsValue({
        bridalStyle: record.BridalStyle, // Populate imageBrand, but disable input
        nameBridal: record.NameBridal,
        category: record.Category,
        brandName: record.BrandName,
        material: record.Material,
        settingType: record.SettingType,
        gender: record.Gender,
        weight: record.Weight,
        centerDiamond: record.CenterDiamond,
        diamondCaratRange: record.DiamondCaratRange,
        ringSizeRange: record.RingSizeRang,
        totalCaratweight: record.TotalCaratWeight,
        totalDiamond: record.TotalDiamond,
        description: record.Description,
        price: record.Price,
        imageBridal: record.ImageBridal,
        imageBrand: record.ImageBrand, // Populate imageBrand, but disable input
        inventory: record.Inventory, 
    });
  };

  const handleUpdateBridals = async (values) => {
    try {
      await axios.put("http://localhost:8090/products/edit-bridals", values);
      fetchData(); // Refresh the list
      setIsEditBridalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error updating bridals:", error);
    }
  };

  const handleDeleteBridals = async (bridalId) => {
    try {
      await axios.delete("http://localhost:8090/products/delete-bridals", {
        data: { bridalId },
      });
      fetchData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting bridals:", error);
    }
  };

  const columns = [
    {
        title: "Bridal Style",
        dataIndex: "BridalStyle",
        key: "BridalStyle",
    },
    {
        title: "Name Bridal",
        dataIndex: "NameBridal",
        key: "NameBridal",
    },
    {
        title: "Category",
        dataIndex: "Category",
        key: "Category",
    },
    {
        title: "Brand Name",
        dataIndex: "BrandName",
        key: "BrandName",
    },
    {
        title: "Material",
        dataIndex: "Material",
        key: "Material",
    },
    {
        title: "Ring Size Rang",
        dataIndex: "RingSizeRang",
        key: "RingSizeRang",
    },
    {
        title: "Price",
        dataIndex: "Price",
        key: "Price",
    },
    {
        title: "Inventory",
        dataIndex: "Inventory",
        key: "Inventory",
    },
    {
        title: "Image Bridal",
        dataIndex: "ImageBridal",
        key: "ImageBridal",
        render: (text, record) => (
          <img
            src={record.ImageBridal}
            alt="Bridal"
            style={{ width: "100px", height: "auto" }}
          />
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <div>
          <Button type="link" onClick={() => handleEditBridals(record)}>
            Edit
          </Button>
          <Button
              type="link"
              danger
              onClick={() => handleDeleteBridals(record.BridalID)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    
  ]

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/user">User</Link>,
    },
    {
      key: "sub1",
      icon: <SketchOutlined  />,
      label: "Manage Product",
      children: [
        { key: "bridals", label: <Link to="/manager-bridal-page">Bridals</Link> },
        { key: "diamonds", label: <Link to="/manager-diamond-page">Diamond</Link> },
        { key: "rings", label: <Link to="/manager-ring-page">Rings</Link> },
        { key: "timepieces", label: <Link to="/manager-timepieces-page">Timepieces</Link> },
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
    <Layout>
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
            <Button type="primary" onClick={() => setIsAddBridalVisible(true)}>
              Add Bridal
            </Button>
            <Table dataSource={bridals} columns={columns} rowKey="BridalID" />
          </Content>
        </Layout>
      </Layout> 
      <Modal
        title="Add Bridals"
        open={isAddBridalVisible}
        onCancel={() => setIsAddBridalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddBridals}>
          <Form.Item
            name="bridalStyle"
            label="Bridal Style"
            rules={[
              { required: true, message: "Please input the Bridal Style!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameBridal"
            label="Name Bridal"
            rules={[
              { required: true, message: "Please input the Name Bridal!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the Category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please input the Brand Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="material"
            label="Material"
            rules={[{ required: true, message: "Please input the Material!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="settingType"
            label="Setting Type"
            rules={[{ required: true, message: "Please input the Setting Type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the Gender!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageBridal"
            label="Image Bridal URL"
            rules={[{ required: true, message: "Please input the Image Bridal URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="weight" label="Weight">
          <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="centerDiamond" label="Center Diamond">
            <Input />
          </Form.Item>
          <Form.Item name="diamondCaratRange" label="Diamond Carat Range">
            <Input />
          </Form.Item>
          <Form.Item name="ringSizeRange" label="Ring Size Rang">
            <Input />
          </Form.Item>
          <Form.Item name="totalCaratweight" label="Total Carat Weight">
          <Input />
          </Form.Item>
          <Form.Item name="totalDiamond" label="Total Diamond">
          <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventor">
          <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Bridals
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Diamond"
        open={isEditBridalVisible}
        onCancel={() => isEditBridalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateBridals}>
        <Form.Item
            name="bridalStyle"
            label="Bridal Style"
            rules={[
              { required: true, message: "Please input the Bridal Style!" },
            ]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            name="nameBridal"
            label="Name Bridal"
            rules={[
              { required: true, message: "Please input the Name Bridal!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the Category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please input the Brand Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="material"
            label="Material"
            rules={[{ required: true, message: "Please input the Material!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="settingType"
            label="Setting Type"
            rules={[{ required: true, message: "Please input the Setting Type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the Gender!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageBridal"
            label="Image Bridal URL"
            rules={[{ required: true, message: "Please input the Image Bridal URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="weight" label="Weight">
          <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="centerDiamond" label="Center Diamond">
            <Input />
          </Form.Item>
          <Form.Item name="diamondCaratRange" label="Diamond Carat Range">
            <Input />
          </Form.Item>
          <Form.Item name="ringSizeRange" label="Ring Size Rang">
            <Input />
          </Form.Item>
          <Form.Item name="totalCaratweight" label="Total Carat Weight">
          <Input />
          </Form.Item>
          <Form.Item name="totalDiamond" label="Total Diamond">
          <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventor">
          <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Bridals
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default ManageBridalPage;
