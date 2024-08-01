import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  Table,
  DatePicker,
  Upload,
  Empty,
  message,
} from "antd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";
import axios from "axios";
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
        ...response.data.diamonds.map((d) => ({
          ...d,
          ProductName: `Diamond ${d.DiamondID}`,
          ProductID: d.DiamondID,
        })),
        ...response.data.bridals.map((b) => ({
          ...b,
          ProductName: `Bridal ${b.BridalID}`,
          ProductID: b.BridalID,
        })),
        ...response.data.diamondRings.map((r) => ({
          ...r,
          ProductName: `DiamondRings ${r.DiamondRingsID}`,
          ProductID: r.DiamondRingsID,
        })),
        ...response.data.diamondTimepieces.map((t) => ({
          ...t,
          ProductName: `DiamondTimepieces ${t.DiamondTimepiecesID}`,
          ProductID: t.DiamondTimepiecesID,
        })),
      ];
      setProducts(processedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSaveCertificate = async (values) => {
    try {
      const certificateData = {
        ...values,
        InspectionDate: values.InspectionDate.format("YYYY-MM-DD"),
        CertificateImage: previewImage,
      };

      const selectedProduct = products.find((product) => product.ProductID === values.ProductID);
      if (selectedProduct) {
        if (selectedProduct.DiamondID) {
          certificateData.DiamondID = selectedProduct.DiamondID;
        } else if (selectedProduct.BridalID) {
          certificateData.BridalID = selectedProduct.BridalID;
        } else if (selectedProduct.DiamondRingsID) {
          certificateData.DiamondRingsID = selectedProduct.DiamondRingsID;
        } else if (selectedProduct.DiamondTimepiecesID) {
          certificateData.DiamondTimepiecesID = selectedProduct.DiamondTimepiecesID;
        }
      }

      if (editingCertificate) {
        await axios.put(`http://localhost:8090/certificate/update/${editingCertificate.CertificateID}`, certificateData);
      } else {
        await axios.post("http://localhost:8090/certificate/add", certificateData);
      }
      fetchCertificates(); // Refresh the list
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      setPreviewImage(null); // Clear image preview
      setEditingCertificate(null);
    } catch (error) {
      console.error("Error saving certificate:", error.response?.data || error.message);
      message.error("Failed to save certificate");
    }
  };

  const handleEditCertificate = (record) => {
    setEditingCertificate(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
      InspectionDate: moment(record.InspectionDate, "YYYY-MM-DD"),
    });
    setPreviewImage(record.CertificateImage);
  };

  const handleSearch = () => {
    const filtered = certificates.filter((certificate) =>
      certificate.GIAReportNumber.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

  // const handleImageUpload = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setPreviewImage(reader.result); // Set image preview URL
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       console.error("Error reading file:", error);
  //       reject(error);
  //     };
  //   });
  // };

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions (resize to 800x800, adjust as needed)
          canvas.width = 800;
          canvas.height = 800;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert canvas to Base64
          const resizedImage = canvas.toDataURL('image/jpeg'); // Change to 'image/png' if needed

          setPreviewImage(resizedImage); // Set image preview URL
          resolve(resizedImage);
        };

        img.onerror = (error) => {
          console.error("Error loading image:", error);
          reject(error);
        };
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };


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
      render: (date) => new Date(date).toLocaleDateString(),
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

  const validateCertificatesExist = async (rule, value) => {
    const exists = certificates.some((item) => item.GIAReportNumber === value);
    if (exists) {
      return Promise.reject("The GIA Report Number already exists.");
    }
    return Promise.resolve();
  };

  const validateGIAReportNumber = (rule, value) => {
    const regex = /^GIA\d{1,7}$/;
    if (!regex.test(value)) {
      return Promise.reject('GIA Report Number must start with "GIA" followed by up to 7 digits (max 10 characters).');
    }
    return Promise.resolve();
  };

  const validateCaratWeight = (rule, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0.1 || numValue > 3.0) {
      return Promise.reject("The carat weight must be a value between 0.1 and 3.0.");
    }
    return Promise.resolve();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Input
          placeholder="Search by GIA Report Number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <Button
          style={{
            backgroundColor: "#f0c14b",
            color: "#111",
            borderRadius: "4px",
            height: "40px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <Button
        style={{
          backgroundColor: "#f0c14b",
          color: "#111",
          borderRadius: "4px",
          height: "40px",
          marginBottom: "16px",
        }}
        onClick={() => {
          form.resetFields();
          setEditingCertificate(null);
          setPreviewImage(null);
          setIsModalVisible(true);
        }}
      >
        Add Certificate
      </Button>
      {filteredCertificates.length > 0 ? (
        <Table
          dataSource={filteredCertificates}
          columns={columns}
          rowKey="CertificateID"
        />
      ) : (
        <Empty description="No certificates found." />
      )}
      <Modal
        title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSaveCertificate}>
          <Form.Item
            label="GIA Report Number"
            name="GIAReportNumber"
            rules={[
              { required: true, message: "GIA Report Number is required" },
              { validator: validateGIAReportNumber },
              { validator: validateCertificatesExist },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Inspection Date"
            name="InspectionDate"
            rules={[{ required: true, message: "Inspection Date is required" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Clarity Grade"
            name="ClarityGrade"
            rules={[{ required: true, message: "Clarity Grade is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Shape and Cutting Style"
            name="ShapeAndCuttingStyle"
            rules={[
              { required: true, message: "Shape and Cutting Style is required" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Measurements"
            name="Measurements"
            rules={[{ required: true, message: "Measurements are required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Carat Weight"
            name="CaratWeight"
            rules={[
              { required: true, message: "Carat Weight is required" },
              { validator: validateCaratWeight },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Color Grade"
            name="ColorGrade"
            rules={[{ required: true, message: "Color Grade is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Symmetry Grade"
            name="SymmetryGrade"
            rules={[{ required: true, message: "Symmetry Grade is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cut Grade"
            name="CutGrade"
            rules={[{ required: true, message: "Cut Grade is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Polish Grade"
            name="PolishGrade"
            rules={[{ required: true, message: "Polish Grade is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Fluorescence"
            name="Fluorescence"
            rules={[{ required: true, message: "Fluorescence is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product"
            name="ProductID"
            rules={[{ required: true, message: "Product is required" }]}
          >
            <Select placeholder="Select a product">
              {products.map((product) => (
                <Option key={product.ProductID} value={product.ProductID}>
                  {product.ProductName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Certificate Image">
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false; // Prevent automatic upload
              }}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <AddPhotoAlternateIcon />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageCertificate;
