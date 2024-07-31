import { Button, Empty, Form, Input, Modal, Select, Table, DatePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

function ManageCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();
    fetchProducts();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get("http://localhost:8090/certificate/lookup");
      setCertificates(response.data);
      setFilteredCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8090/certificate/fetch-products");
      const processedProducts = [
        ...response.data.diamonds.map(d => ({ ...d, ProductName: `Diamond ${d.DiamondID}` })),
        ...response.data.bridals.map(b => ({ ...b, ProductName: `Bridal ${b.BridalID}` })),
        ...response.data.diamondRings.map(r => ({ ...r, ProductName: `DiamondRings ${r.DiamondRingsID}` })),
        ...response.data.diamondTimepieces.map(t => ({ ...t, ProductName: `DiamondTimepieces ${t.DiamondTimepiecesID}` }))
      ];
      setProducts(processedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSaveCertificate = async (values) => {
    try {
      console.log('Form Values:', values); // Check the form values
      if (editingCertificate) {
        await axios.put(`http://localhost:8090/certificate/update/${editingCertificate.CertificateID}`, values);
      } else {
        await axios.post("http://localhost:8090/certificate/add", values);
      }
      fetchCertificates(); // Refresh the list
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      setEditingCertificate(null);
    } catch (error) {
      console.error("Error saving certificate:", error);
    }
  };


  const handleEditCertificate = (record) => {
    setEditingCertificate(record);
    setIsModalVisible(true); // Show the modal
    form.setFieldsValue({
      ...record,
      InspectionDate: moment(record.InspectionDate, 'YYYY-MM-DD'), // Ensure date format matches
    });
  };

  const handleSearch = () => {
    const filtered = certificates.filter((certificate) =>
      certificate.GIAReportNumber.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

  const handleDeleteCertificate = async (certificateId) => {
    try {
      await axios.delete(`http://localhost:8090/certificate/delete/${certificateId}`);
      fetchCertificates(); // Refresh the list
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

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
      title: "Product",
      dataIndex: "ProductID",
      key: "ProductID",
      render: (productId) => {
        const product = products.find(p => p.ProductID === productId);
        return product ? product.ProductName : "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEditCertificate(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteCertificate(record.CertificateID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by GIA Report Number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
        <Button type="primary" onClick={handleSearch} style={{ marginLeft: 8 }}>
          Search
        </Button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setEditingCertificate(null);
            setIsModalVisible(true);
          }}
          style={{ marginLeft: 8 }}
        >
          Add Certificate
        </Button>
      </div>
      {filteredCertificates.length === 0 ? (
        <Empty description="No certificate data found" />
      ) : (
        <Table
          dataSource={filteredCertificates}
          columns={columns}
          rowKey="CertificateID"
        />
      )}
      <Modal
        title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
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
              { required: true, message: "Please select the Inspection Date!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
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
          <Form.Item
            name="ProductID"
            label="Product"
            rules={[
              { required: true, message: "Please select a Product!" },
            ]}
          >
            <Select placeholder="Select a product">
              {products.map(product => (
                <Select.Option key={product.ProductID} value={product.ProductID}>
                  {product.ProductName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="ImageLogoCertificate"
            label="Image Logo Certificate"
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
