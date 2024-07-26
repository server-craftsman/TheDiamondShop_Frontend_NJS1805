// //import React from 'react'
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Table, Form, Input, InputNumber, Modal, notification } from "antd";
// import { Link } from "react-router-dom";

// function ManageDiamondPage() {
//   const [diamonds, setDiamonds] = useState([]);
//   //const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   // const [editingDiamond, setEditingDiamond] = useState(null); // To store the diamond being edited

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8090/products/diamonds"
//       );
//       setDiamonds(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const handleAddDiamond = async (values) => {
//     try {
//       await axios.post("http://localhost:8090/products/add-diamond", values);
//       fetchData(); // Refresh the list
//       setIsAddModalVisible(false); // Close the modal
//       form.resetFields(); // Reset the form fields
//       notification.success({
//         message: 'Success',
//         description: 'Diamond added successfully!',
//       });
//     } catch (error) {
//       console.error("Error adding diamond:", error);
//     }
//   };
//   const columns = [
//     {
//       title: "Diamond ID",
//       dataIndex: "DiamondID",
//       key: "DiamondID",
//     },
//     {
//       title: "Origin",
//       dataIndex: "DiamondOrigin",
//       key: "DiamondOrigin",
//     },
//     {
//       title: "Carat Weight",
//       dataIndex: "CaratWeight",
//       key: "CaratWeight",
//     },
//     {
//       title: "Color",
//       dataIndex: "Color",
//       key: "Color",
//     },
//     {
//       title: "Clarity",
//       dataIndex: "Clarity",
//       key: "Clarity",
//     },
//     {
//       title: "Cut",
//       dataIndex: "Cut",
//       key: "Cut",
//     },
//     {
//       title: "Price",
//       dataIndex: "Price",
//       key: "Price",
//     },
//     {
//       title: "Shape",
//       dataIndex: "Shape",
//       key: "Shape",
//     },
//     {
//       title: "Image",
//       dataIndex: "Image",
//       key: "Image",
//       render: (text, record) => (
//         <img
//           src={record.Image}
//           alt="Diamond"
//           style={{ width: "100px", height: "auto" }}
//         />
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Link to={`/diamonds-detail/${record.DiamondID}`}>View Details</Link>
//       ),
//     },

//     // Add other necessary columns here
//   ];

//   return (
//     <>
//       <h1>Diamond</h1>
//       <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
//         Add Diamond
//       </Button>
//       <Table dataSource={diamonds} columns={columns} rowKey="DiamondID" />
//       <Modal
//         title="Add Diamond"
//         open={isAddModalVisible}
//         onCancel={() => setIsAddModalVisible(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleAddDiamond}>
//           <Form.Item
//             name="diamondOrigin"
//             label="Diamond Origin"
//             rules={[
//               { required: true, message: "Please input the diamond origin!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="caratWeight"
//             label="Carat Weight"
//             rules={[
//               { required: true, message: "Please input the carat weight!" },
//             ]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="color"
//             label="Color"
//             rules={[{ required: true, message: "Please input the color!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="clarity"
//             label="Clarity"
//             rules={[{ required: true, message: "Please input the clarity!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="cut"
//             label="Cut"
//             rules={[{ required: true, message: "Please input the cut!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: "Please input the price!" }]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="shape"
//             label="Shape"
//             rules={[{ required: true, message: "Please input the shape!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="image"
//             label="Image URL"
//             rules={[{ required: true, message: "Please input the image URL!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="polish"
//             label="Polish"
//             rules={[{ required: true, message: "Please input the polish!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="symmetry"
//             label="Symmetry"
//             rules={[{ required: true, message: "Please input the symmetry!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="tablePercentage"
//             label="Table Percentage"
//             rules={[
//               { required: true, message: "Please input the table Percentage!" },
//             ]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="depth"
//             label="Depth"
//             rules={[{ required: true, message: "Please input the depth!" }]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="measurements"
//             label="Measurements"
//             rules={[
//               { required: true, message: "Please input the measurements!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="giaReportNumber"
//             label="GIA Report Number"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the gia Report Number!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="stockNumber"
//             label="Stock Number"
//             rules={[
//               { required: true, message: "Please input the stock Number!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="labReportNumber"
//             label="Lab Report Number"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the lab Report Number!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="gemstone"
//             label="Gemstone"
//             rules={[{ required: true, message: "Please input the gemstone!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="gradingReport"
//             label="Grading Report"
//             rules={[
//               { required: true, message: "Please input the grading Report!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="descriptors"
//             label="Descriptors"
//             rules={[
//               { required: true, message: "Please input the descriptors!" },
//             ]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item
//             name="fluorescence"
//             label="Fluorescence"
//             rules={[
//               { required: true, message: "Please input the fluorescence!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Diamond
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// }

// export default ManageDiamondPage;

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
function ManageDiamondPage() {
  const [diamonds, setDiamonds] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);

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

  // const handleAddDiamond = async (values) => {
  //   try {
  //     await axios.post("http://localhost:8090/products/add-diamond", values);
  //     fetchData(); // Refresh the list
  //     setIsAddModalVisible(false); // Close the modal
  //     form.resetFields(); // Reset the form fields
  //     notification.success({
  //       message: 'Success',
  //       description: 'Diamond added successfully!',
  //     });
  //   } catch (error) {
  //     console.error("Error adding diamond:", error);
  //   }
  // };

  // const handlePreviewImage = async (file) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setPreviewImage(reader.result);
  //     };
  //   }
  //   return false; // Prevent Upload component from uploading the file immediately
  // };

  const handleAddDiamond = async (values) => {
    try {
      await axios.post("http://localhost:8090/products/add-diamond", values);
      fetchData(); // Refresh the list
      setIsAddModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      setPreviewImage(""); // Clear image preview
      notification.success({
        message: "Success",
        description: "Diamond added successfully!",
      });
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result); // Set image preview URL
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      if (values.image && values.image[0]) {
        const base64Image = await handleImageUpload(
          values.image[0].originFileObj
        );
        values.image = base64Image;
      } else {
        values.image = ""; // Or handle no image case appropriately
      }
      handleAddDiamond(values);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 1");
    }
    return Promise.resolve();
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
        <Link to={`/diamonds-detail/${record.DiamondID}`}>View Details</Link>
      ),
    },
  ];
  const validateDiamondExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = diamonds.some(
      (item) =>
        item.GIAReportNumber === value ||
        item.StockNumber === value ||
        item.LabReportNumber === value
    );

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
  };

  const validateReportNumAndLabNum = (rule, value) => {
    const regex = /^\d{10}$/; // Regular expression to check if value is exactly 10 digits

    if (!regex.test(value)) {
      return Promise.reject(
        "The input value must be a 10-digit natural number. EX: 1234567890"
      );
    }

    return Promise.resolve();
  };

  const validateTablePercentageAndDepth = (rule, value) => {
    // Check if the value is a number and between 1 and 100
    if (value < 1 || value > 100) {
      return Promise.reject("The percentage must be between 1 and 100.");
    }

    return Promise.resolve();
  };

  const validateCaratWeight = (rule, value) => {
    // Convert the value to a number
    const numValue = parseFloat(value);

    // Check if the value is a number and between 0.1 and 3.0
    if (isNaN(numValue) || numValue < 0.1 || numValue > 3.0) {
      return Promise.reject(
        "The carat weight must be a value between 0.1 and 3.0."
      );
    }

    return Promise.resolve();
  };
  const validateDiamondMeasurements = (rule, value) => {
    // Define a regular expression to match a pattern like "length x width x depth"
    const regex = /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?$/;

    // Check if the value matches the pattern
    if (!regex.test(value)) {
      return Promise.reject(
        'Measurements must be in the format "length x width x depth" with positive numbers. EX: 6.75x4.25x2.86'
      );
    }

    // Split the measurements and convert them to numbers
    const [length, width, depth] = value
      .split("x")
      .map((num) => parseFloat(num.trim()));

    // Check if the measurements are positive numbers and within a reasonable range
    if (length <= 0 || width <= 0 || depth <= 0) {
      return Promise.reject("All measurements must be positive numbers.");
    }

    return Promise.resolve();
  };

  const validateStockNumber = (rule, value) => {
    // Define a regular expression to match the format "D60057-01"
    const regex = /^[A-Z]\d{5}-\d{2}$/;

    // Check if the value matches the pattern
    if (!regex.test(value)) {
      return Promise.reject(
        'Stock Number must be in the format is: A capital letter followed by 5 digits separated by a hyphen "-" and 2 digits.EX: "D12345-67".'
      );
    }

    return Promise.resolve();
  };

  return (
    <>
      <h1>Diamond</h1>
      <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
        Add Diamond
      </Button>
      <Table dataSource={diamonds} columns={columns} rowKey="DiamondID" />

      <Modal
        title="Add Diamond"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="diamondOrigin"
            label="Diamond Origin"
            rules={[
              { required: true, message: "Please input the diamond origin!" },
            ]}
          >
            <Select>
              <Select.Option value="natural">natural</Select.Option>
              <Select.Option value="artificial">artificial</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="caratWeight"
            label="Carat Weight"
            rules={[
              { required: true, message: "Please input the carat weight!" },
              { validator: validateCaratWeight },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please input the color!" }]}
          >
            <Select>
              <Select.Option value="F">F</Select.Option>
              <Select.Option value="G">G</Select.Option>
              <Select.Option value="I">I</Select.Option>
              <Select.Option value="K">K</Select.Option>
              <Select.Option value="J">J</Select.Option>
              <Select.Option value="E">E</Select.Option>
              <Select.Option value="H">H</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="clarity"
            label="Clarity"
            rules={[{ required: true, message: "Please input the clarity!" }]}
          >
            <Select>
              <Select.Option value="Very Slightly Included">
                Very Slightly Included
              </Select.Option>
              <Select.Option value="Slightly Included">
                Slightly Included
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="cut"
            label="Cut"
            rules={[{ required: true, message: "Please input the cut!" }]}
          >
            <Select>
              <Select.Option value="N/A">N/A</Select.Option>
              <Select.Option value="Very Good">Very Good</Select.Option>
              <Select.Option value="Excellent">Excellent</Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item> */}
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
              { validator: validatePrice },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="shape"
            label="Shape"
            rules={[{ required: true, message: "Please input the shape!" }]}
          >
            <Select>
              <Select.Option value="Emerald">Emerald</Select.Option>
              <Select.Option value="Round">Round</Select.Option>
              <Select.Option value="Cushion">Cushion</Select.Option>
              <Select.Option value="Princess">Princess</Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="image"
            label="Image Upload"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={(image) => handlePreviewImage(image)}
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon style={{ fontSize: "100px", color:"#000"}} />
              </Button>
            </Upload>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ marginTop: "10px", maxWidth: "100%" }}
              />
            )}
          </Form.Item> */}
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
            rules={[{ required: true, message: "Please upload the image!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              maxCount={1}
              onChange={({ fileList }) =>
                form.setFieldsValue({ image: fileList })
              }
              onPreview={(file) => handleImageUpload(file.originFileObj)}
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {previewImage && (
              <Form.Item>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: "400px", height: "auto" }}
                />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item
            name="polish"
            label="Polish"
            rules={[{ required: true, message: "Please input the polish!" }]}
          >
            <Select>
              <Select.Option value="Good">Good</Select.Option>
              <Select.Option value="Very Good">Very Good</Select.Option>
              <Select.Option value="Excellent">Excellent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="symmetry"
            label="Symmetry"
            rules={[{ required: true, message: "Please input the symmetry!" }]}
          >
            <Select>
              <Select.Option value="Good">Good</Select.Option>
              <Select.Option value="Very Good">Very Good</Select.Option>
              <Select.Option value="Excellent">Excellent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tablePercentage"
            label="Table Percentage (%)"
            rules={[
              { required: true, message: "Please input the table Percentage!" },
              { validator: validateTablePercentageAndDepth },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="depth"
            label="Depth (%)"
            rules={[
              { required: true, message: "Please input the depth!" },
              { validator: validateTablePercentageAndDepth },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="measurements"
            label="Measurements"
            rules={[
              { required: true, message: "Please input the measurements!" },
              { validator: validateDiamondMeasurements },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="giaReportNumber"
            label="GIA Report Number"
            rules={[
              {
                required: true,
                message: "Please input the gia Report Number!",
              },
              { validator: validateDiamondExist },
              { validator: validateReportNumAndLabNum },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stockNumber"
            label="Stock Number"
            rules={[
              { required: true, message: "Please input the stock Number!" },
              { validator: validateDiamondExist },
              { validator: validateStockNumber },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="labReportNumber"
            label="Lab Report Number"
            rules={[
              {
                required: true,
                message: "Please input the lab Report Number!",
              },
              { validator: validateDiamondExist },
              { validator: validateReportNumAndLabNum },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gemstone"
            label="Gemstone"
            rules={[{ required: true, message: "Please input the gemstone!" }]}
          >
            <Select>
              <Select.Option value="Natural, untreated diamond">
                Natural, untreated diamond
              </Select.Option>
              <Select.Option value="Natural, treated diamond">
                Natural, treated diamond
              </Select.Option>
              <Select.Option value="Artificial, untreated diamond">
                Artificial, untreated diamond
              </Select.Option>
              <Select.Option value="Artificial, treated diamond">
                Artificial, treated diamond
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gradingReport"
            label="Grading Report"
            // rules={[
            //   { required: true, message: "Please input the grading Report!" },
            // ]}
            initialValue="GIA"
          >
            <Input disabled placeholder="GIA" />
          </Form.Item>
          <Form.Item
            name="descriptors"
            label="Descriptors"
            rules={[
              { required: true, message: "Please input the descriptors!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="fluorescence"
            label="Fluorescence"
            rules={[
              { required: true, message: "Please input the fluorescence!" },
            ]}
          >
            <Select>
              <Select.Option value="NON">NON</Select.Option>
              <Select.Option value="MB">MB</Select.Option>
              <Select.Option value="STG BL">STG BL</Select.Option>
              <Select.Option value="FNL BL">FNL BL</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Diamond
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageDiamondPage;
