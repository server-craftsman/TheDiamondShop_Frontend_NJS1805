import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Select, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

// const { Option } = Select;

function RequestWarranty() {
  const [warrantyRequests, setWarrantyRequests] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedRequest, setSelectedRequest] = useState(null);
  // const [form] = Form.useForm();

  useEffect(() => {
    fetchWarrantyRequests();
  }, []);

  const fetchWarrantyRequests = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage
      const response = await axios.get(
        "http://localhost:8090/auth/view-warranty-manager",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      if (response.data.status) {
        setWarrantyRequests(response.data.warrantyRequests);
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching warranty requests:", error);
      message.error("Error fetching warranty requests");
    }
  };

  // const handleUpdateRequest = async (values) => {
  //   try {
  //     const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage
  //     await axios.put(
  //       "http://localhost:8090/auth/update-warranty-manager",
  //       {
  //         orderId: selectedRequest.OrderID,
  //         requestWarranty: values.requestWarranty,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include the token in the headers
  //         },
  //       }
  //     );
  //     message.success("Warranty request updated successfully");
  //     fetchWarrantyRequests(); // Refresh the list
  //     setIsModalVisible(false); // Close the modal
  //     form.resetFields(); // Reset the form fields
  //     setSelectedRequest(null);
  //   } catch (error) {
  //     console.error("Error updating warranty request:", error);
  //     message.error("Error updating warranty request");
  //   }
  // };

  // const handleEditRequest = (record) => {
  //   setSelectedRequest(record);
  //   setIsModalVisible(true);
  //   form.setFieldsValue({
  //     requestWarranty: record.ResquestWarranty,
  //   });
  // };

  const columns = [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
    },
    // {
    //   title: "Email",
    //   dataIndex: "Email",
    //   key: "Email",
    // },
    // {
    //   title: "Phone Number",
    //   dataIndex: "PhoneNumber",
    //   key: "PhoneNumber",
    // },
    // {
    //   title: "Order ID",
    //   dataIndex: "OrderID",
    //   key: "OrderID",
    // },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      key: "OrderDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    // {
    //   title: "Attached Accessories",
    //   dataIndex: "AttachedAccessories",
    //   key: "AttachedAccessories",
    // },
    // {
    //   title: "Shipping",
    //   dataIndex: "Shipping",
    //   key: "Shipping",
    // },
    // {
    //   title: "Report No",
    //   dataIndex: "ReportNo",
    //   key: "ReportNo",
    // },
    // {
    //   title: "Delivery Address",
    //   dataIndex: "DeliveryAddress",
    //   key: "DeliveryAddress",
    // },
    {
      title: "Order Status",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
    },
    {
      title: "Total Price",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
    // {
    //   title: "Request Warranty",
    //   dataIndex: "ResquestWarranty",
    //   key: "ResquestWarranty",
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        // <Button type="link" onClick={() => handleEditRequest(record)}>
        //   Edit
        // </Button>
        <Link to={`/manager-view-warrantydetails/${record.OrderID}`}>
          <Button>View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={warrantyRequests} columns={columns} rowKey="OrderID" />
      {/* <Modal
        title="Edit Warranty Request"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedRequest(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateRequest}>
          <Form.Item
            name="requestWarranty"
            label="Request Warranty"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select a status">
              <Option value="Assign">Assign</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Refused">Refused</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Request
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
}

export default RequestWarranty;
