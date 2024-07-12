import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
function ManageTimepiecesPage() {
  const [timepieces, setTimepieces] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddTimepiecesVisible, setIsAddTimepiecesVisible] = useState(false);
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
          <Link to={`/timepieces-details/${record.DiamondTimepiecesID}`}>View Details</Link>
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
          <Form.Item name="movement" label="Movement"
          rules={[
            { required: true, message: "Please input the movement!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender"
          rules={[
            { required: true, message: "Please input the gender!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category"
          rules={[
            { required: true, message: "Please input the category!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="brandName" label="Brand Name"
          rules={[
            { required: true, message: "Please input the brand Name!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="dialType" label="Dial Type"
          rules={[
            { required: true, message: "Please input the dial Type!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description"
          rules={[
            { required: true, message: "Please input the description!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
          rules={[
            { required: true, message: "Please input the price!" },
          ]}
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="imageTimepieces" label="Image Timepieces"
          rules={[
            { required: true, message: "Please input the image Timepieces!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="imageBrand" label="Image Brand"
          rules={[
            { required: true, message: "Please input the image Brand!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Timepieces
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageTimepiecesPage;
