
import React from 'react';
import { Link } from "react-router-dom";
import "./index.scss";
import "../login-page/index";
import logo from "../../components/assets/logo.png";

import { WarningOutlined, SmileOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useMemo, useState } from "react";
import axios from "axios";
import { notification } from "antd"



const Context = React.createContext({
  name: 'Default',
});

function RegisterForm() {
  const [api, contextHolder] = notification.useNotification();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfimPassword, setShowConfimPassword] = useState(false);
  const toggleShowConfimPassword = () => {
    setShowConfimPassword(!showPassword);
  };

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
              <h2 className="title">Registration Form</h2>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">First Name</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Last Name</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Birthday</label>
                      <div className="input-group-icon">
                        <input
                          className="input--style-4 birthday"
                          type="date"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleChange}
                        />
                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Gender</label>
                      <div className="p-t-10">
                        <label className="radio-container m-r-45">
                          Male
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="radio-container">
                          Female
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Email</label>
                      <input
                        className="input--style-4"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Phone Number</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label className="label">Address</label>
                  <input
                    className="input--style-4"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Country</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">City</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Province</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Postal Code</label>
                      <input
                        className="input--style-4"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Password</label>
                      <input
                        className="input--style-4"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="At least 8 characters long"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {showPassword ? (
                        <EyeTwoTone
                          onClick={toggleShowPassword}
                          style={{ position: 'absolute', right: '18px', cursor: 'pointer', top: '45px' }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={toggleShowPassword}
                          style={{ position: 'absolute', right: '18px', cursor: 'pointer', top: '45px' }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Confirm Password</label>
                      <input
                        className="input--style-4"
                        type={showConfimPassword ? "text" : "password"}
                        placeholder="At least 8 characters long"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {showConfimPassword ? (
                        <EyeTwoTone
                          onClick={toggleShowConfimPassword}
                          style={{ position: 'absolute', right: '18px', cursor: 'pointer', top: '45px' }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={toggleShowConfimPassword}
                          style={{ position: 'absolute', right: '18px', cursor: 'pointer', top: '45px' }}
                        />
                      )}
                    </div>
                    {message && (
                      <p className="message">
                        <WarningOutlined /> {message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-t-15">
                  <button className="btn btn--radius-2 btn--blue" type="submit" >
                    Register
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
