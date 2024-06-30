import { Button, Form, Input, Modal, Table, DatePicker } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
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
      const response = await axios.get("http://localhost:8090/warranty/view-warranty");
      setWarranties(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveWarranty = async (values) => {
    try {
      await axios.put(
        `http://localhost:8090/warranty/update-warranty`,
        {
          ...values,
          Date: values.Date.format("YYYY-MM-DD"), // Format the date before sending it to the backend
          Period: values.Period.format("YYYY-MM-DD"), // Format the period date before sending it to the backend
        }
      );
      fetchData(); 
      setIsEditWarrantyVisible(false); 
      form.resetFields(); 
      setEditingWarranty(null);
    } catch (error) {
      console.error("Error saving warranty:", error);
    }
  };

  const handleEditWarranty = (record) => {
    setEditingWarranty(record);
    setIsEditWarrantyVisible(true); // Show the modal
    form.setFieldsValue({
      ...record,
      Date: moment(record.Date), // Convert date string to moment object
      Period: moment(record.Period), // Convert period date string to moment object
    });
  };

  const handleDeleteWarranty = async (reportNo) => {
    try {
      await axios.delete("http://localhost:8090/warranty/delete-warranty", {
        data: { reportNo },
      });
      fetchData(); // Refresh the list
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
      render: (date) => moment(date).format("YYYY-MM-DD"), // Format date
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
      render: (date) => moment(date).format("YYYY-MM-DD"), // Format date
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
          <Button type="link" onClick={() => handleDeleteWarranty(record.ReportNo)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={warranties} columns={columns} rowKey="ReportNo" />
      <Modal
        title="Edit Warranty"
        visible={isEditWarrantyVisible} // Correct prop name for visibility
        onCancel={() => {
          setIsEditWarrantyVisible(false);
          form.resetFields();
          setEditingWarranty(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveWarranty}>
          <Form.Item name="ReportNo" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="Descriptions"
            label="Descriptions"
            rules={[{ required: true, message: "Please input the Descriptions!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Date"
            label="Date"
            rules={[{ required: true, message: "Please input the Date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="PlaceToBuy"
            label="Place to Buy"
            rules={[{ required: true, message: "Please input the Place to Buy!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Period"
            label="Period"
            rules={[{ required: true, message: "Please input the Period!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="WarrantyType"
            label="Warranty Type"
            rules={[{ required: true, message: "Please input the Warranty Type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="WarrantyConditions"
            label="Warranty Conditions"
            rules={[
              { required: true, message: "Please input the Warranty Conditions!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="AccompaniedService"
            label="Accompanied Service"
            rules={[
              { required: true, message: "Please input the Accompanied Service!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Condition"
            label="Condition"
            rules={[{ required: true, message: "Please input the Condition!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="OrderDetailID"
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
    </div>
  );
}

export default ManageWarranty;
