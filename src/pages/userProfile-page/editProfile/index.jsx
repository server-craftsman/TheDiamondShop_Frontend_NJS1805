import React, { useEffect, useState } from "react";
import "../userProfile-page/index.scss";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Avatar,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";

function UserProfile() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Birthday: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Country: "",
    City: "",
    Province: "",
    PostalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => setFormData({ ...formData, Birthday: date });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/features/customers",
        { formData }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  }, []);

  return (
    <div className="profile" style={{ padding: "24px" }} onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://ttol.vietnamnetjsc.vn/images/2023/08/13/19/42/xa-hoi.jpg"
              />
            }
          >
            <Card.Meta
              title={`${formData.FirstName} ${formData.LastName}`}
              description={`${formData.FirstName} ${formData.LastName}`}
            />
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <p>
                "Lamborghini Mercy <br />
                Your chick she so thirsty <br />
                I'm in that two seat Lambo"
              </p>
            </div>
          </Card>
        </Col>

        {/* PROFILE */}
        <Col span={16}>
          <Card title="Edit Profile">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      value={formData.FirstName}
                      onChange={handleChange}
                      name="FirstName"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      value={formData.LastName}
                      onChange={handleChange}
                      name="LastName"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form>
                    <Form.Item label="Gender">
                      <select
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                      >
                        <option value="">Choose Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="LGBT">LGBT</option>
                        <option value="LGBTQ+">LGBTQ+</option>
                      </select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={12}>
                  <Form.Item label="Birthday">
                    <DatePicker
                      value={formData.Birthday}
                      onChange={handleDateChange}
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input
                      type="email"
                      value={formData.Email}
                      onChange={handleChange}
                      name="Email"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <Input
                      type="phone"
                      value={formData.PhoneNumber}
                      onChange={handleChange}
                      name="PhoneNumber"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Address">
                    <Input
                      value={formData.Address}
                      onChange={handleChange}
                      name="Address"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Country">
                    <Input
                      value={formData.Country}
                      onChange={handleChange}
                      name="Country"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="City">
                    <Input
                      value={formData.City}
                      onChange={handleChange}
                      name="City"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Province">
                    <Input
                      value={formData.Province}
                      onChange={handleChange}
                      name="Province"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Postal Code">
                    <Input
                      type="number"
                      value={formData.PostalCode}
                      onChange={handleChange}
                      name="PostalCode"
                    />
                  </Form.Item>
                </Col>

              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Image">
                    <Input.TextArea
                      rows={4}
                      defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      placeholder="Here can be your description"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="submit"

                  style={{ float: "right" }}
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
