import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

function ManageWarranty() {
  const [warranties, setWarranties] = useState([]);
  const [isEditWarrantyVisible, setIsEditWarrantyVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingWarranty, setEditingWarranty] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/warranty/view-warranty"
      );
      setWarranties(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditWarranty = (record) => {
    setEditingWarranty(record);
    setIsEditWarrantyVisible(true);
    form.setFieldsValue({
      ...record,
      reportNo: record.ReportNo,
      description: record.Descriptions,
      date: moment(record.Date),
      placeToBuy: record.PlaceToBuy,
      period: moment(record.Period),
      warrantyType: record.WarrantyType,
      warrantyConditions: record.WarrantyConditions,
      accompaniedService: record.AccompaniedService,
      condition: record.Condition,
      orderDetailId: record.OrderDetailID,
    });
  };

  const handleUpdateWarranty = async (values) => {
    try {
      const payload = {
        reportNo: editingWarranty.ReportNo,
        description: values.description,
        date: values.date.format("YYYY-MM-DD"),
        placeToBuy: values.placeToBuy,
        period: values.period.format("YYYY-MM-DD"),
        warrantyType: values.warrantyType,
        warrantyConditions: values.warrantyConditions,
        accompaniedService: values.accompaniedService,
        condition: values.condition,
        orderDetailId: values.orderDetailId,
      };
      console.log("Payload for update:", payload);
      await axios.put(
        `http://localhost:8090/warranty/update-warranty`,
        payload
      );
      fetchData();
      setIsEditWarrantyVisible(false);
      form.resetFields();
      setEditingWarranty(null);
    } catch (error) {
      console.error(
        "Error updating warranty:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteWarranty = async (reportNo) => {
    try {
      await axios.delete("http://localhost:8090/warranty/delete-warranty", {
        data: { reportNo },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting warranty:", error);
    }
  };

  const columns = [
    {
      title: "Report Number",
      dataIndex: "ReportNo",
      key: "ReportNo",
    },
    {
      title: "Descriptions",
      dataIndex: "Descriptions",
      key: "Descriptions",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Place to Buy",
      dataIndex: "PlaceToBuy",
      key: "PlaceToBuy",
    },
    {
      title: "Period",
      dataIndex: "Period",
      key: "Period",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Warranty Type",
      dataIndex: "WarrantyType",
      key: "WarrantyType",
    },
    {
      title: "Warranty Conditions",
      dataIndex: "WarrantyConditions",
      key: "WarrantyConditions",
    },
    {
      title: "Accompanied Service",
      dataIndex: "AccompaniedService",
      key: "AccompaniedService",
    },
    {
      title: "Condition",
      dataIndex: "Condition",
      key: "Condition",
    },
    {
      title: "Order Detail ID",
      dataIndex: "OrderDetailID",
      key: "OrderDetailID",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEditWarranty(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteWarranty(record.ReportNo)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={warranties} columns={columns} rowKey="ReportNo" />
      <Modal
        title="Edit Warranty"
        visible={isEditWarrantyVisible}
        onCancel={() => setIsEditWarrantyVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateWarranty}>
          <Form.Item name="reportNo" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descriptions"
            rules={[
              { required: true, message: "Please input the Descriptions!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please input the Date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="placeToBuy"
            label="Place to Buy"
            rules={[
              { required: true, message: "Please input the Place to Buy!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="period"
            label="Period"
            rules={[{ required: true, message: "Please input the Period!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="warrantyType"
            label="Warranty Type"
            rules={[
              { required: true, message: "Please input the Warranty Type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="warrantyConditions"
            label="Warranty Conditions"
            rules={[
              {
                required: true,
                message: "Please input the Warranty Conditions!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="accompaniedService"
            label="Accompanied Service"
            rules={[
              {
                required: true,
                message: "Please input the Accompanied Service!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please input the Condition!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="orderDetailId"
            label="Order Detail ID"
            rules={[
              { required: true, message: "Please input the Order Detail ID!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Warranty
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageWarranty;
