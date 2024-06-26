
import React from 'react';
import { Link } from "react-router-dom";
import "./index.scss";
import "../login-page/index";
import logo from "../../assets/logo.png";

import { WarningOutlined, SmileOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useMemo, useState } from "react";
import axios from "axios";
import { Button, DatePicker, Form, Input, Radio, Row, notification } from "antd"



const Context = React.createContext({
  name: 'Default',
});

function RegisterForm() {
  const [api, contextHolder] = notification.useNotification();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfimPassword] = useState(false);


  const openNotification = () => {
    api.open({
      message: 'Registration Successful',
      description:
        'You have registered successfully. Please log in to continue.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "Male",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    city: "",
    province: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...data } = formData;
    if (formData.password !== confirmPassword) {
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
        }, 3000);
      } else {
        alert(response.data.status);
      }
    } catch (error) {

      // console.error("There was an error registering!", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {

        alert("Registration failed. Please try again.");
      }
    }
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

              <Form

                layout="vertical"
                onFinish={handleSubmit}
              // initialValues={formData}
              >
                <h1 className="title">Registration Form</h1>
                <Row>

                  <Form.Item
                    className='form-item name'
                    label="First Name"
                    name="firstName"

                    rules={[{ required: true, message: 'Please input your first name!' }]}

                  >
                    <Input onChange={handleChange} value={formData.firstName} />
                  </Form.Item>

                  <Form.Item
                    className='name'
                    label="Last Name"
                    name="lastName"

                    rules={[{ required: true, message: 'Please input your last name!' }]}

                  >
                    <Input onChange={handleChange} value={formData.lastName} />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    className='form-item name'
                    label="Birthday"
                    name="birthday"

                    rules={[{ required: true, message: 'Please select your birthday!' }]}
                    onChange={handleChange}
                  >
                    <DatePicker onChange={handleChange} value={formData.birthday} />
                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="gender"
                    style={{marginTop: "5px"}}
                  >
                    <Radio.Group onChange={handleChange}>
                      <Radio value="Male" checked={formData.gender === "Male"} onChange={handleChange} >Male</Radio>
                      <Radio value="Female" checked={formData.gender === "Female"} onChange={handleChange} >Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Row>

                <Form.Item
                  label="Email"
                  name="email"

                  rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                  <Input onChange={handleChange} value={formData.email} />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"

                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input onChange={handleChange} value={formData.phoneNumber} />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"

                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input onChange={handleChange}
                    value={formData.address} />
                </Form.Item>
                <Row>
                  <Form.Item
                    className='form-item name'
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please input your country!' }]}
                  >
                    <Input onChange={handleChange}
                      value={formData.country} />
                  </Form.Item>

                  <Form.Item
                    className='name'
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input your city!' }]}
                  >
                    <Input onChange={handleChange}
                      value={formData.city} />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item

                    className='form-item name'
                    label="Province"
                    name="province"
                    value={formData.province}
                    rules={[{ required: true, message: 'Please input your province!' }]}
                  >
                    <Input onChange={handleChange} />
                  </Form.Item>

                  <Form.Item
                    className='name'
                    label="Postal Code"
                    name="postalCode"
                    rules={[{ required: true, message: 'Please input your postal code!' }]}
                  >
                    <Input onChange={handleChange}
                      value={formData.postalCode} />
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
                      value={formData.password}
                      onChange={handleChange}
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your password!', min: 8 }]}
                  >
                    <Input.Password
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Row>
                {message && (
                  <p className="message">
                    <WarningOutlined /> {message}
                  </p>
                )}

                <Form.Item className='p-t-15'>
                  <Button className='btn btn--radius-2 btn--blue' type="submit">
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
