import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./index.scss";
import "../login-page/index";
import logo from "../../assets/logo.png";

import { WarningOutlined, SmileOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import axios from "axios";
import { Button, DatePicker, Form, Input, Radio, Row, notification } from "antd";
import moment from 'moment';

const Context = React.createContext({
  name: 'Default',
});

function RegisterForm() {
  const [api, contextHolder] = notification.useNotification();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openNotification = () => {
    api.open({
      message: 'Registration Successful',
      description: 'You have registered successfully. Please log in to continue.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async (values) => {
    const { confirmPassword, ...data } = values;
    if (values.password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      console.log("Submitting form data:", data);
      const response = await axios.post(
        "http://localhost:8090/auth/register",
        data
      );
      if (response.status === 201) {
        openNotification();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        notification.error({
          message: 'Registration Failed',
          description: response.data.message || 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        notification.error({
          message: 'Registration Failed',
          description: error.response.data.message || 'Registration failed. Please try again.',
        });
      } else {
        notification.error({
          message: 'Registration Failed',
          description: 'Registration failed. Please try again.',
        });
      }
    }
  };

  const disabledDate = (current) => {
    const startYear = 1960;
    const endYear = moment().year();
    return current && (current.year() < startYear || current.year() > endYear);
  };


  return (
    <div className="register-form">
      {contextHolder}
      <div className="logo-bg">
        <img width={550} src={logo} alt="" />
      </div>

      <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
          <div className="card card-4">
            <div className="card-body">
              <Form layout="vertical" onFinish={handleSubmit}>
                <h1 className="title">Registration Form</h1>
                <Row>
                  <Form.Item
                    className='form-item name'
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className='name'
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    className='form-item name'
                    label="Birthday"
                    name="birthday"
                    rules={[{ required: true, message: 'Please select your birthday!' }]}
                  >
                    <DatePicker
                      style={{ width: "202px", height: "37px" }}
                      format="YYYY-MM-DD"
                      disabledDate={disabledDate}
                      placeholder='1960-MM-DD'
                    />

                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="gender"
                    style={{ marginTop: "5px" }}
                  >
                    <Radio.Group>
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Row>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input />
                </Form.Item>
                <Row>
                  <Form.Item
                    className='form-item name'
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please input your country!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className='name'
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input your city!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    className='form-item name'
                    label="Province"
                    name="province"
                    rules={[{ required: true, message: 'Please input your province!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className='name'
                    label="Postal Code"
                    name="postalCode"
                    rules={[{ required: true, message: 'Please input your postal code!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    className='form-item'
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!', min: 8 }]}
                  >
                    <Input.Password
                      type={showPassword ? "text" : "password"}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      { required: true, message: 'Please confirm your password!', min: 8 },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      type={showConfirmPassword ? "text" : "password"}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Row>

                {message && (
                  <p className="message">
                    <WarningOutlined /> {message}
                  </p>
                )}

                <Form.Item className='p-t-15'>
                  <Button className='btn btn--radius-2 btn--blue' type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
