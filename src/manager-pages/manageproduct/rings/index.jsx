//import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Menu,
  theme,
  Table,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, colors } from "@mui/material";

function ManageRingPage() {
  const [rings, setRings] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddRingVisible, setIsAddRingVisible] = useState(false);
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
      const imageData = await fileToBase64(values.imageRings[0]); // Pass the correct file object
      const imagebrand = await fileToBase64(values.imageBrand[0]);
      const updatedValues = { ...values, imageRings: imageData, imageBrand: imagebrand };
      await axios.post(
        "http://localhost:8090/products/add-diamond-rings",
        updatedValues
      );
      fetchData(); // Refresh the list
      setIsAddRingVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: 'Success',
        description: 'Diamond Ring added successfully!',
      });
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file.originFileObj); // Ensure you're accessing originFileObj
    });
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
          <Link to={`/rings-detail/${record.DiamondRingsID}`}>View Details</Link>
      ),
    },
  ];

  return (
    <>
    <h1>Diamond Ring</h1>
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
            rules={[{ required: true, message: "Please input the center Diamond Dimension!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="weight" label="Weight"
            rules={[{ required: true, message: "Please input the weight!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gemstoneWeight" label="Gem stone Weight"
           rules={[{ required: true, message: "Please input the gemstone Weight!" }]}>
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="centerDiamondColor" label="Center Diamond Color"
           rules={[{ required: true, message: "Please input the center Diamond Color!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="centerDiamondClarity" label="Center Diamond Clarity"
           rules={[{ required: true, message: "Please input the center Diamond Clarity!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="centerDiamondCaratWeight"
            label="Center Diamond CaratWeight"
            rules={[{ required: true, message: "Please input the center Diamond Carat Weight!" }]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="price" label="Price"
           rules={[{ required: true, message: "Please input the price!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gender" label="Gender"
           rules={[{ required: true, message: "Please input the gender!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fluorescence" label="Fluorescence"
           rules={[{ required: true, message: "Please input the fluorescence!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description"
           rules={[{ required: true, message: "Please input the description!" }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name="imageRings" label="ImageRings"
           rules={[{ required: true, message: "Please input the image Rings!" }]}>
            <Input />
          </Form.Item> */}
          <Form.Item
            name="imageRings"
            label="Image Rings"
            rules={[
              {
                required: true,
                message: "Please upload the Image Rings!",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {form.getFieldValue("imageRings") &&
              form.getFieldValue("imageRings")[0] && (
                <img
                  src={form.getFieldValue("imageRings")[0].preview}
                  alt="Uploaded Rings"
                  style={{ width: "450px", height: "auto", marginTop: "10px" }}
                />
              )}
          </Form.Item>
          {/* <Form.Item name="imageBrand" label="ImageBrand"
           rules={[{ required: true, message: "Please input the image Brand!" }]}>
            <Input />
          </Form.Item> */}
          <Form.Item
            name="imageBrand"
            label="Image Brand"
            rules={[
              {
                required: true,
                message: "Please upload the Image Brand!",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {form.getFieldValue("imageBrand") &&
              form.getFieldValue("imageBrand")[0] && (
                <img
                  src={form.getFieldValue("imageBrand")[0].preview}
                  alt="Uploaded Brand"
                  style={{ width: "450px", height: "auto", marginTop: "10px" }}
                />
              )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Ring
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageRingPage;
