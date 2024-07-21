// import React, { useContext, useEffect, useState } from 'react';
// import { Alert, Button, DatePicker, Form, Input, Modal, Select, Spin, Table, message } from 'antd';
// import axios from 'axios';
// import '../account-page/index.scss';
// import { AuthContext } from '../../AuthContext';

// const { Option } = Select;

// const Account = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [account, setAccount] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { user } = useContext(AuthContext);
//   const [fetchError, setFetchError] = useState(null);
//   const [email, setEmail] = useState('');

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleAddAccount = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:8090/auth/createAccount', {
//         ...values,
//         birthday: values.birthday.format('YYYY-MM-DD'),
//       });

//       const { data } = response;
//       message.success(data.message);
//       setIsModalVisible(false);

//       // Optionally, you might handle token storage or redirection here
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         message.error(error.response.data);
//       } else {
//         message.error('An error occurred. Please try again.');
//       }
//       setError('Failed to create account. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = user?.token;
//         if (!token) {
//           console.error('Token not found in AuthContext');
//           return;
//         }

//         const response = await axios.get('http://localhost:8090/auth/account', {
//           headers: {
//             'Authorization': `Bearer ${user?.token}`,
//           },
//         });

//         if (response.status === 200) {
//           setAccount(response.data.account);
//         } else {
//           throw new Error(`Failed to fetch account details. Status: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('Error fetching account:', error.message);
//         setFetchError('Error fetching account details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const columns = [
//     { title: 'Account ID', dataIndex: 'AccountID', key: 'AccountID' },
//     { title: 'First Name', dataIndex: 'FirstName', key: 'FirstName' },
//     { title: 'Last Name', dataIndex: 'LastName', key: 'LastName' },
//     { title: 'Gender', dataIndex: 'Gender', key: 'Gender' },
//     { title: 'Birthday', dataIndex: 'Birthday', key: 'Birthday' },
//     { title: 'Email', dataIndex: 'Email', key: 'Email' },
//     { title: 'Password', dataIndex: 'Password', key: 'Password' },
//     { title: 'Phone Number', dataIndex: 'PhoneNumber', key: 'PhoneNumber' },
//     { title: 'Address', dataIndex: 'Address', key: 'Address' },
//     { title: 'Country', dataIndex: 'Country', key: 'Country' },
//     { title: 'City', dataIndex: 'City', key: 'City' },
//     { title: 'Province', dataIndex: 'Province', key: 'Province' },
//     { title: 'Postal Code', dataIndex: 'PostalCode', key: 'PostalCode' },
//     { title: 'RoleID', dataIndex: 'RoleID', key: 'RoleID' },
//     { title: 'Status', dataIndex: 'Status', key: 'Status' },
//   ];

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const token = user?.token;
//       if (!token) {
//         console.error('Token not found in AuthContext');
//         return;
//       }

//       const response = await axios.get(`http://localhost:8090/auth/account/${email}`, {
//         headers: {
//           'Authorization': `Bearer ${user?.token}`,
//         },
//       });

//       if (response.status === 200) {
//         const fetchedAccount = Array.isArray(response.data.account) ? response.data.account : [];
//         setAccount(fetchedAccount);
//       } else {
//         throw new Error(`Failed to fetch account details. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error fetching account:', error.message);
//       setFetchError('Error fetching account details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='account'>
//       <section className="content-area-top">
//         <div className="area-top-l">
//           <h1 className="area-top-title">Account</h1> <br />
//         </div>
//       </section>
//       <br />
//       <Button type="primary" onClick={showModal}>
//         Add New Account
//       </Button>
//       <Modal
//         title="Create New Account"
//         open={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           name="accountCreation"
//           onFinish={handleAddAccount}
//           initialValues={{ gender: 'Male', roleName: 'Customer' }}
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//         >
//           <Form.Item
//             label="First Name"
//             name="firstName"
//             rules={[{ required: true, message: 'Please input your first name!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Last Name"
//             name="lastName"
//             rules={[{ required: true, message: 'Please input your last name!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Gender"
//             name="gender"
//             rules={[{ required: true, message: 'Please select your gender!' }]}
//           >
//             <Select>
//               <Option value="Male">Male</Option>
//               <Option value="Female">Female</Option>
//               <Option value="Other">Other</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Birthday"
//             name="birthday"
//             rules={[{ required: true, message: 'Please select your birthday!' }]}
//           >
//             <DatePicker />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Phone Number"
//             name="phoneNumber"
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Address"
//             name="address"
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Country"
//             name="country"
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="City"
//             name="city"
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Province"
//             name="province"
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Postal Code"
//             name="postalCode"
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Transportation"
//             name="transportation"
//             rules={[{ required: true, message: 'Please input transportation!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Role Name"
//             name="roleName"
//             rules={[{ required: true, message: 'Please input role name!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit">
//               Create Account
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <br />
//       <br />
//       <Input
//         placeholder="Enter email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ width: 200, marginRight: 10 }}
//       />
//       <Button type="primary" onClick={handleSearch} disabled={!email}>
//         Search
//       </Button>
//       <br />
//       {loading ? (
//         <Spin size="large" />
//       ) : fetchError ? (
//         <Alert message={fetchError} type="error" />
//       ) : (
//         <Table columns={columns} dataSource={account || []} rowKey="AccountID" />
//       )}
//     </div>
//   );
// };

// export default Account;

// import React, { useContext, useEffect, useState } from 'react';
// import { Alert, Spin, Table } from 'antd';
// import axios from 'axios';
// import '../account-page/index.scss';
// import { AuthContext } from '../../AuthContext';

// const Account = () => {
//   const [account, setAccount] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const { user } = useContext(AuthContext);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const token = user?.token;
//       if (!token) {
//         console.error('Token not found in AuthContext');
//         return;
//       }

//       const response = await axios.get('http://localhost:8090/auth/account', {
//         headers: {
//           'Authorization': `Bearer ${user?.token}`,
//         },
//       });

//       if (response.status === 200) {
//         setAccount(response.data.account);
//       } else {
//         throw new Error(`Failed to fetch account details. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error fetching account:', error.message);
//       setFetchError('Error fetching account details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, [user]);

//   const columns = [
//     { title: 'Account ID', dataIndex: 'AccountID', key: 'AccountID' },
//     { title: 'First Name', dataIndex: 'FirstName', key: 'FirstName' },
//     { title: 'Last Name', dataIndex: 'LastName', key: 'LastName' },
//     { title: 'Gender', dataIndex: 'Gender', key: 'Gender' },
//     { title: 'Email', dataIndex: 'Email', key: 'Email' },
//     { title: 'Password', dataIndex: 'Password', key: 'Password' },
//     { title: 'Role Name', dataIndex: 'RoleName', key: 'RoleName' },
//     { title: 'Status', dataIndex: 'Status', key: 'Status' },
//   ];

//   return (
//     <div className='account'>
//       <section className="content-area-top">
//         <div className="area-top-l">
//           <h1 className="area-top-title">Account</h1> <br />
//         </div>
//       </section>
//       <br />
//       {loading ? (
//         <Spin size="large" />
//       ) : fetchError ? (
//         <Alert message={fetchError} type="error" />
//       ) : (
//         <Table columns={columns} dataSource={account || []} rowKey="AccountID" />
//       )}
//     </div>
//   );
// };

// export default Account;
// import React, { useContext, useEffect, useState } from 'react';
// import { Alert, Spin, Table, Input, Button, Select, Form } from 'antd';
// import axios from 'axios';
// import '../account-page/index.scss';
// import { AuthContext } from '../../AuthContext';
// const { Option } = Select;
// const Account = () => {
//   const [account, setAccount] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [email, setEmail] = useState('');
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
//           'Authorization': `Bearer ${user?.token}`,
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
//           'Authorization': `Bearer ${user?.token}`,
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
//           'Authorization': `Bearer ${user?.token}`,
//         },
//       });

//       if (response.status === 200 && response.data.token) {
//         form.resetFields();
//         alert('Account created successfully');
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

//   const handleRoleChange = (value) => {
//     if (value === 'Delivery') {
//       form.setFieldsValue({ Transportation: '' });
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
//     { title: 'Actions',
//        key: 'actions',
//       render: (text, record) => (
//         <Button>View Details</Button>
//         ),
//         },
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
//       <br /><br />
//       {loading ? (
//         <Spin size="large" />
//       ) : fetchError ? (
//         <Alert message={fetchError} type="error" />
//       ) : (
//         <Table columns={columns} dataSource={account} rowKey="AccountID" />
//       )}
//     </div>
//   );
// };

// export default Account;

import React, { useContext, useEffect, useState } from 'react';
import { Alert, Spin, Table, Input, Button, Select, Form, Modal, DatePicker } from 'antd';
import axios from 'axios';
import '../account-page/index.scss';
import { AuthContext } from '../../AuthContext';

const { Option } = Select;

const Account = () => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      fetchAccount();
    }
  }, [user]);

  const fetchAccount = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = user?.token;
      if (!token) {
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await axios.get('http://localhost:8090/auth/account', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.status) {
        setAccount(response.data.account);
      } else {
        throw new Error(response.data.message || `Failed to fetch account details. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching account:', error.message);
      setFetchError('Error fetching account details. Please try again.');
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
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await axios.get(`http://localhost:8090/auth/account/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.status) {
        setAccount([response.data.account]);
      } else {
        throw new Error(response.data.message || `Failed to fetch account details. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching account:', error.message);
      setFetchError('Error fetching account details. Please try again.');
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
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await axios.post('http://localhost:8090/features/add-account-with-role', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.token) {
        form.resetFields();
        setIsModalVisible(false); // Close the modal
        alert('Account created successfully');
        fetchAccount(); // Refresh the account list after creation
      } else {
        throw new Error(response.data.message || `Failed to create account. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating account:', error.message);
      setFetchError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // const handleRoleChange = (value) => {
  //   if (value !== 'Delivery') {
  //     form.setFieldsValue({ Transportation: '' }); // Clear Transportation field when not Delivery
  //   }
  // };

  const handleValuesChange = (changedValues) => {
    if (changedValues.roleName != 'Delivery' && changedValues.roleName == 'Manager' && changedValues.roleName == 'Sale') {
      form.setFieldsValue({ Transportation: '' }); // Clear the Transportation field if role is Delivery
    }
  };

  const columns = [
    { title: 'Account ID', dataIndex: 'AccountID', key: 'AccountID' },
    { title: 'First Name', dataIndex: 'FirstName', key: 'FirstName' },
    { title: 'Last Name', dataIndex: 'LastName', key: 'LastName' },
    { title: 'Gender', dataIndex: 'Gender', key: 'Gender' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Password', dataIndex: 'Password', key: 'Password' },
    { title: 'Role Name', dataIndex: 'RoleName', key: 'RoleName' },
    { title: 'Status', dataIndex: 'Status', key: 'Status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button>View Details</Button>
      ),
    },
  ];

  return (
    <div className='account'>
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
      <Button type="primary" onClick={handleSearchClick}>Search</Button>
      <Button 
        type="primary" 
        style={{ marginLeft: 10 }} 
        onClick={() => setIsModalVisible(true)} // Open the modal
      >
        Create Account
      </Button>
      <br /><br />
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
          onValuesChange={handleValuesChange}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item name="FirstName" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="LastName" label="Last Name" rules={[{ required: true, message: 'Please enter last name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Gender" label="Gender" rules={[{ required: true, message: 'Please select gender' }]}>
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password />
          </Form.Item>
           <Form.Item
          name="roleName"
        label="Role"
        rules={[{ required: true, message: 'Please select a role' }]}
      >
        <Select>
          <Option value="Manager">Manager</Option>
          <Option value="Sale">Sale</Option>
          <Option value="Delivery">Delivery</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="Transportation"
        label="Transportation"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              const roleName = getFieldValue('value');
              if (roleName != 'Delivery' || !value) {
                return Promise.reject(new Error('Transportation is required for Delivery'));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          disabled={form.getFieldValue('value') === 'Delivery' && form.getFieldValue('value') === 'Sale' && form.getFieldValue('value') === 'Manager'}
        />
      </Form.Item>
          <Form.Item name="Birthday" label="Birthday" rules={[{ required: true, message: 'Please enter email' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="PhoneNumber" label="PhoneNumber" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Address" label="Address" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Country" label="Country" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="City" label="City" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Province" label="Province" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="PostalCode" label="PostalCode" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Status" label="Status" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Image" label="Image" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Create Account</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;
