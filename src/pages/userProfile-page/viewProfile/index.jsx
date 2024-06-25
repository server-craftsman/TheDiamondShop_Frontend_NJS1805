import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card } from "antd";
import { AuthContext } from "../../../AuthContext"; // Adjust the path as needed
import './index.scss';
import axios from "axios";

function UserProfile() {
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

  if (loading) {
    return <p>Loading...</p>; // or a spinner component
  }

  return (
    <div className="profile" style={{ padding: "24px" }}>
      {fetchError && <p style={{ color: 'red' }}>Error: {fetchError}</p>}
      <Row gutter={16}>
        <Col span={8}>
          <Card style={{  paddingLeft: "120px", paddingRight: "8px"}}
            cover={
              <img style={{borderRadius: "50%", width: "200px", textAlign: "center"}}
                alt="User"
                src={userProfile.Image ? userProfile.Image : "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"}
              />
            }
          >
            <Card.Meta style={{marginLeft: "20px"}}
              title={`${userProfile.FirstName} ${userProfile.LastName}`}
              // description={`${userProfile.FirstName} ${userProfile.LastName}`}
            />
            
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>First Name:</strong> {userProfile.FirstName}</p>
              </Col>
              <Col span={12}>
                <p><strong>Last Name:</strong> {userProfile.LastName}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Gender:</strong> {userProfile.Gender}</p>
              </Col>
              <Col span={12}>
                <p><strong>Birthday:</strong> {userProfile.Birthday}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <p><strong>Email:</strong> {userProfile.Email}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <p><strong>Phone Number:</strong> {userProfile.PhoneNumber}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <p><strong>Address:</strong> {userProfile.Address}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <p><strong>Country:</strong> {userProfile.Country}</p>
              </Col>
              <Col span={8}>
                <p><strong>City:</strong> {userProfile.City}</p>
              </Col>
              <Col span={8}>
                <p><strong>Province:</strong> {userProfile.Province}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Postal Code:</strong> {userProfile.PostalCode}</p>
              </Col>
              <Col span={12}>
                <p><strong>Role Name:</strong> {userProfile.RoleName}</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
