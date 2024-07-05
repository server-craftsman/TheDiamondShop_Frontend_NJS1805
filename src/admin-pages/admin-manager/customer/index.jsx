import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react'

function Customer() {

    const [isModalVisible, setIsModalVisible] = useState(false);

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
      message.success('User registered successfully');
      console.log('Token:', response.data.token);
      setIsModalVisible(false);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data);
      } else {
        message.error('An error occurred');
      }
    }
  };

  return (
    <div>
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
          initialValues={{ gender: 'male', roleName: 'user' }}
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
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="other">Other</Option>
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
            rules={[{ required: true, message: 'Please input your email!' }]}
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
          </Form.Item>

          {/* <Form.Item
            label="Transportation"
            name="transportation"
            rules={[{ required: true, message: 'Please select a mode of transportation!' }]}
          >
            <Select>
              <Option value="car">Car</Option>
              <Option value="bike">Bike</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Customer;
