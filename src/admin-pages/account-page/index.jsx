import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, DatePicker, Form, Input, Modal, Select, Spin, Table, message } from 'antd';
import axios from 'axios';
import '../account-page/index.scss';
import { AuthContext } from '../../AuthContext';

const { Option } = Select;

const Account = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const [fetchError, setFetchError] = useState(null);
  const [email, setEmail] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {

      const response = await axios.post('http://localhost:8090/auth/createAccount', {
        ...values,
        birthday: values.birthday.format('YYYY-MM-DD'),

      });
      
      const { data } = response;
      message.success(data.message);
      setIsModalVisible(false);
      
      // Optionally, you might handle token storage or redirection here
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data);
      } else {
        message.error('An error occurred. Please try again.');
      }
      setError('Failed to create account. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = user?.token;
        if (!token) {
          console.error('Token not found in AuthContext');
          return;
        }

        const response = await axios.get('http://localhost:8090/auth/account', {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });

        if (response.status === 200) {
          setAccount(response.data.account);
        } else {
          throw new Error(`Failed to fetch account details. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching account:', error.message);
        setFetchError('Error fetching account details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const columns = [
    { title: 'Account ID', dataIndex: 'AccountID', key: 'AccountID' },
    { title: 'First Name', dataIndex: 'FirstName', key: 'FirstName' },
    { title: 'Last Name', dataIndex: 'LastName', key: 'LastName' },
    { title: 'Gender', dataIndex: 'Gender', key: 'Gender' },
    { title: 'Birthday', dataIndex: 'Birthday', key: 'Birthday' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Password', dataIndex: 'Password', key: 'Password' },
    { title: 'Phone Number', dataIndex: 'PhoneNumber', key: 'PhoneNumber' },
    { title: 'Address', dataIndex: 'Address', key: 'Address' },
    { title: 'Country', dataIndex: 'Country', key: 'Country' },
    { title: 'City', dataIndex: 'City', key: 'City' },
    { title: 'Province', dataIndex: 'Province', key: 'Province' },
    { title: 'Postal Code', dataIndex: 'PostalCode', key: 'PostalCode' },
    { title: 'RoleID', dataIndex: 'RoleID', key: 'RoleID' },
    { title: 'Status', dataIndex: 'Status', key: 'Status' },
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      if (!token) {
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await axios.get(`http://localhost:8090/auth/account/${email}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });

      if (response.status === 200) {
        setAccount(response.data.account || []);
      } else {
        throw new Error(`Failed to fetch account details. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching account:', error.message);
      setFetchError('Error fetching account details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='account'>
      <section className="content-area-top">
        <div className="area-top-l">
          <h1 className="area-top-title">Account</h1> <br />
        </div>
      </section>
      <br />
      <Button type="primary" onClick={showModal}>
        Add New Account
      </Button>
      <Modal
        title="Create New Account"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="accountCreation"
          onFinish={onFinish}
          initialValues={{ gender: 'Male', roleName: 'Customer' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: 'Please select your birthday!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Province"
            name="province"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Postal Code"
            name="postalCode"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Transportation"
            name="transportation"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role Name"
            name="roleName"
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Role"
            name="roleName"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Customer">Customer</Option>
              <Option value="Sale">Sale Staff</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Delivery">Delivery</Option>
            </Select>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <br />
      <br />
      <Input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleSearch} disabled={!email}>
        Search
      </Button>
      <br />
      {loading ? (
        <Spin size="large" />
      ) : fetchError ? (
        <Alert message={fetchError} type="error" />
      ) : (
        <Table columns={columns} dataSource={account || []} rowKey="AccountID" />
      )}
    </div>
  );
};

export default Account;
