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

function ManageRingPage() {
  const [rings, setRings] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddRingVisible, setIsAddRingVisible] = useState(false);
  const [isEditRingVisible, setIsEditRingVisible] = useState(false);
  const [form] = Form.useForm();
  // const [editingDiamond, setEditingDiamond] = useState(null); // To store the diamond being edited

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/diamond-rings"
      );
      setRings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddRings = async (values) => {
    try {
      await axios.post(
        "http://localhost:8090/products/add-diamond-rings",
        values
      );
      fetchData(); // Refresh the list
      setIsAddRingVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const handleEditRings = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditRingVisible(true); // Show the modal
    form.setFieldsValue({
      ringStyle: record.RingStyle,
      nameRings: record.NameRings,
      category: record.Category,
      brandName: record.BrandName,
      material: record.Material,
      centerGemstone: record.CenterGemstone,
      centerGemstoneShape: record.CenterGemstoneShape,
      width: record.Width,
      centerDiamondDimension: record.CenterDiamondDimension,
      weight: record.Weight,
      gemstoneWeight: record.GemstoneWeight,
      centerDiamondColor: record.CenterDiamondColor,
      centerDiamondClarity: record.CenterDiamondClarity,
      centerDiamondCaratWeight: record.CenterDiamondCaratWeight,
      ringSize: record.RingSize,
      price: record.Price,
      gender: record.Gender,
      fluorescence: record.Fluorescence,
      description: record.Description,
      imageRings: record.ImageRings,
      imageBrand: record.ImageBrand, // Populate StockNumber, but disable input
      inventory: record.Inventory,
    });
  };

  const handleUpdateRings = async (values) => {
    try {
      await axios.put(
        "http://localhost:8090/products/edit-diamond-rings",
        values
      );
      fetchData(); // Refresh the list
      setIsEditRingVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleDeleteRings = async (diamondRingsId) => {
    try {
      await axios.delete(
        "http://localhost:8090/products/delete-diamond-rings",
        {
          data: { diamondRingsId },
        }
      );
      fetchData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting diamond:", error);
    }
  };
  const columns = [
    {
      title: "Ring Style",
      dataIndex: "RingStyle",
      key: "RingStyle",
    },
    {
      title: "NameRings",
      dataIndex: "NameRings",
      key: "NameRings",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "BrandName",
      dataIndex: "BrandName",
      key: "BrandName",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Image Rings",
      dataIndex: "ImageRings",
      key: "ImageRings",
      render: (text, record) => (
        <img
          src={record.ImageRings}
          alt="Rings"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEditRings(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteRings(record.DiamondRingsID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setIsAddRingVisible(true)}>
        Add Ring
      </Button>
      <Table dataSource={rings} columns={columns} rowKey="DiamondRingsID" />

      <Modal
        title="Add Ring"
        open={isAddRingVisible}
        onCancel={() => setIsAddRingVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddRings}>
          <Form.Item
            name="ringStyle"
            label="Ring Style"
            rules={[
              { required: true, message: "Please input the Ring Style!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameRings"
            label="Name Rings"
            rules={[
              { required: true, message: "Please input the name Rings!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="BrandName"
            rules={[
              { required: true, message: "Please input the brand Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="material"
            label="Material"
            rules={[{ required: true, message: "Please input the material!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerGemstone"
            label="CenterGemstone"
            rules={[
              { required: true, message: "Please input the center gemstone!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerGemstoneShape"
            label="CenterGemstoneShape"
            rules={[
              {
                required: true,
                message: "Please input the center gemstone shape!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="width"
            label="Width"
            rules={[{ required: true, message: "Please input the width!" }]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item
            name="centerDiamondDimension"
            label="Center Diamond Dimension"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="weight" label="Weight">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gemstoneWeight" label="Gem stone Weight">
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="centerDiamondColor" label="Center Diamond Color">
            <Input />
          </Form.Item>
          <Form.Item name="centerDiamondClarity" label="Center Diamond Clarity">
            <Input />
          </Form.Item>
          <Form.Item
            name="centerDiamondCaratWeight"
            label="Center Diamond CaratWeight"
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="ringSize" label="Ring Size">
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="fluorescence" label="Fluorescence">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="imageRings" label="ImageRings">
            <Input />
          </Form.Item>
          <Form.Item name="ImageBrand" label="imageBrand">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventory">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Ring
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Rings"
        open={isEditRingVisible}
        onCancel={() => setIsEditRingVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateRings}>
          <Form.Item
            name="ringStyle"
            label="Ring Style"
            rules={[
              { required: true, message: "Please input the Ring Style!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nameRings"
            label="Name Rings"
            rules={[
              { required: true, message: "Please input the name Rings!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="BrandName"
            rules={[
              { required: true, message: "Please input the brand Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="material"
            label="Material"
            rules={[{ required: true, message: "Please input the material!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerGemstone"
            label="CenterGemstone"
            rules={[
              { required: true, message: "Please input the center gemstone!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerGemstoneShape"
            label="CenterGemstoneShape"
            rules={[
              {
                required: true,
                message: "Please input the center gemstone shape!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="width"
            label="Width"
            rules={[{ required: true, message: "Please input the width!" }]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item
            name="centerDiamondDimension"
            label="Center Diamond Dimension"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="weight" label="Weight">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gemstoneWeight" label="Gem stone Weight">
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="centerDiamondColor" label="Center Diamond Color">
            <Input />
          </Form.Item>
          <Form.Item name="centerDiamondClarity" label="Center Diamond Clarity">
            <Input />
          </Form.Item>
          <Form.Item
            name="centerDiamondCaratWeight"
            label="Center Diamond CaratWeight"
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="ringSize" label="Ring Size">
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="fluorescence" label="Fluorescence">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="imageRings" label="ImageRings">
            <Input />
          </Form.Item>
          <Form.Item name="ImageBrand" label="imageBrand">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventory">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Rings
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageRingPage;
