import React from "react";
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
function ManageTimepiecesPage() {
  const [timepieces, setTimepieces] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddTimepiecesVisible, setIsAddTimepiecesVisible] = useState(false);
  const [isEditTimepiecesVisible, setIsEditTimepiecesVisible] = useState(false);
  const [form] = Form.useForm();
  // const [editingDiamond, setEditingDiamond] = useState(null); // To store the diamond being edited

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/timepieces"
      );
      setTimepieces(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddTimepieces = async (values) => {
    try {
      await axios.post("http://localhost:8090/products/add-timepieces", values);
      fetchData(); // Refresh the list
      setIsAddTimepiecesVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const handleEditTimepieces = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditTimepiecesVisible(true); // Show the modal
    form.setFieldsValue({
      timepiecesStyle: record.TimepiecesStyle,
      nameTimepieces: record.NameTimepieces,
      collection: record.Collection,
      waterResistance: record.WaterResistance,
      crystalType: record.CrystalType,
      braceletMaterial: record.BraceletMaterial,
      caseSize: record.CaseSize,
      dialColor: record.DialColor,
      movement: record.Movement,
      gender: record.Gender,
      category: record.Category,
      brandName: record.BrandName,
      dialType: record.DialType,
      description: record.Description,
      price: record.Price,
      imageTimepieces: record.ImageTimepieces,
      imageBrand: record.ImageBrand,
      inventory: record.Inventory,
    });
  };

  const handleUpdateTimepieces = async (values) => {
    try {
      await axios.put("http://localhost:8090/products/edit-timepieces", values);
      fetchData(); // Refresh the list
      setIsEditTimepiecesVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleDeleteTimepieces = async (diamondTimepiecesId) => {
    try {
      await axios.delete("http://localhost:8090/products/delete-timepieces", {
        data: { diamondTimepiecesId },
      });
      fetchData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting diamond:", error);
    }
  };

  const columns = [
    {
      title: "Timepieces Style",
      dataIndex: "TimepiecesStyle",
      key: "TimepiecesStyle",
    },
    {
      title: "Name Timepieces",
      dataIndex: "NameTimepieces",
      key: "NameTimepieces",
    },
    {
      title: "Collection",
      dataIndex: "Collection",
      key: "Collection",
    },
    {
      title: "Water Resistance",
      dataIndex: "WaterResistance",
      key: "WaterResistance",
    },
    {
      title: "Crystal Type",
      dataIndex: "CrystalType",
      key: "CrystalType",
    },
    {
      title: "Bracelet Material",
      dataIndex: "BraceletMaterial",
      key: "BraceletMaterial",
    },
    {
      title: "Brand Name",
      dataIndex: "BrandName",
      key: "BrandName",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Image Timepieces",
      dataIndex: "ImageTimepieces",
      key: "TimepiecesStyle",
      render: (text, record) => (
        <img
          src={record.ImageTimepieces}
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
          <Button type="link" onClick={() => handleEditTimepieces(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteTimepieces(record.DiamondTimepiecesID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setIsAddTimepiecesVisible(true)}>
        Add Timepieces
      </Button>
      <Table dataSource={timepieces} columns={columns} rowKey="DiamondID" />

      <Modal
        title="Add Timepiecs"
        open={isAddTimepiecesVisible}
        onCancel={() => setIsAddTimepiecesVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTimepieces}>
          <Form.Item
            name="timepiecesStyle"
            label="Timepieces Style"
            rules={[
              { required: true, message: "Please input the Timepieces Style!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameTimepieces"
            label="Name Timepieces"
            rules={[
              { required: true, message: "Please input the name Timepieces!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="collection"
            label="Collection"
            rules={[
              { required: true, message: "Please input the collection!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="waterResistance"
            label="Water Resistance"
            rules={[
              { required: true, message: "Please input water resistance!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="crystalType"
            label="Crystal Type"
            rules={[
              { required: true, message: "Please input the crystal type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="braceletMaterial"
            label="BraceletMaterial"
            rules={[
              {
                required: true,
                message: "Please input the bracelet material!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caseSize"
            label="CaseSize"
            rules={[{ required: true, message: "Please input the case size!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dialColor"
            label="DialColor"
            rules={[
              { required: true, message: "Please input the dial color!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="movement" label="Movement">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="brandName" label="Brand Name">
            <Input />
          </Form.Item>
          <Form.Item name="dialType" label="Dial Type">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="imageTimepieces" label="Image Timepieces">
            <Input />
          </Form.Item>
          <Form.Item name="imageBrand" label="Image Brand">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventory">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Timepieces
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Timepieces"
        open={isEditTimepiecesVisible}
        onCancel={() => setIsEditTimepiecesVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateTimepieces}>
          <Form.Item
            name="timepiecesStyle"
            label="Timepieces Style"
            rules={[
              { required: true, message: "Please input the Timepieces Style!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nameTimepieces"
            label="Name Timepieces"
            rules={[
              { required: true, message: "Please input the name Timepieces!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="collection"
            label="Collection"
            rules={[
              { required: true, message: "Please input the collection!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="waterResistance"
            label="Water Resistance"
            rules={[
              { required: true, message: "Please input water resistance!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="crystalType"
            label="Crystal Type"
            rules={[
              { required: true, message: "Please input the crystal type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="braceletMaterial"
            label="BraceletMaterial"
            rules={[
              {
                required: true,
                message: "Please input the bracelet material!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caseSize"
            label="CaseSize"
            rules={[{ required: true, message: "Please input the case size!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dialColor"
            label="DialColor"
            rules={[
              { required: true, message: "Please input the dial color!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="movement" label="Movement">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="brandName" label="Brand Name">
            <Input />
          </Form.Item>
          <Form.Item name="dialType" label="Dial Type">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="imageTimepieces" label="Image Timepieces">
            <Input />
          </Form.Item>
          <Form.Item name="imageBrand" label="Image Brand">
            <Input />
          </Form.Item>
          <Form.Item name="inventory" label="Inventory">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Timepieces
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageTimepiecesPage;
