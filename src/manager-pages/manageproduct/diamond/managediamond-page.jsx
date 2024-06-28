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

function ManageDiamondPage() {
  
  const [diamonds, setDiamonds] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
 // const [editingDiamond, setEditingDiamond] = useState(null); // To store the diamond being edited

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
      setIsAddModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const handleEditDiamond = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditModalVisible(true); // Show the modal
    form.setFieldsValue({
      diamondOrigin: record.DiamondOrigin,
      caratWeight: record.CaratWeight,
      color: record.Color,
      clarity: record.Clarity,
      cut: record.Cut,
      price: record.Price,
      shape: record.Shape,
      image: record.Image,
      polish: record.Polish,
      symmetry: record.Symmetry,
      tablePercentage: record.TablePercentage,
      depth: record.Depth,
      measurements: record.Measurements,
      giaReportNumber: record.GIAReportNumber,
      labReportNumber: record.LabReportNumber,
      gemstone: record.Gemstone,
      gradingReport: record.GradingReport,
      descriptors: record.Descriptors,
      fluorescence: record.Fluorescence,
      inventory: record.Inventory,
      stockNumber: record.StockNumber, // Populate StockNumber, but disable input
    });
  };

  const handleUpdateDiamond = async (values) => {
    try {
      await axios.put("http://localhost:8090/products/edit-diamond", values);
      fetchData(); // Refresh the list
      setIsEditModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleDeleteDiamond = async (diamondId) => {
    try {
      await axios.delete("http://localhost:8090/products/delete-diamond", {
        data: { diamondId },
      });
      fetchData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting diamond:", error);
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
        <Button type="link" onClick={() => handleEditDiamond(record)}>
          Edit
        </Button>
        <Button
            type="link"
            danger
            onClick={() => handleDeleteDiamond(record.DiamondID)}
          >
            Delete
          </Button>
          <Link to={`/diamonds-detail/${record.DiamondID}`}>View Details</Link>
        </div>
      ),
    },
    
    // Add other necessary columns here
  ];

  return (
    <>
            <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
              Add Diamond
            </Button>
            <Table dataSource={diamonds} columns={columns} rowKey="DiamondID" />
      <Modal
        title="Add Diamond"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
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
            <InputNumber disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Diamond
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Diamond"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateDiamond}>
          <Form.Item
            name="diamondOrigin"
            label="Diamond Origin"
            rules={[{ required: true, message: "Please input the diamond origin!" }]}
          >
            <Input />
          </Form.Item>
          {/* Other Form.Item fields */}
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

          <Form.Item
            name="stockNumber"
            label="Stock Number"
            rules={[{ required: true, message: "Please input the stock number!" }]}
          >
            <Input disabled />
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
            <InputNumber disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Diamond
            </Button>
          </Form.Item>
        </Form>
      </Modal> 
  
    </>
  );
}

export default ManageDiamondPage;
