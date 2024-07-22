// import React, { useContext, useEffect, useState } from 'react';
// import { Alert, Spin, Table, Input, Button, Select, Form, Modal, DatePicker } from 'antd';
// import axios from 'axios';
// import '../account-page/index.scss';
// import { AuthContext } from '../../AuthContext';

// const { Option } = Select;

// const Account = () => {
//   const [account, setAccount] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [email, setEmail] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
//   const { user } = useContext(AuthContext);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (user) {
//       fetchAccount();
//     }
//   }, [user]);

//   const fetchAccount = async () => {
//     setLoading(true);
//     setFetchError(null);
//     try {
//       const token = user?.token;
//       if (!token) {
//         console.error('Token not found in AuthContext');
//         return;
//       }

//       const response = await axios.get('http://localhost:8090/auth/account', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 && response.data.status) {
//         setAccount(response.data.account);
//       } else {
//         throw new Error(response.data.message || `Failed to fetch account details. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error fetching account:', error.message);
//       setFetchError('Error fetching account details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAccountByEmail = async (email) => {
//     setLoading(true);
//     setFetchError(null);
//     try {
//       const token = user?.token;
//       if (!token) {
//         console.error('Token not found in AuthContext');
//         return;
//       }

//       const response = await axios.get(`http://localhost:8090/auth/account/${email}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 && response.data.status) {
//         setAccount([response.data.account]);
//       } else {
//         throw new Error(response.data.message || `Failed to fetch account details. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error fetching account:', error.message);
//       setFetchError('Error fetching account details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchClick = () => {
//     if (email) {
//       fetchAccountByEmail(email);
//     } else {
//       fetchAccount();
//     }
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     setFetchError(null);
//     try {
//       const token = user?.token;
//       if (!token) {
//         console.error('Token not found in AuthContext');
//         return;
//       }

//       const response = await axios.post('http://localhost:8090/features/add-account-with-role', values, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 && response.data.token) {
//         form.resetFields();
//         setIsModalVisible(false); // Close the modal
//         alert('Account created successfully');
//         fetchAccount(); // Refresh the account list after creation
//       } else {
//         throw new Error(response.data.message || `Failed to create account. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error creating account:', error.message);
//       setFetchError('Error creating account. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleRoleChange = (value) => {
//   //   if (value !== 'Delivery') {
//   //     form.setFieldsValue({ Transportation: '' }); // Clear Transportation field when not Delivery
//   //   }
//   // };

//   const handleValuesChange = (changedValues) => {
//     if (changedValues.roleName != 'Delivery' && changedValues.roleName == 'Manager' && changedValues.roleName == 'Sale') {
//       form.setFieldsValue({ Transportation: '' }); // Clear the Transportation field if role is Delivery
//     }
//   };

//   const columns = [
//     { title: 'Account ID', dataIndex: 'AccountID', key: 'AccountID' },
//     { title: 'First Name', dataIndex: 'FirstName', key: 'FirstName' },
//     { title: 'Last Name', dataIndex: 'LastName', key: 'LastName' },
//     { title: 'Gender', dataIndex: 'Gender', key: 'Gender' },
//     { title: 'Email', dataIndex: 'Email', key: 'Email' },
//     { title: 'Password', dataIndex: 'Password', key: 'Password' },
//     { title: 'Role Name', dataIndex: 'RoleName', key: 'RoleName' },
//     { title: 'Status', dataIndex: 'Status', key: 'Status' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Button>View Details</Button>
//       ),
//     },
//   ];

//   return (
//     <div className='account'>
//       <section className="content-area-top">
//         <div className="area-top-l">
//           <h1 className="area-top-title">Account</h1> <br />
//         </div>
//       </section>
//       <br />
//       <Input 
//         placeholder="Enter email to search" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//         style={{ width: 300, marginRight: 10 }} 
//       />
//       <Button type="primary" onClick={handleSearchClick}>Search</Button>
//       <Button 
//         type="primary" 
//         style={{ marginLeft: 10 }} 
//         onClick={() => setIsModalVisible(true)} // Open the modal
//       >
//         Create Account
//       </Button>
//       <br /><br />
//       {loading ? (
//         <Spin size="large" />
//       ) : fetchError ? (
//         <Alert message={fetchError} type="error" />
//       ) : (
//         <Table columns={columns} dataSource={account} rowKey="AccountID" />
//       )}
//       <Modal
//         title="Create Account"
//         open={isModalVisible}
        
//         onCancel={() => setIsModalVisible(false)} // Close the modal
//         footer={null}
//       >
//         <Form
//           form={form}
//           onValuesChange={handleValuesChange}
//           onFinish={handleSubmit}
//           layout="vertical"
//         >
//           <Form.Item name="FirstName" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="LastName" label="Last Name" rules={[{ required: true, message: 'Please enter last name' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Gender" label="Gender" rules={[{ required: true, message: 'Please select gender' }]}>
//             <Select>
//               <Option value="Male">Male</Option>
//               <Option value="Female">Female</Option>
//               <Option value="Other">Other</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="Email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
//             <Input.Password />
//           </Form.Item>
//            <Form.Item
//           name="roleName"
//         label="Role"
//         rules={[{ required: true, message: 'Please select a role' }]}
//       >
//         <Select>
//           <Option value="Manager">Manager</Option>
//           <Option value="Sale">Sale</Option>
//           <Option value="Delivery">Delivery</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="Transportation"
//         label="Transportation"
//         rules={[
//           ({ getFieldValue }) => ({
//             validator(_, value) {
//               const roleName = getFieldValue('value');
//               if (roleName != 'Delivery' || !value) {
//                 return Promise.reject(new Error('Transportation is required for Delivery'));
//               }
//               return Promise.resolve();
//             },
//           }),
//         ]}
//       >
//         <Input
//           disabled={form.getFieldValue('value') === 'Delivery' && form.getFieldValue('value') === 'Sale' && form.getFieldValue('value') === 'Manager'}
//         />
//       </Form.Item>
//           <Form.Item name="Birthday" label="Birthday" rules={[{ required: true, message: 'Please enter email' }]}>
//             <DatePicker />
//           </Form.Item>
//           <Form.Item name="PhoneNumber" label="PhoneNumber" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Address" label="Address" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Country" label="Country" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="City" label="City" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Province" label="Province" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="PostalCode" label="PostalCode" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Status" label="Status" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="Image" label="Image" rules={[{ required: true, message: 'Please enter email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">Create Account</Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Account;

import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Spin,
  Table,
  Input,
  Select,
  Form,
  Modal,
  DatePicker,
  Upload,
  message,
} from "antd";
import { Button } from "@mui/material";
import axios from "axios";
import "../account-page/index.scss";
import { AuthContext } from "../../AuthContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import moment from "moment";
import { Link } from "react-router-dom";
const { Option } = Select;

const Account = () => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [role, setRole] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // State for image base64
  const [roleFilter, setRoleFilter] = useState("");
  useEffect(() => {
    if (user) {
      form.setFieldsValue({ Status: "Activate" });
      console.log("Fetching accounts with role filter:", roleFilter);
      fetchAccount(roleFilter);
    }
  }, [user, roleFilter]);

  const fetchAccount = async (RoleName = "") => {
    setLoading(true);
    setFetchError(null);
    console.log("Fetching accounts with role filter:", RoleName);
    try {
      const token = user?.token;
      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.get("http://localhost:8090/auth/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          role: RoleName || roleFilter, // Use roleFilter if RoleName is not provided
        },
      });

      if (response.status === 200 && response.data.status) {
        setAccount(response.data.account);
      } else {
        throw new Error(
          response.data.message ||
            `Failed to fetch account details. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching account:", error.message);
      setFetchError("Error fetching account details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountByEmail = async (email) => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = user?.token;
      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.get(
        `http://localhost:8090/auth/account/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status) {
        setAccount([response.data.account]);
      } else {
        throw new Error(
          response.data.message ||
            `Failed to fetch account details. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching account:", error.message);
      setFetchError("Error fetching account details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (email) {
      fetchAccountByEmail(email);
    } else {
      fetchAccount();
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = user?.token;
      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.post(
        "http://localhost:8090/features/add-account-with-role",
        { ...values, Image: imageBase64 }, // Include the Base64 image string in the form data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.token) {
        form.resetFields();
        setImageBase64(""); // Reset imageBase64 state
        setIsModalVisible(false); // Close the modal
        alert("Account created successfully");
        fetchAccount(); // Refresh the account list after creation
      } else {
        throw new Error(
          response.data.message ||
            `Failed to create account. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      setFetchError("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result);
      message.success("Image uploaded successfully");
    };
    reader.onerror = () => {
      message.error("Failed to upload image");
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  const disabledDate = (current) => {
    const startDate = moment().subtract(100, "years");
    const endDate = moment().endOf("day");
    return current && (current.isBefore(startDate) || current.isAfter(endDate));
  };

  const columns = [
    { title: "Account ID", dataIndex: "AccountID", key: "AccountID" },
    { title: "First Name", dataIndex: "FirstName", key: "FirstName" },
    { title: "Last Name", dataIndex: "LastName", key: "LastName" },
    { title: "Gender", dataIndex: "Gender", key: "Gender" },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Password", dataIndex: "Password", key: "Password" },
    {
      title: "Role Name",
      dataIndex: "RoleName",
      key: "RoleName",
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Manager', value: 'Manager' },
        { text: 'Sale', value: 'Sale' },
        { text: 'Customer', value: 'Customer' },
        { text: 'Delivery', value: 'Delivery' }
      ],
      onFilter: (value, record) => {
        // Safely handle cases where RoleName might be null or undefined
        const roleName = record.RoleName || "";
        return roleName.toString().includes(value); // Ensure roleName is treated as a string
      },
    },
    { title: "Status", dataIndex: "Status", key: "Status" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/admin-page/account-detail/${record.AccountID}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      ),
    },
  ];
  
  return (
    <div className="account">
      <section className="content-area-top">
        <div className="area-top-l">
          <h1 className="area-top-title">Account</h1> <br />
        </div>
      </section>
      <br />
      <Input
        placeholder="Enter email to search"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: 300, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleSearchClick} style={{color: "#fff", backgroundColor: "#000"}}>
        Search
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: 10, color: "#fff", backgroundColor: "#000" }}
        onClick={() => setIsModalVisible(true)} // Open the modal
      >
        Create Account
      </Button>
      <br />
      <br />
      {loading ? (
        <Spin size="large" />
      ) : fetchError ? (
        <Alert message={fetchError} type="error" />
      ) : (
        <Table columns={columns} dataSource={account} rowKey="AccountID" />
      )}
      <Modal
        title="Create Account"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Close the modal
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="FirstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="LastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="roleName"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select onChange={(value) => setRole(value)}>
              <Option value="Manager">Manager</Option>
              <Option value="Sale">Sale</Option>
              <Option value="Delivery">Delivery</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Transportation"
            label="Transportation"
            rules={[{ required: role === "Delivery", message: "Please enter transportation" }]}
          >
            <Input disabled={role !== "Delivery"} />
          </Form.Item>
          <Form.Item
            name="Birthday"
            label="Birthday"
            rules={[{ required: true, message: "Please enter Birthday" }]}
          >
            <DatePicker 
            style={{ width: "202px", height: "37px" }}
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            placeholder="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item
            name="PhoneNumber"
            label="PhoneNumber"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Address"
            label="Address"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Country"
            label="Country"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="City"
            label="City"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Province"
            label="Province"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="PostalCode"
            label="PostalCode"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Status"
            label="Status"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input value="Activate" disabled/>
          </Form.Item>

          <Form.Item label="Upload Image">
            <Upload
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button
                variant="contained"
                style={{ background: "#fff" }}
              >
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {imageBase64 && (
              <img
                src={imageBase64}
                alt="Uploaded"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;