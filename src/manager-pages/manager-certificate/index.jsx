import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ManageCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [isAddCertificateVisible, setIsAddCertificateVisible] = useState(false);
  const [isEditCertificateVisible, setIsEditCertificateVisible] =
    useState(false);
  const [form] = Form.useForm();
  const [editingCertificate, setEditingCertificate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/certificate/lookup"
      );
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveCertificate = async (values) => {
    try {
      if (editingCertificate) {
        await axios.put(
          `http://localhost:8090/certificate/update-event/${editingCertificate.GIAReportNumber}`,
          values
        );
      } else {
        await axios.put("http://localhost:8090/certificate/add", values);
      }
      fetchData(); // Refresh the list
      setIsAddCertificateVisible(false); // Close the modal
      setIsEditCertificateVisible(false);
      form.resetFields(); // Reset the form fields
      setEditingCertificate(null);
    } catch (error) {
      console.error("Error saving certificate:", error);
    }
  };

  const handleEditCertificate = (record) => {
    setEditingCertificate(record);
    setIsEditCertificateVisible(true); // Show the modal
    form.setFieldsValue(record);
  };

  ////delete still have many problem in DB & BE
  // const handleDeleteCertificate = async (certificateId) => {
  //   try {
  //     await axios.delete("http://localhost:8090/certificate/delete", {
  //       data: { certificateId },
  //     });
  //     fetchData(); // Refresh the list
  //   } catch (error) {
  //     console.error("Error deleting certificate:", error);
  //   }
  // };

  const columns = [
    {
      title: "GIA Report Number",
      dataIndex: "GIAReportNumber",
      key: "GIAReportNumber",
    },
    {
      title: "Inspection Date",
      dataIndex: "InspectionDate",
      key: "InspectionDate",
      render: (date) => new Date(date).toLocaleDateString(), // Format date
    },
    {
      title: "Clarity Grade",
      dataIndex: "ClarityGrade",
      key: "ClarityGrade",
    },
    {
      title: "Shape and Cutting Style",
      dataIndex: "ShapeAndCuttingStyle",
      key: "ShapeAndCuttingStyle",
    },
    {
      title: "Measurements",
      dataIndex: "Measurements",
      key: "Measurements",
    },
    {
      title: "Carat Weight",
      dataIndex: "CaratWeight",
      key: "CaratWeight",
    },
    {
      title: "Color Grade",
      dataIndex: "ColorGrade",
      key: "ColorGrade",
    },
    {
      title: "Symmetry Grade",
      dataIndex: "SymmetryGrade",
      key: "SymmetryGrade",
    },
    {
      title: "Cut Grade",
      dataIndex: "CutGrade",
      key: "CutGrade",
    },
    {
      title: "Polish Grade",
      dataIndex: "PolishGrade",
      key: "PolishGrade",
    },
    {
      title: "Fluorescence",
      dataIndex: "Fluorescence",
      key: "Fluorescence",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEditCertificate(record)}>
            Edit
          </Button>
          {/* <Button
            type="link"
            danger
            onClick={() => handleDeleteCertificate(record.CertificateID)}
          >
            Delete
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsAddCertificateVisible(true)}>
        Add Certificate
      </Button>
      <Table
        dataSource={certificates}
        columns={columns}
        rowKey="CertificateID"
      />
      <Modal
        title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        visible={isAddCertificateVisible || isEditCertificateVisible}
        onCancel={() => {
          setIsAddCertificateVisible(false);
          setIsEditCertificateVisible(false);
          form.resetFields();
          setEditingCertificate(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCertificate}>
          <Form.Item name="CertificateID" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="GIAReportNumber"
            label="GIA Report Number"
            rules={[
              {
                required: true,
                message: "Please input the GIA Report Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="InspectionDate"
            label="Inspection Date"
            rules={[
              { required: true, message: "Please input the Inspection Date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="ClarityGrade"
            label="Clarity Grade"
            rules={[
              { required: true, message: "Please input the Clarity Grade!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ShapeAndCuttingStyle"
            label="Shape and Cutting Style"
            rules={[
              {
                required: true,
                message: "Please input the Shape and Cutting Style!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Measurements"
            label="Measurements"
            rules={[
              { required: true, message: "Please input the Measurements!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CaratWeight"
            label="Carat Weight"
            rules={[
              { required: true, message: "Please input the Carat Weight!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ColorGrade"
            label="Color Grade"
            rules={[
              { required: true, message: "Please input the Color Grade!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SymmetryGrade"
            label="Symmetry Grade"
            rules={[
              { required: true, message: "Please input the Symmetry Grade!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CutGrade"
            label="Cut Grade"
            rules={[{ required: true, message: "Please input the Cut Grade!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="PolishGrade"
            label="Polish Grade"
            rules={[
              { required: true, message: "Please input the Polish Grade!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Fluorescence"
            label="Fluorescence"
            rules={[
              { required: true, message: "Please input the Fluorescence!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCertificate ? "Update Certificate" : "Add Certificate"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageCertificate;
