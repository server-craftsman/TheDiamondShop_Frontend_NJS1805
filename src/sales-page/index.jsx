import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext"; // Adjust the path as needed
import axios from "axios";
import { Col, Row, Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
const SalePage = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
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
    RoleName: "",
    Image: "",
  });
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

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
        setUserProfile(response.data.user); // Assuming 'user' key in response contains profile data
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

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  if (loading) {
    return <p>Loading...</p>; // or a spinner component
  }

  return (
    <div className="profile" style={{ padding: "24px" }}>
      {fetchError && <p style={{ color: "red" }}>Error: {fetchError}</p>}
      <Row gutter={16} style={{ display: "flex", alignItems: "stretch" }}>
        <Col span={8} style={{ display: "flex" }}>
          <Card
            className="form-edit"
            style={{ flex: 1 }}
            cover={
              <img
                style={{
                  borderRadius: "50%",
                  width: "200px",
                  margin: "auto",
                  marginTop: "16px",
                }}
                alt="User"
                src={
                  userProfile.Image
                    ? userProfile.Image
                    : "https://img.freepik.com/premium-vector/avatar-male-manager-office-worker_805465-3.jpg"
                }
              />
            }
          >
            <Card.Meta
              title={`${userProfile.FirstName} ${userProfile.LastName}`}
              description={`${userProfile.RoleName}`}
              style={{ textAlign: "center" }}
            />
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              {/* <p>
                Lamborghini Mercy <br />
                Your chick she so thirsty <br />
                I`m in that two seat Lambo
              </p> */}
              <Link to="/profileSale-edit">
                <Button type="primary" style={{ marginTop: "16px" }}>
                  Update Profile
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Card title="View Profile" style={{ flex: 1 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="First Name">
                {userProfile.FirstName}
              </Descriptions.Item>
              <Descriptions.Item label="Last Name">
                {userProfile.LastName}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {userProfile.Gender}
              </Descriptions.Item>
              <Descriptions.Item label="Birthday">
                {formatDate(userProfile.Birthday)}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {userProfile.Email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {userProfile.PhoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {userProfile.Address}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {userProfile.Country}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {userProfile.City}
              </Descriptions.Item>
              <Descriptions.Item label="Province">
                {userProfile.Province}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {userProfile.PostalCode}
              </Descriptions.Item>
              <Descriptions.Item label="Role Name">
                {userProfile.RoleName}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalePage;
