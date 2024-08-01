import {
  Empty,
  Form,
  Input,
  Modal,
  Select,
  Table,
  DatePicker,
  Upload,
} from "antd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, colors } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
const { Option } = Select;

function ManageCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCertificates();
    fetchProducts();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/certificate/lookup"
      );
      setCertificates(response.data);
      setFilteredCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/certificate/fetch-products"
      );
      const processedProducts = [
        ...response.data.diamonds.map((d) => ({
          ...d,
          ProductName: `Diamond ${d.DiamondID}`,
          ProductID: d.DiamondID, // Add ProductID here
        })),
        ...response.data.bridals.map((b) => ({
          ...b,
          ProductName: `Bridal ${b.BridalID}`,
          ProductID: b.BridalID, // Add ProductID here
        })),
        ...response.data.diamondRings.map((r) => ({
          ...r,
          ProductName: `DiamondRings ${r.DiamondRingsID}`,
          ProductID: r.DiamondRingsID, // Add ProductID here
        })),
        ...response.data.diamondTimepieces.map((t) => ({
          ...t,
          ProductName: `DiamondTimepieces ${t.DiamondTimepiecesID}`,
          ProductID: t.DiamondTimepiecesID, // Add ProductID here
        })),
      ];
      setProducts(processedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSaveCertificate = async (values) => {
    try {
      console.log("Form Values:", values); // Check the form values
      if (editingCertificate) {
        await axios.put(
          `http://localhost:8090/certificate/update/${editingCertificate.CertificateID}`,
          values
        );
      } else {
        await axios.post("http://localhost:8090/certificate/add", values);
      }
      fetchCertificates(); // Refresh the list
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      setPreviewImage(""); // Clear image preview
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
      InspectionDate: moment(record.InspectionDate, "YYYY-MM-DD"), // Ensure date format matches
    });
  };

  const handleSearch = () => {
    const filtered = certificates.filter((certificate) =>
      certificate.GIAReportNumber.toLowerCase().includes(
        searchText.toLowerCase()
      )
    );
    setFilteredCertificates(filtered);
  };
  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result); // Set image preview URL
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
    });
  };
  // const handleDeleteCertificate = async (certificateId) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:8090/certificate/delete/${certificateId}`
  //     );
  //     fetchCertificates(); // Refresh the list
  //   } catch (error) {
  //     console.error("Error deleting certificate:", error);
  //   }
  // };

  const columns = [
    {
      title: "Certificate ID",
      dataIndex: "CertificateID",
      key: "CertificateID",
    },
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
        const product = products.find((p) => p.ProductID === productId);
        return product ? product.ProductName : "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            style={{ marginBottom: "20px" }}
            type="link"
            onClick={() => handleEditCertificate(record)}
          >
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
  //================validate====================//

  const validateCertificatesExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = certificates.some((item) => item.GIAReportNumber === value);

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
  };

  const validateGIAReportNumber = (rule, value) => {
    // Ensure the value starts with "GIA" and is followed by digits
    const regex = /^GIA\d{1,7}$/;

    if (!regex.test(value)) {
      return Promise.reject(
        'GIA Report Number must start with "GIA" followed by up to 7 digits (max 10 characters).'
      );
    }

    return Promise.resolve();
  };

  const validateCaratWeight = (rule, value) => {
    // Convert the value to a number
    const numValue = parseFloat(value);

    // Check if the value is a number and between 0.1 and 3.0
    if (isNaN(numValue) || numValue < 0.1 || numValue > 3.0) {
      return Promise.reject(
        "The carat weight must be a value between 0.1 and 3.0."
      );
    }

    return Promise.resolve();
  };

  //==============================================//

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
              { validator: validateGIAReportNumber },
              { validator: validateCertificatesExist },
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
            <Select>
              <Option value="IF">IF</Option>
              <Option value="VVS1">VVS1</Option>
              <Option value="VVS2">VVS2</Option>
              <Option value="VS1">VS1</Option>
              <Option value="VS2">VS2</Option>
            </Select>
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
            <Select>
              <Option value="Round">Round</Option>
              <Option value="Princess">Princess</Option>
              <Option value="Cushion">Cushion</Option>
              <Option value="Emerald">Emerald</Option>
              <Option value="Oval">Oval</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Measurements"
            label="Measurements"
            // rules={[
            //   { required: true, message: "Please input the Measurements!" },
            // ]}
            initialValue="10.0x5.0"
          >
            <Input disabled placeholder="10.0x5.0" />
          </Form.Item>
          <Form.Item
            name="CaratWeight"
            label="Carat Weight (0.1 - 3)"
            rules={[
              { required: true, message: "Please input the Carat Weight!" },
              { validator: validateCaratWeight },
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
            <Select>
              <Option value="F">F</Option>
              <Option value="G">G</Option>
              <Option value="I">I</Option>
              <Option value="K">K</Option>
              <Option value="J">J</Option>
              <Option value="E">E</Option>
              <Option value="H">H</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="SymmetryGrade"
            label="Symmetry Grade"
            rules={[
              { required: true, message: "Please input the Symmetry Grade!" },
            ]}
          >
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CutGrade"
            label="Cut Grade"
            rules={[{ required: true, message: "Please input the Cut Grade!" }]}
          >
            <Select>
              <Option value="N/A">N/A</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="PolishGrade"
            label="Polish Grade"
            rules={[
              { required: true, message: "Please input the Polish Grade!" },
            ]}
          >
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Fluorescence"
            label="Fluorescence"
            rules={[
              { required: true, message: "Please input the Fluorescence!" },
            ]}
          >
            <Select>
              <Option value="NON">NON</Option>
              <Option value="MB">MB</Option>
              <Option value="STG BL">STG BL</Option>
              <Option value="FNL BL">FNL BL</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="ProductID"
            label="Product"
            rules={[{ required: true, message: "Please select a Product!" }]}
          >
            <Select placeholder="Select a product">
              {products.map((product) => (
                <Option key={product.ProductID} value={product.ProductID}>
                  {product.ProductName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="ImageLogoCertificate"
            label="Image Logo Certificate"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
            rules={[{ required: true, message: "Please upload the image!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              maxCount={1}
              onChange={({ fileList }) =>
                form.setFieldsValue({ ImageLogoCertificate: fileList })
              }
              onPreview={(file) => handleImageUpload(file.originFileObj)}
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {previewImage && (
              <Form.Item>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: "400px", height: "auto" }}
                />
              </Form.Item>
            )}
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
