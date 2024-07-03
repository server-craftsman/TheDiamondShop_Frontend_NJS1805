import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import axios from "axios";
import moment from "moment";

const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8090/vouchers");
      setVouchers(response.data);
    } catch (error) {
      message.error("Failed to fetch vouchers");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post("http://localhost:8090/vouchers", values);
      message.success("Voucher created successfully");
      fetchVouchers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create voucher");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8090/vouchers/${editingVoucher.VoucherID}`,
        values
      );
      message.success("Voucher updated successfully");
      fetchVouchers();
      setIsModalVisible(false);
      form.resetFields();
      setEditingVoucher(null);
    } catch (error) {
      message.error("Failed to update voucher");
    }
  };

  const handleEdit = (record) => {
    setEditingVoucher(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
      ValidFrom: moment(record.ValidFrom),
      ExpirationDate: moment(record.ExpirationDate),
    });
  };

  const columns = [
    {
      title: "Voucher Name",
      dataIndex: "VoucherName",
      key: "VoucherName",
    },
    {
      title: "Usaged Quantity",
      dataIndex: "UsagedQuantity",
      key: "UsagedQuantity",
    },
    {
      title: "Total Quantity",
      dataIndex: "TotalQuantity",
      key: "TotalQuantity",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Valid From",
      dataIndex: "ValidFrom",
      key: "ValidFrom",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Expiration Date",
      dataIndex: "ExpirationDate",
      key: "ExpirationDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Condition",
      dataIndex: "Condition",
      key: "Condition",
    },
    {
      title: "Prerequisites",
      dataIndex: "Prerequisites",
      key: "Prerequisites",
    },
    {
      title: "Discount",
      dataIndex: "Discount",
      key: "Discount",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        New Voucher
      </Button>
      <Table
        columns={columns}
        dataSource={vouchers}
        loading={loading}
        rowKey="VoucherID"
      />

      <Modal
        title={editingVoucher ? "Edit Voucher" : "New Voucher"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingVoucher(null);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (editingVoucher) {
                handleUpdate(values);
              } else {
                handleCreate(values);
              }
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="voucherForm">
          <Form.Item
            name="VoucherName"
            label="Voucher Name"
            rules={[
              { required: true, message: "Please input the voucher name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="UsagedQuantity"
            label="Usaged Quantity"
            rules={[
              { required: true, message: "Please input the usaged quantity!" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="TotalQuantity"
            label="Total Quantity"
            rules={[
              { required: true, message: "Please input the total quantity!" },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="Type"
            label="Type"
            rules={[
              { required: true, message: "Please input the voucher type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ValidFrom"
            label="Valid From"
            rules={[
              { required: true, message: "Please select the valid from date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="ExpirationDate"
            label="Expiration Date"
            rules={[
              { required: true, message: "Please select the expiration date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="Condition"
            label="Condition"
            rules={[{ required: true, message: "Please input the condition!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Prerequisites"
            label="Prerequisites"
            rules={[
              { required: true, message: "Please input the prerequisites!" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="Discount"
            label="Discount"
            rules={[{ required: true, message: "Please input the discount!" }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageVoucher;