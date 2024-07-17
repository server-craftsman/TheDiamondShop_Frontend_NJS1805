import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Adjust the path as needed
import axios from "axios";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  DatePicker,
  notification,
  Select,
  Upload,
} from "antd";

function EditProfileSales() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null); // Initial state is null

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Birthday: "",
    PhoneNumber: "",
    Address: "",
    Country: "",
    City: "",
    Province: "",
    PostalCode: "",
    Image: "",
    RoleName: "",
  });

  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        setFetchError("Token not found in AuthContext");
        setLoading(false);
        return;
      }

      console.log("Fetching user profile with token:", token);

      const response = await axios.get(
        "http://localhost:8090/features/view-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure credentials are sent
        }
      );

      console.log("Fetch response status:", response.status);

      if (response.status === 200) {
        const userData = response.data.user;
        setUserProfile(userData);
        setFormData({
          ...userData,
          Birthday: userData.Birthday ? moment(userData.Birthday) : null,
        }); // Initialize form data with moment date
        setFetchError(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setFetchError("Error fetching user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValidImageUrl = (url) => {
    const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i;
    return imageUrlPattern.test(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Image") {
      if (!isValidImageUrl(value)) {
        setImageError("Please enter a valid image URL.");
      } else {
        setImageError(null);
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) =>
    setFormData({ ...formData, Birthday: date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageError) {
      notification.error({
        message: "Invalid Image URL",
        description: "Please provide a valid image URL before submitting.",
      });
      return;
    }
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        setFetchError("Token not found in AuthContext");
        return;
      }

      const response = await axios.put(
        "http://localhost:8090/features/update-account",
        { ...formData, AccountID: userProfile.AccountID }, // Add AccountID to the formData
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
      });
    }
  };

  const handleBack = () => {
    navigate("/sale-page");
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  return (
    <div
      className="profile"
      style={{ padding: "24px" }}
      onSubmit={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Card
            cover={
              <img
                style={{
                  borderRadius: "50%",
                  width: "200px",
                  margin: "auto",
                  marginTop: "16px",
                }}
                alt="example"
                src={
                  formData.Image
                    ? formData.Image
                    : "https://static.vecteezy.com/system/resources/previews/005/267/497/original/avatar-of-a-blonde-man-in-a-classic-suit-portrait-of-a-businessman-students-partner-sales-manager-for-business-correspondence-bots-support-illustration-vector.jpg"
                }
              />
            }
          >
            <Card.Meta
              style={{ textAlign: "center" }}
              title={`${formData.FirstName} ${formData.LastName}`}
              description={`${formData.RoleName}`}
            />
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <p>
                "Welcome to Diamond Store <br />
                where elegance meets brilliance <br />
                Diamonds - Rings - Timepiesces."
              </p>
            </div>
          </Card>
        </Col>

        {/* PROFILE */}
        <Col span={16}>
          <Card title="Edit Profile">
            {userProfile ? (
              <Form layout="vertical" onSubmit={handleSubmit}>
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
                        <Select
                          name="Gender"
                          value={formData.Gender}
                          onChange={(value) =>
                            handleChange({ target: { name: "Gender", value } })
                          }
                          style={{ width: "50%" }}
                        >
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                          <Option value="Orther">Orther</Option>
                        </Select>
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
                <Row gutter={12}>
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

                  <Col span={12}>
                    <Form.Item label="Image URL">
                      <Input
                        value={formData.Image}
                        onChange={handleChange}
                        name="Image"
                        placeholder="Enter image URL"
                      />
                      {imageError && (
                        <p style={{ color: "red" }}>{imageError}</p>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    style={{ float: "right" }}
                  >
                    Update Profile
                  </Button>
                  <Button
                    type="button"
                    style={{ float: "right", marginRight: "8px" }}
                    onClick={handleBack}
                  >
                    Back to Profile
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <p>Loading...</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditProfileSales;
