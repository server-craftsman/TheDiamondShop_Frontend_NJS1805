import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Upload,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { Button, colors } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function ManageBridalPage() {
  const [bridals, setBridals] = useState([]);
  const [isAddBridalVisible, setIsAddBridalVisible] = useState(false);
  const [form] = Form.useForm();
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
      const imageData = await fileToBase64(values.imageBridal[0]); // Pass the correct file object
      const updatedValues = { ...values, imageBridal: imageData };
      await axios.post(
        "http://localhost:8090/products/add-bridals",
        updatedValues
      );
      fetchData(); // Refresh the list
      setIsAddBridalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: "Success",
        description: "Bridals added successfully!",
      });
    } catch (error) {
      console.error("Error adding bridals:", error);
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

  // const validatePrice = (rule, value) => {
  //   if (value < 1) {
  //     return Promise.reject('Price must be greater than 1');
  //     }
  //     return Promise.resolve();
  // }
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
        <Link to={`/bridals-detail/${record.BridalID}`}>View Details</Link>
      ),
    },
  ];

  return (
    <>
      <h1>Bridals</h1>
      <Button type="primary" onClick={() => setIsAddBridalVisible(true)}>
        Add Bridal
      </Button>
      <Table dataSource={bridals} columns={columns} rowKey="BridalID" />
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
            initialValue="Engagement Rings"
          >
            <Input disabled placeholder="Engagement Rings" />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the Brand Name!" },
            ]}
            initialValue="Overnight"
          >
            <Input disabled placeholder="Overnight" />
          </Form.Item>
          <Form.Item
            name="settingType"
            label="Setting Type"
            rules={[
              { required: true, message: "Please input the Setting Type!" },
            ]}
          >
            <Select>
              <Select.Option value="Halo">Halo</Select.Option>
              <Select.Option value="Three Stone">Three Stone</Select.Option>
              <Select.Option value="Single Row">Single Row</Select.Option>
              <Select.Option value="Multi Row">Multi Row</Select.Option>
              <Select.Option value="Antique">Antique</Select.Option>
              <Select.Option value="Bypass">Bypass</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the Gender!" }]}
            initialValue="Womens"
          >
            <Input disabled placeholder="Womens" />
          </Form.Item>
          <Form.Item
            name="imageBridal"
            label="Image Bridal"
            rules={[
              {
                required: true,
                message: "Please upload the Image Bridal!",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {form.getFieldValue("imageBridal") &&
              form.getFieldValue("imageBridal")[0] && (
                <img
                  src={form.getFieldValue("imageBridal")[0].preview}
                  alt="Uploaded Bridal"
                  style={{ width: "450px", height: "auto", marginTop: "10px" }}
                />
              )}
          </Form.Item>
          <Form.Item
            name="weight"
            label="Weight"
            rules={[{ required: true, message: "Please input the weight!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="centerDiamond"
            label="Center Diamond"
            // rules={[
            //   { required: true, message: "Please input the center Diamond!" },
            // ]}
            initialValue="Not Included"
          >
            <Input disabled placeholder="Not Included" />
          </Form.Item>
          <Form.Item
            name="diamondCaratRange"
            label="Diamond Carat Range (0,2 - 0,4)"
            rules={[
              {
                required: true,
                message: "Please input the diamond Carat Range!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalCaratweight"
            label="Total Carat Weight"
            rules={[
              {
                required: true,
                message: "Please input the total Carat weight!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalDiamond"
            label="Total Diamond"
            rules={[
              { required: true, message: "Please input the total Diamond!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" },
              {validator: validatePrice}
            ]}
          >
            <InputNumber style={{width: "100%"}}/>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Bridals
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageBridalPage;
