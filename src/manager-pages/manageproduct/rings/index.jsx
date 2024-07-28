import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Table, Form, Input, InputNumber, Modal, notification, Upload, Select } from "antd";
import { Link } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, colors } from "@mui/material";

const { Option } = Select;

function ManageRingPage() {
  const [rings, setRings] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [isAddRingVisible, setIsAddRingVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
    fetchMaterialDetails();
    fetchRingSizeDetails();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/products/diamond-rings");
      setRings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMaterialDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8090/products/material-details");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching material details:", error);
    }
  };

  const fetchRingSizeDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8090/products/ring-size-details");
      setRingSizes(response.data);
    } catch (error) {
      console.error("Error fetching ring size details:", error);
    }
  };

  const handleAddRings = async (values) => {
    try {
      console.log("Form Values:", values);

      // Validate imageRings
      if (!values.imageRings || !values.imageRings.fileList || values.imageRings.fileList.length === 0) {
        notification.error({
          message: "Error",
          description: "Rings image file is required.",
        });
        return;
      }

      // Validate imageBrand
      if (!values.imageBrand || !values.imageBrand.fileList || values.imageBrand.fileList.length === 0) {
        notification.error({
          message: "Error",
          description: "Brand image file is required.",
        });
        return;
      }

      // Convert image files to base64
      const imageData = await fileToBase64(values.imageRings.fileList[0].originFileObj);
      const imageBrand = await fileToBase64(values.imageBrand.fileList[0].originFileObj);

      const updatedValues = {
        ...values,
        MaterialID: values.Material,
        RingSizeID: values.RingSize,
        ImageRings: imageData,
        ImageBrand: imageBrand,
      };

      console.log("Updated Values:", updatedValues);

      const response = await axios.post("http://localhost:8090/products/add-diamond-ring", updatedValues);

      if (response.status === 200) {
        fetchData();
        setIsAddRingVisible(false);
        form.resetFields();
        notification.success({
          message: "Success",
          description: "Diamond Ring added successfully!",
        });
      } else {
        throw new Error(`Failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding diamond ring:", error);
      notification.error({
        message: "Error",
        description: error.message || "Failed to add diamond ring.",
      });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validateNumber = (message) => (rule, value) => {
    if (value <= 0) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  };

  const validateStringLength = (maxLength) => (rule, value) => {
    if (value && value.length > maxLength) {
      return Promise.reject(`Must be ${maxLength} characters or less`);
    }
    return Promise.resolve();
  };

  const columns = [
    {
      title: "Ring Style",
      dataIndex: "RingStyle",
      key: "RingStyle",
    },
    {
      title: "Name Rings",
      dataIndex: "NameRings",
      key: "NameRings",
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
      title: "Image Rings",
      dataIndex: "ImageRings",
      key: "ImageRings",
      render: (text, record) => (
        <img src={record.ImageRings} alt="Rings" style={{ width: "100px", height: "auto" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Link to={`/rings-detail/${record.DiamondRingsID}`}>View Details</Link>,
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
            name="RingStyle"
            label="Ring Style"
            rules={[
              { required: true, message: "Please input the Ring Style!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="NameRings"
            label="Name Rings"
            rules={[
              { required: true, message: "Please input the name Rings!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Category"
            label="Category"
            rules={[
              { required: true, message: "Please input the category!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Select>
              <Option value="Diamond Fashion Rings">Diamond Fashion Rings</Option>
              <Option value="Women`s Wedding Bands">Women`s Wedding Bands</Option>
              <Option value="Gemstone Fashion Rings">Gemstone Fashion Rings</Option>
              <Option value="Rings">Rings</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="BrandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the brand Name!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Select>
              <Option value="Simon G">Simon G</Option>
              <Option value="Allison Kaufman">Allison Kaufman</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Material"
            label="Material"
            rules={[
              { required: true, message: "Please input the material!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Select>
              {materials.map((material) => (
                <Option key={material.MaterialID} value={material.MaterialID}>
                  {material.MaterialName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterGemstone"
            label="Center Gemstone"
            rules={[
              { required: true, message: "Please input the center gemstone!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Select>
              <Option value="NULL">NULL</Option>
              <Option value="Yellow Diamond">Yellow Diamond</Option>
              <Option value="Amethyst">Amethyst</Option>
              <Option value="Ruby">Ruby</Option>
              <Option value="Diamond">Diamond</Option>
              <Option value="Blue Topaz">Blue Topaz</Option>
              <Option value="Garnet">Garnet</Option>
              <Option value="Tanzanite">Tanzanite</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterGemstoneShape"
            label="Center Gemstone Shape"
            rules={[
              { required: true, message: "Please input the center gemstone shape!" },
              { validator: validateStringLength(50) },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="RingSize"
            label="Ring Size"
            rules={[{ required: true, message: "Please select the ring size!" }]}
          >
            <Select>
              {ringSizes.map((ringSize) => (
                <Option key={ringSize.RingSizeID} value={ringSize.RingSizeID}>
                  {ringSize.RingSize}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Price"
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
              { type: "number", min: 1, message: "Price must be greater than zero" },
              { validator: validateNumber("Price must be greater than zero") },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="imageRings"
            label="Image Rings"
            rules={[{ required: true, message: "Please upload the image of the rings!" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              accept="image/*"
            >
              <Button icon={<AddPhotoAlternateIcon />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="imageBrand"
            label="Image Brand"
            rules={[{ required: true, message: "Please upload the image of the brand!" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              accept="image/*"
            >
              <Button icon={<AddPhotoAlternateIcon />}>Upload</Button>
            </Upload>
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
