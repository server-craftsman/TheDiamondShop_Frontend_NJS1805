import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import "../login-page/index";
import logo from "../../assets/logo.png";
import VerifyMessage from "./message/index";
import {
  WarningOutlined,
  SmileOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ClockCircleOutlined
} from "@ant-design/icons";

import axios from "axios";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import { Button, colors } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const Context = React.createContext({
  name: "Default",
});

function RegisterForm() {
  const [api, contextHolder] = notification.useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for Modal visibility
  const [checkboxChecked, setCheckboxChecked] = useState(false); // State for checkbox

  const openNotification = () => {
    api.open({
      message: "Your Account is processing.",
      description:
        "Please check your Email to verify your account!",
      icon: <ClockCircleOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async (values) => {
    const { confirmPassword, Birthday, ...data } = values;
    if (values.Password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (Birthday) {
      data.Birthday = moment(Birthday).format("YYYY-MM-DD");
    }

    // Attach the base64-encoded image to the form data
    data.Image = base64Image;

    try {
      console.log("Submitting form data:", data);
      const response = await axios.post(
        "http://localhost:8090/auth/register",
        data
      );
      console.log("Response:", response); // Log the response for debugging
      if (response.status === 200) {
        openNotification();
        setTimeout(() => {
          window.location.href = "/verify-message";
        }, 2000);
      }
    } catch (error) {
      //console.error("Error response:", error.response); // Log the error response for debugging
      if (error.response && error.response.data) {
        // Handle duplicate email error
        if (
          error.response.status === 400 &&
          error.response.data.error === "Email already exists."
        ) {
          notification.error({
            message: "Duplicate Email",
            description:
              "This email is already registered. Please use a different email.",
          });
        } else {
          notification.error({
            message: "Registration Failed",
            description:
              error.response.data.error ||
              "Registration failed. Please try again.",
          });
        }
      } else {
        notification.error({
          message: "Registration Failed",
          description: "Registration failed. Please try again.",
        });
      }
    }
  };

  const disabledDate = (current) => {
    const startDate = moment().subtract(100, "years");
    const endDate = moment().endOf("day");
    return current && (current.isBefore(startDate) || current.isAfter(endDate));
  };

  const handlePreviewImage = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
        setBase64Image(reader.result);
      };
    }
    return false; // Prevent Upload component from uploading the file immediately
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //==============================Validate============================//
  const validateEmail = (rule, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject("Please enter a valid email address");
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = (rule, value) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      return Promise.reject("Please enter a valid phone number (10 digits)");
    }
    return Promise.resolve();
  };

  //==============================Validate============================//

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
                    className="form-item name"
                    label="First Name"
                    name="FirstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>

                  <Form.Item
                    className="name"
                    label="Last Name"
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    className="form-item name"
                    label="Birthday"
                    name="Birthday"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birthday!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "202px", height: "37px" }}
                      format="YYYY-MM-DD"
                      disabledDate={disabledDate}
                      placeholder="YYYY-MM-DD"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="Gender"
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
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                      type: "email",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="abc@gmail.com" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="PhoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },

                    { validator: validatePhoneNumber },
                  ]}
                >
                  <Input placeholder="0946xxx636" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="Address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input placeholder="Street abc, city Y" />
                </Form.Item>
                <Row>
                  <Form.Item
                    className="form-item name"
                    label="Country"
                    name="Country"
                    rules={[
                      { required: true, message: "Please input your country!" },
                    ]}
                  >
                    <Input placeholder="Your country" />
                  </Form.Item>

                  <Form.Item
                    className="name"
                    label="City"
                    name="City"
                    rules={[
                      { required: true, message: "Please input your city!" },
                    ]}
                  >
                    <Input placeholder="Your city" />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    className="form-item name"
                    label="Province"
                    name="Province"
                    rules={[
                      {
                        required: true,
                        message: "Please input your province!",
                      },
                    ]}
                  >
                    <Input placeholder="Your province" />
                  </Form.Item>

                  <Form.Item
                    className="name"
                    label="Postal Code"
                    name="PostalCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input your postal code!",
                      },
                    ]}
                  >
                    <Input placeholder="Your postal code" />
                  </Form.Item>
                </Row>

                <Form.Item
                  name="Image"
                  label="Image Upload"
                  rules={[
                    { required: true, message: "Please upload an image!" },
                  ]}
                  style={{ marginBottom: "-70px" }}
                >
                  <Upload
                    listType="picture"
                    maxCount={1}
                    beforeUpload={(Image) => handlePreviewImage(Image)}
                    showUploadList={false} // Hide the default upload list
                  >
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          marginTop: "10px",
                          maxWidth: "200px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    <Button
                      variant="contained"
                      style={{ background: "#fff", marginBottom: "105px" }}
                    >
                      <AddPhotoAlternateIcon
                        style={{ fontSize: "100px", color: "#000" }}
                      />
                    </Button>
                  </Upload>
                </Form.Item>

                <Row gutter={16}>
                  <Form.Item
                    className="form-item"
                    name="Password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                        min: 8,
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    className="form-item"
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["Password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                        min: 8,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("Password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "Password"}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Row>

                {message && (
                  <p className="message">
                    <WarningOutlined /> {message}
                  </p>
                )}

                {/* <Form.Item>
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={handleCheckboxChange}
                    style={{ width: "20px", height: "20px" }}
                    
                  />
                  <span style={{ marginLeft: "10px", fontSize: "20px", paddingBottom: "50px" }}>
                    I agree to the{" "}
                    <a onClick={showModal} style={{ color: "#1890ff" }}>
                      terms and conditions
                    </a>
                  </span>
                </Form.Item> */}
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please tick the checkbox to register!",
                    },
                  ]}
                >
                  <div
                    style={{
                      color: "red",
                      fontSize: "20px",
                      marginRight: "5px",
                    }}
                  >
                    *
                  </div>
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={handleCheckboxChange}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginBottom: "10px",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      paddingBottom: "50px",
                    }}
                  >
                    I agree to the{" "}
                    <a onClick={showModal} style={{ color: "#1890ff" }}>
                      terms and conditions
                    </a>
                  </span>
                </Form.Item>

                <Form.Item className="p-t-15">
                  <Button
                    className="btn btn--radius-2 btn--blue"
                    type="primary"
                    htmlType="submit"
                    disabled={!checkboxChecked} // Disable button based on checkbox status
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Diamond Shop Warranty Policy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <h3>1. Applicable Subjects</h3>
          <p>
            This warranty policy applies to all products purchased at Diamond
            Shop.
          </p>
          <h3>2. Warranty Conditions</h3>
          <ul>
            <li>
              All products must have a purchase receipt from Diamond Shop.
            </li>
            <li>The product must be within the specified warranty period.</li>
            <li>
              The product must have intact warranty seals and serial numbers,
              not torn or altered.
            </li>
            <li>
              The product must not be damaged due to user error such as drops,
              impacts, or exposure to chemicals.
            </li>
            <li>
              The store will warranty the entire product when the customer
              requests warranty service for the product.
            </li>
          </ul>
          <h3>3. Warranty Period</h3>
          <ul>
            <li>Diamond products: 24 months</li>
            <li>Wedding rings: 12 months</li>
            <li>Diamond watches: 24 months</li>
            <li>Diamond jewelry: 12 months</li>
          </ul>
          <h3>4. Warranty Benefits</h3>
          <ul>
            <li>Free repair of technical defects of the product.</li>
            <li>
              For products that cannot be repaired, Diamond Shop will replace
              them with an equivalent product or refund the money.
            </li>
          </ul>
          <h3>5. Warranty Procedure</h3>
          <ol>
            <li>
              Customers bring the product to the Diamond Shop along with the
              purchase receipt.
            </li>
            <li>
              Diamond Shop staff will check and determine the warranty
              conditions.
            </li>
            <li>
              If the product meets the warranty conditions, the staff will
              proceed with the warranty steps as per the regulations.
            </li>
          </ol>
          <h3>6. Warranty for Orders with Multiple Products</h3>
          <ul>
            <li>
              For orders that include multiple products, all products in the
              order must be fully warranted according to this policy.
            </li>
            <li>
              If one product in the order does not meet the warranty conditions,
              Diamond Shop will notify the customer and provide an appropriate
              solution.
            </li>
          </ul>
          <h3>7. Contact</h3>
          <p>For any questions and warranty requests, please contact:</p>
          <address>
            <strong>Diamond Shop</strong>
            <br />
            Address: Nha Van Hoa Sinh Vien
            <br />
            Phone: (208) 746-2649
            <br />
            Email: thediamondshop@gmail.com
            <br />
          </address>
        </div>
      </Modal>
    </div>
  );
}

export default RegisterForm;
