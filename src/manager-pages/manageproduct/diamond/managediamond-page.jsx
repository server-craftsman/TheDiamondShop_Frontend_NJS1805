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
import { Table, Form, Input, InputNumber, Modal, notification, Upload } from "antd";
import { Link } from "react-router-dom";
import { Button, colors } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
      const response = await axios.get("http://localhost:8090/products/diamonds");
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
      notification.success({
        message: 'Success',
        description: 'Diamond added successfully!',
      });
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const handlePreviewImage = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
    }
    return false; // Prevent Upload component from uploading the file immediately
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
          </Form.Item>
          <Form.Item
            name="polish"
            label="Polish"
            rules={[{ required: true, message: "Please input the polish!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="symmetry"
            label="Symmetry"
            rules={[{ required: true, message: "Please input the symmetry!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tablePercentage"
            label="Table Percentage"
            rules={[
              { required: true, message: "Please input the table Percentage!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="depth"
            label="Depth"
            rules={[{ required: true, message: "Please input the depth!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="measurements"
            label="Measurements"
            rules={[
              { required: true, message: "Please input the measurements!" },
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
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stockNumber"
            label="Stock Number"
            rules={[
              { required: true, message: "Please input the stock Number!" },
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
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gemstone"
            label="Gemstone"
            rules={[{ required: true, message: "Please input the gemstone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gradingReport"
            label="Grading Report"
            rules={[
              { required: true, message: "Please input the grading Report!" },
            ]}
          >
            <Input />
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
            <Input />
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
