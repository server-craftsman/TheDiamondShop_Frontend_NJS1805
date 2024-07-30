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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";

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
      const response = await axios.get(
        "http://localhost:8090/products/diamond-rings"
      );
      setRings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch ring data.",
      });
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

  const handleAddRings = async (values) => {
    try {
      if (!values.imageRings || !values.imageRings.length) {
        notification.error({
          message: "Error",
          description: "Rings image file is required.",
        });
        return;
      }

      if (!values.imageBrand || !values.imageBrand.length) {
        notification.error({
          message: "Error",
          description: "Brand image file is required.",
        });
        return;
      }

      const imageData = await fileToBase64(values.imageRings[0].originFileObj);
      const imageBrand = await fileToBase64(values.imageBrand[0].originFileObj);

      const updatedValues = {
        ...values,
        MaterialID: values.MaterialID,
        RingSizeID: values.RingSizeID,
        ImageRings: imageData,
        ImageBrand: imageBrand,
      };

      const response = await axios.post(
        "http://localhost:8090/products/add-diamond-ring",
        updatedValues
      );

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
      reader.readAsDataURL(file);
    });
  };

 
//====================================================================//
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

  const uploadButtonStyle = {
    backgroundColor: "#1c1c1c", // Dark background
    color: "#d4af37", // Gold text color
    border: "2px solid #d4af37", // Gold border
    borderRadius: "10px", // Rounded corners
    padding: "12px 24px", // Padding for a more substantial look
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // More pronounced shadow for depth
    fontFamily: "Georgia, serif", // Elegant font
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease", // Smooth transition for hover effect
  };

  const uploadButtonHoverStyle = {
    backgroundColor: "#d4af37", // Invert colors on hover
    color: "#1c1c1c", // Dark text on gold background
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Deeper shadow on hover
  };
  const [hovered, setHovered] = React.useState({
    imageRings: false,
    imageBrand: false,
  });


   //===============From here is time to validate========================//
   const validateRingExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = rings.some(
      (item) => item.RingStyle === value || item.NameRings === value // || another attribute if have
    );

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
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
  // Define the validateWidth function
  const validateWidth = (rule, value) => {
    const width = parseFloat(value);
    if (isNaN(width) || width < 1 || width > 5) {
      return Promise.reject(
        "Width must be a decimal number between 1mm and 5 mm"
      );
    }
    return Promise.resolve();
  };

  const validateDimension = (rule, value) => {
    const Dimension = parseFloat(value);
    if (isNaN(Dimension) || Dimension < 1 || Dimension > 6.5) {
      return Promise.reject(
        "Dimension must be a decimal number between 1mm and 6.5 mm"
      );
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

  const validateGemstoneWeight = (rule, value) => {
    const GemstoneWeight = parseFloat(value);
    if (isNaN(GemstoneWeight) || GemstoneWeight < 1 || GemstoneWeight > 3) {
      return Promise.reject(
        "Gem Stone Weight must be a decimal number between 1ct and 3ct"
      );
    }
    return Promise.resolve();
  };

  const validateDiamondCaratWeight = (rule, value) => {
    const DiamondCaratWeight = parseFloat(value);
    if (
      isNaN(DiamondCaratWeight) ||
      DiamondCaratWeight < 1 ||
      DiamondCaratWeight > 3
    ) {
      return Promise.reject(
        "Diamond Carat Weight must be a decimal number between 1ct and 3ct"
      );
    }
    return Promise.resolve();
  };
//====================================================================//
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
              { validator: validateRingExist },
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
              { validator: validateRingExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Category"
            label="Category"
            rules={[
              { required: true, message: "Please input the category!" },
              // { validator: validateStringLength(50) },
            ]}
          >
            <Select>
              <Option value="Diamond Fashion Rings">
                Diamond Fashion Rings
              </Option>
              <Option value="Women`s Wedding Bands">
                Women`s Wedding Bands
              </Option>
              <Option value="Gemstone Fashion Rings">
                Gemstone Fashion Rings
              </Option>
              <Option value="Rings">Rings</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="BrandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the brand Name!" },
              // { validator: validateStringLength(50) },
            ]}
          >
            <Select>
              <Option value="Simon G">Simon G</Option>
              <Option value="Allison Kaufman">Allison Kaufman</Option>
            </Select>
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
            name="CenterGemstone"
            label="Center Gemstone"
            rules={[
              { required: true, message: "Please select the center gemstone!" },
            ]}
          >
            <Select>
              <Option value="NULL">NULL</Option>
              <Option value="Yellow Diamond">Yellow Diamond</Option>
              <Option value="Amethyst">Amethyst</Option>
              <Option value="Ruby">Ruby</Option>
              <Option value="Emerald">Emerald</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterGemstoneShape"
            label="Center Gemstone Shape"
            rules={[
              {
                required: true,
                message: "Please select the center gemstone shape!",
              },
            ]}
          >
            <Select>
              <Option value="Round">Round</Option>
              <Option value="Princess">Princess</Option>
              <Option value="Cushion">Cushion</Option>
              <Option value="Emerald">Emerald</Option>
              <Option value="Oval">Oval</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Width"
            label="Width (1mm - 5mm)"
            rules={[
              { required: true, message: "Please input the width!" },
              // { validator: validateNumber("Width must be greater than 0") },
              { validator: validateWidth },
              // Width là chiều rộng của cái vòng nhẫn nên 1.25mm - 5mm là hợp lý cho cả nam/nữ nữ thì phù hợp là 1mm - 2.25mm
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="CenterDiamondDimension"
            label="Center Diamond Dimension(1mm - 6.5mm)"
            rules={[
              {
                required: true,
                message: "Please input the center diamond dimension!",
              },
              { validator: validateDimension },
              //Dimension là cái đường kính của kích thước gắn viên kim cương chính vào nó khoảng 1.25mm đến 6.5 là hợp lý nhưng với các chỉ số kim cương của hàng mình có
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Weight"
            label="Weight (2g - 3.6g)"
            rules={[
              { required: true, message: "Please input the weight!" },
              // { validator: validateNumber("Weight must be greater than 0") },
              { validator: validateWeight },
              // Này là trọng lượng tổng của cái nhẫn cả viên kim cương trọng lượng nhẫn thì khoẳng từ 2 - 3 gam từy từng loại vật liệu + trọng lượng của diamond or gem ct(carat) 1ct = 0.2 gam|| EX: nhẫn 3g & gem 3ct => 3 + (0.2x3)=3.6g
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="GemstoneWeight"
            label="Gemstone Weight (1ct - 3ct)"
            rules={[
              { required: true, message: "Please input the gemstone weight!" },
              // {
              //   validator: validateNumber(
              //     "Gemstone Weight must be greater than 0"
              //   ),
              // },
              { validator: validateGemstoneWeight },
              // Gem stone weight tính = ct. !ct = 0.2g
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="CenterDiamondColor"
            label="Center Diamond Color"
            rules={[
              {
                required: true,
                message: "Please select the center diamond color!",
              },
            ]}
          >
            <Select>
              <Option value="D">D</Option>
              <Option value="E">E</Option>
              <Option value="F">F</Option>
              <Option value="G">G</Option>
              <Option value="H">H</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterDiamondClarity"
            label="Center Diamond Clarity"
            rules={[
              {
                required: true,
                message: "Please select the center diamond clarity!",
              },
            ]}
          >
            <Select>
              <Option value="IF">IF</Option>
              <Option value="VVS1">VVS1</Option>
              <Option value="VVS2">VVS2</Option>
              <Option value="VS1">VS1</Option>
              <Option value="VS2">VS2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterDiamondCaratWeight"
            label="Center Diamond Carat Weight (1ct - 3ct)"
            rules={[
              {
                required: true,
                message: "Please input the center diamond carat weight!",
              },
              // {
              //   validator: validateNumber(
              //     "Carat weight must be greater than 0"
              //   ),
              // },
              { validator: validateDiamondCaratWeight },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Gender"
            label="Gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Option value="Men">Men</Option>
              <Option value="Women">Women</Option>
              {/* <Option value="Unisex">Unisex</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            name="Fluorescence"
            label="Fluorescence"
            rules={[
              { required: true, message: "Please select the fluorescence!" },
            ]}
          >
            <Select>
              <Option value="None">None</Option>
              <Option value="Faint">Faint</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Strong">Strong</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
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
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
              { validator: validateNumber("Price must be greater than 0") },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="imageRings"
            label="Rings Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              { required: true, message: "Please upload a rings image!" },
            ]}
          >
            <Upload
              name="imageRings"
              accept="image/*"
              listType="picture-card"
              beforeUpload={() => false}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button style={{ color: "#000" }}>
                  <AddPhotoAlternateIcon />
                  Upload Rings Image
                </Button>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="imageBrand"
            label="Brand Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              { required: true, message: "Please upload a brand image!" },
            ]}
          >
            <Upload
              name="imageBrand"
              accept="image/*"
              listType="picture-card"
              beforeUpload={() => false}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button style={{ color: "#000" }}>
                  <AddPhotoAlternateIcon />
                  Upload Brand Image
                </Button>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{
                color: "#fff",
                backgroundColor: "#000",
                borderRadius: "10px",
                padding: "10px",
              }}
              htmlType="submit"
            >
              Add Ring
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageRingPage;
