import React, { useState, useEffect, useContext } from "react";
import "../manager-home-page/index.scss"
import { AuthContext } from "../../AuthContext"; // Adjust the path as needed
import axios from "axios";
import { Col, Form, Input, Row, Button, Card } from "antd";
import { Link } from "react-router-dom";

const ManagerPage = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    Birthday: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Country: '',
    City: '',
    Province: '',
    PostalCode: '',
    RoleName: '',
    Image: '',
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
        console.error('Token not found in AuthContext');
        setFetchError('Token not found in AuthContext');
        setLoading(false);
        return;
      }

      console.log('Fetching user profile with token:', token);

      const response = await axios.get('http://localhost:8090/features/view-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensure credentials are sent
      });

      console.log('Fetch response status:', response.status);

      if (response.status === 200) {
        setUserProfile(response.data.user); // Assuming 'user' key in response contains profile data
        setFetchError(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      setFetchError('Error fetching user profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (


    <div className="profile" style={{ padding: "24px" }} >
      {fetchError && <p style={{ color: 'red' }}>Error: {fetchError}</p>}
      <Row gutter={16}>
        <Col span={8}>
          <Card className="form-edit"
            cover={
              <img style={{ borderRadius: "50%", width: "200px", margin: "auto", marginTop: "16px" }}
                alt="User"
                src={userProfile.Image ? userProfile.Image : "https://img.freepik.com/premium-vector/avatar-male-manager-office-worker_805465-3.jpg"}
              />
            }
          >

            <Card.Meta style={{ textAlign: "center" }}
              title={`${userProfile.FirstName} ${userProfile.LastName}`}
              description={`${userProfile.RoleName}`}
            />
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <p>
                "Lamborghini Mercy <br />
                Your chick she so thirsty <br />
                I'm in that two seat Lambo"
              </p>

              <Link to="/profileManager-edit">
                <Button
                  type="submit"

                  style={{ alignItems: "center", marginTop: "16px" }}
                >
                  Update Profile
                </Button></Link>

            </div>


          </Card>
        </Col>

        {/* PROFILE */}
        <Col span={16}>
          <Card title="View Profile">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      value={userProfile.FirstName}
                      name="FirstName"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      value={userProfile.LastName}
                      name="LastName"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form>
                    <Form.Item label="Gender">

                      <Input
                        value={userProfile.Gender}
                        name="Gender"
                      />
                      {/* <!-- <select
                           name="Gender"
                           value={userProfile.Gender}
                         >
                           <option value="">Choose Gender</option>
                           <option value="Male">Male</option>
                           <option value="Female">Female</option>
                           <option value="LGBT">LGBT</option>
                           <option value="LGBTQ+">LGBTQ+</option>
                         </select> --> */}
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={12}>
                  <Form.Item label="Birthday">
                    <Input
                      value={userProfile.Birthday}
                      name="Gender"
                    />
                    {/* <!-- <DatePicker
                         value={userProfile.Birthday}
                       /> --> */}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input
                      type="email"
                      value={userProfile.Email}
                      name="Email"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <Input
                      type="phone"
                      value={userProfile.PhoneNumber}
                      name="PhoneNumber"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Address">
                    <Input
                      value={userProfile.Address}
                      name="Address"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Country">
                    <Input
                      value={userProfile.Country}
                      name="Country"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="City">
                    <Input
                      value={userProfile.City}
                      name="City"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Province">
                    <Input
                      value={userProfile.Province}
                      name="Province"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="Postal Code">
                    <Input
                      value={userProfile.PostalCode}
                      name="PostalCode"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Role Name">
                    <Input
                      value={userProfile.RoleName}
                      name="RoleName"
                    />
                  </Form.Item>
                </Col>

              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerPage;
