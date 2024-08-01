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

const { Option } = Select;

function ManageBridalPage() {
  const [bridals, setBridals] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [isAddBridalVisible, setIsAddBridalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchData();
    fetchMaterialDetails();
    fetchRingSizeDetails();
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

  const fetchMaterialDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/material-details"
      );
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching material details:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch material details.",
      });
    }
  };

  const fetchRingSizeDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/ring-size-details"
      );
      setRingSizes(response.data);
    } catch (error) {
      console.error("Error fetching ring size details:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch ring size details.",
      });
    }
  };

  const handleAddBridals = async (values) => {
    try {
      if (!values.imageBridal || !values.imageBridal.length) {
        notification.error({
          message: "Error",
          description: "Bridal image file is required.",
        });
        return;
      }
      const imageData = await fileToBase64(values.imageBridal[0]); // Pass the correct file object
      const updatedValues = {
        ...values,
        MaterialID: values.MaterialID,
        RingSizeID: values.RingSizeID,
        ImageBridal: imageData,
      };

      const response = await axios.post(
        "http://localhost:8090/products/add-bridal",
        updatedValues
      );

      if (response.status === 200) {
        fetchData(); // Refresh the list
        setIsAddBridalVisible(false); // Close the modal
        form.resetFields(); // Reset the form fields
        notification.success({
          message: "Success",
          description: "Bridals added successfully!",
        });
      } else {
        throw new Error(`Failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding bridals:", error);
      if (error.response) {
        notification.error({
          message: "Error",
          description:
            error.response.data.message || "Failed to add diamond ring.",
        });
      } else {
        notification.error({
          message: "Error",
          description: error.message || "Failed to add diamond ring.",
        });
      }
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
      title: "No",
      dataIndex: "BridalID",
      key: "BridalID",
    },
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
        <Link to={`/bridals-detail/${record.BridalID}`}>
          <Button>View Details</Button>
        </Link>
      ),
    },
  ];

  //=============================Validate==============================//

  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 0");
    }
    return Promise.resolve();
  };

  const validateBridalsStyle = (rule, value) => {
    // Check if the value has exactly 10 characters
    // if (value.length !== 10) {
    //   return Promise.reject("Bridals Style must be exactly 10 characters long");
    // }

    // Check if the value has a length between 7 and 10 characters
    if (value.length < 7 || value.length > 10) {
      return Promise.reject(
        "Bridals Style must be between 7 and 10 characters long"
      );
    }

    // Check if the first 5 characters are digits
    const firstPart = value.substring(0, 5);
    if (!/^\d{5}$/.test(firstPart)) {
      return Promise.reject("The first 5 characters must be digits");
    }

    // Check if the hyphen is in the correct position
    if (value[5] !== "-") {
      return Promise.reject("The 6th character must be a hyphen");
    }

    // Check the remaining part after the hyphen
    const secondPart = value.substring(6);
    if (!/^([A-Z0-9]+)$/.test(secondPart)) {
      return Promise.reject(
        "The characters after the hyphen can be letters (uppercase), numbers."
      );
    }

    // Check if there are two consecutive hyphens in the second part
    if (secondPart.includes("--")) {
      return Promise.reject(
        'The "-" signs cannot be placed next to each other'
      );
    }

    return Promise.resolve();
  };

  const validateBridalExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = bridals.some(
      (item) => item.BridalStyle === value || item.NameBridal === value // || another attribute if have
    );

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
  };

  const validateWeight = (rule, value) => {
    const Weight = parseFloat(value);
    if (isNaN(Weight) || Weight < 2 || Weight > 3.6) {
      return Promise.reject(
        "Weight must be a decimal number between 2 and 3.6 mm"
      );
    }
    return Promise.resolve();
  };

  const validateDiamondCaratRange = (rule, value) => {
    // Split the input value by the dash character
    const parts = value.split("-");

    // Ensure there are exactly two parts
    if (parts.length !== 2) {
      // if (parts.length <10) {
      return Promise.reject(
        "Invalid format. Use the format: Decimal 1 - Decimal 2"
      );
    }

    // Parse the parts as floating-point numbers
    const decimal1 = parseFloat(parts[0]);
    const decimal2 = parseFloat(parts[1]);

    // Validate that both parts are numbers and within the correct range
    if (
      isNaN(decimal1) ||
      isNaN(decimal2) ||
      decimal1 <= 0 ||
      decimal1 >= 1 ||
      decimal2 <= 0 ||
      decimal2 > 1 ||
      decimal1 >= decimal2
    ) {
      return Promise.reject(
        "Invalid range. Ensure Decimal 1 < Decimal 2, and both are within (0, 1]"
      );
    }

    return Promise.resolve();
  };

  const validateTotalCaratWeight = (rule, value) => {
    const caratWeight = parseFloat(value);
    if (isNaN(caratWeight) || caratWeight <= 0 || caratWeight > 5) {
      return Promise.reject(
        "Total carat weight must be a decimal number greater than 0 and less than or equal to 5"
      );
    }
    return Promise.resolve();
  };

  const validateTotalDiamond = (rule, value) => {
    const totalDiamond = Number(value); // Parse the value as a number
    if (
      !Number.isInteger(totalDiamond) ||
      totalDiamond <= 0 ||
      totalDiamond > 30
    ) {
      return Promise.reject(
        "Total Diamond must be a natural number greater than 0 and less than or equal to 30"
      );
    }
    return Promise.resolve();
  };

  // const validateTotalDiamond = (rule, value) => {
  //   const totalDiamond = parseInt(value, 10);
  //   if (isNaN(totalDiamond) || totalDiamond <= 0 || totalDiamond > 30) {
  //     return Promise.reject(
  //       "Total Diamond must be an integer greater than 0 and less than or equal to 30"
  //     );
  //   }
  //   return Promise.resolve();
  // };

  //=========================================================================//

  return (
    <>
      <h1>Bridals</h1>
      <Button
        style={{ color: "#000", border: "1px solid", fontSize: "20px" }}
        type="primary"
        onClick={() => setIsAddBridalVisible(true)}
      >
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
            name="BridalStyle"
            label="Bridal Style (12345-EX10)"
            rules={[
              { required: true, message: "Please input the Bridal Style!" },
              { validator: validateBridalsStyle },
              { validator: validateBridalExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="NameBridal"
            label="Name Bridal"
            rules={[
              { required: true, message: "Please input the Name Bridal!" },
              { validator: validateBridalExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Category"
            label="Category"
            rules={[{ required: true, message: "Please input the Category!" }]}
            initialValue="Engagement Rings"
          >
            <Input disabled placeholder="Engagement Rings" />
          </Form.Item>
          <Form.Item
            name="BrandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the Brand Name!" },
            ]}
            initialValue="Overnight"
          >
            <Input disabled placeholder="Overnight" />
          </Form.Item>
          <Form.Item
            name="SettingType"
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
            name="Gender"
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
            name="Weight"
            label="Weight (2g - 3.6g)"
            rules={[
              { required: true, message: "Please input the weight!" },
              { validator: validateWeight },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="CenterDiamond"
            label="Center Diamond"
            // rules={[
            //   { required: true, message: "Please input the center Diamond!" },
            // ]}
            initialValue="Not Included"
          >
            <Input disabled placeholder="Not Included" />
          </Form.Item>
          <Form.Item
            name="DiamondCaratRange"
            label="Diamond Carat Range (0,2 - 0,4)"
            rules={[
              {
                required: true,
                message: "Please input the diamond Carat Range!",
              },
              { validator: validateDiamondCaratRange },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TotalCaratWeight"
            label="Total Carat Weight (0 - 5.0)"
            rules={[
              {
                required: true,
                message: "Please input the total Carat weight!",
              },
              { validator: validateTotalCaratWeight },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="TotalDiamond"
            label="Total Diamond (0 - 30)"
            rules={[
              { required: true, message: "Please input the total Diamond!" },
              { validator: validateTotalDiamond },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MaterialID"
            label="Material"
            rules={[{ required: true, message: "Please select the material!" }]}
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
            name="RingSizeID"
            label="Ring Size"
            rules={[
              { required: true, message: "Please select the ring size!" },
            ]}
          >
            <Select>
              {ringSizes.map((size) => (
                <Option key={size.RingSizeID} value={size.RingSizeID}>
                  {size.RingSize}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Price"
            label="Price (greater than 0)"
            rules={[
              { required: true, message: "Please input the price!" },
              { validator: validatePrice },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Inventory"
            label="Inventory"
            rules={[
              {
                required: true,
                message: "Please input the inventory quantity!",
              },
              // { validator: validateNumber("Inventory must be 0 or 1") },
            ]}
          >
            {/* <InputNumber style={{ width: "100%" }} /> */}
            <Select>
              <Option value="0">0</Option>
              <Option value="1">1</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ color: "#000", border: "1px solid", fontSize: "20px" }}
              type="primary"
              htmlType="submit"
            >
              Add Bridals
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageBridalPage;
