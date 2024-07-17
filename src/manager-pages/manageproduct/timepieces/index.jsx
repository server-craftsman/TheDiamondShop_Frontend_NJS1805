import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form, Input, InputNumber, Modal, notification } from "antd";
import { Link } from "react-router-dom";

function ManageTimepiecesPage() {
  const [timepieces, setTimepieces] = useState([]);
  const [isAddTimepiecesVisible, setIsAddTimepiecesVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/products/timepieces");
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
      notification.success({
        message: 'Success',
        description: 'Timepieces added successfully!',
      });
    } catch (error) {
      console.error("Error adding timepieces:", error);
      notification.error({
        message: 'Error',
        description: 'Failed to add timepieces.',
      });
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
      render: (text, record) => (
        <img
          src={record.ImageTimepieces}
          alt="Timepieces"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/timepieces-details/${record.DiamondTimepiecesID}`}>
          View Details
        </Link>
      ),
    },
  ];

  return (
    <>
      <h1>Timepieces</h1>
      <Button type="primary" onClick={() => setIsAddTimepiecesVisible(true)}>
        Add Timepieces
      </Button>
      <Table dataSource={timepieces} columns={columns} rowKey="DiamondID" />

      <Modal
        title="Add Timepieces"
        open={isAddTimepiecesVisible}
        onCancel={() => setIsAddTimepiecesVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTimepieces}>
          <Form.Item
            name="timepiecesStyle"
            label="Timepieces Style"
            rules={[{ required: true, message: "Please input the Timepieces Style!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameTimepieces"
            label="Name Timepieces"
            rules={[{ required: true, message: "Please input the Name Timepieces!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="collection"
            label="Collection"
            rules={[{ required: true, message: "Please input the Collection!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="waterResistance"
            label="Water Resistance"
            rules={[{ required: true, message: "Please input the Water Resistance!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="crystalType"
            label="Crystal Type"
            rules={[{ required: true, message: "Please input the Crystal Type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="braceletMaterial"
            label="Bracelet Material"
            rules={[{ required: true, message: "Please input the Bracelet Material!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caseSize"
            label="Case Size"
            rules={[{ required: true, message: "Please input the Case Size!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dialColor"
            label="Dial Color"
            rules={[{ required: true, message: "Please input the Dial Color!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="movement"
            label="Movement"
            rules={[{ required: true, message: "Please input the Movement!" }]}
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
            name="dialType"
            label="Dial Type"
            rules={[{ required: true, message: "Please input the Dial Type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the Description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the Price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="imageTimepieces"
            label="Image Timepieces"
            rules={[{ required: true, message: "Please input the Image Timepieces!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageBrand"
            label="Image Brand"
            rules={[{ required: true, message: "Please input the Image Brand!" }]}
          >
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
