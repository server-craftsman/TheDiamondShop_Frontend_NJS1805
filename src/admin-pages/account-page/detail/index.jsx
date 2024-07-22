import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import {
  Spin,
  Alert,
  Descriptions,
  message,
  Card,
  Row,
  Col,
  Button as AntButton,
} from "antd";
import axios from "axios";
import moment from "moment";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import { Button } from "@mui/material";

const AccountDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    if (user && id) {
      fetchAccountDetails();
    }
  }, [id, user]);

  const fetchAccountDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = user?.token;
      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.get(
        `http://localhost:8090/auth/accounts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status) {
        setAccount(response.data.account);
      } else {
        setError(response.data.message || "No account details found.");
      }
    } catch (err) {
      console.error("Error fetching account details:", err);
      setError("Error fetching account details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const newStatus = account.Status === "Activate" ? 1 : 0;

      const response = await axios.put(
        "http://localhost:8090/features/update-status",
        { email: account.Email, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status) {
        message.success(response.data.message);
        fetchAccountDetails();
      } else {
        throw new Error(
          response.data.message ||
            `Failed to update account status. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error updating account status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  if (!account) {
    return null;
  }

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            cover={
              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  style={{
                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  alt="Profile"
                  src={
                    account.Image
                      ? account.Image
                      : "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                  }
                />
              </div>
            }
            title={`${account.FirstName} ${account.LastName}`}
            style={{ marginBottom: "20px" }}
          >
            {account.RoleName !== "Admin" && (
              <Button
                type={account.Status === "Activate" ? "danger" : "primary"}
                onClick={handleStatusChange}
                block
                startIcon={
                  account.Status === "Activate" ? <KeyOffIcon /> : <KeyIcon />
                }
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  width: "100%",
                }}
              >
                {account.Status === "Activate" ? "Deactivate" : "Activate"}
              </Button>
            )}
          </Card>
          <AntButton
            type="default"
            onClick={() => navigate(-1)} // Navigate back to the previous page
            style={{ color: "#fff", backgroundColor: "#000" }}
          >
            Back
          </AntButton>
        </Col>
        <Col span={16}>
          <Card title="Account Details" bordered>
            <Descriptions column={1} bordered>
              {account.AccountID && (
                <Descriptions.Item label="Account ID">
                  {account.AccountID}
                </Descriptions.Item>
              )}
              {account.FirstName && (
                <Descriptions.Item label="First Name">
                  {account.FirstName}
                </Descriptions.Item>
              )}
              {account.LastName && (
                <Descriptions.Item label="Last Name">
                  {account.LastName}
                </Descriptions.Item>
              )}
              {account.Gender && (
                <Descriptions.Item label="Gender">
                  {account.Gender}
                </Descriptions.Item>
              )}
              {account.Email && (
                <Descriptions.Item label="Email">
                  {account.Email}
                </Descriptions.Item>
              )}
              {account.RoleName && (
                <Descriptions.Item label="Role Name">
                  {account.RoleName}
                </Descriptions.Item>
              )}
              {account.Status && (
                <Descriptions.Item label="Status">
                  {account.Status}
                </Descriptions.Item>
              )}
              {account.Password && (
                <Descriptions.Item label="Password">
                  {account.Password}
                </Descriptions.Item>
              )}
              {account.PhoneNumber && (
                <Descriptions.Item label="Phone Number">
                  {account.PhoneNumber}
                </Descriptions.Item>
              )}
              {account.Address && (
                <Descriptions.Item label="Address">
                  {account.Address}
                </Descriptions.Item>
              )}
              {account.Country && (
                <Descriptions.Item label="Country">
                  {account.Country}
                </Descriptions.Item>
              )}
              {account.City && (
                <Descriptions.Item label="City">
                  {account.City}
                </Descriptions.Item>
              )}
              {account.Province && (
                <Descriptions.Item label="Province">
                  {account.Province}
                </Descriptions.Item>
              )}
              {account.PostalCode && (
                <Descriptions.Item label="Postal Code">
                  {account.PostalCode}
                </Descriptions.Item>
              )}
              {account.CreatedAt && (
                <Descriptions.Item label="Created At">
                  {formatDate(account.CreatedAt)}
                </Descriptions.Item>
              )}
              {account.Transportation && (
                <Descriptions.Item label="Transportation">
                  {account.Transportation}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountDetailsPage;
