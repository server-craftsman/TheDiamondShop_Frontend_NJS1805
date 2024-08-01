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
      const allProducts = [
        ...response.data.diamonds.map((d) => ({
          ProductID: d.DiamondID,
          ProductName: `Diamond ${d.DiamondID} - ${d.Cut} ${d.Color} (${d.CaratWeight} ct)`,
          ProductType: 'Diamond',
          UniqueKey: `diamond_${d.DiamondID}_${d.Cut}_${d.Color}`,
          Attributes: d
        })),
        ...response.data.bridals.map((b) => ({
          ProductID: b.BridalID,
          ProductName: `Bridal ${b.BridalID} - ${b.NameBridal} ${b.BrandName} (${b.Style})`,
          ProductType: 'Bridal',
          UniqueKey: `bridal_${b.BridalID}_${b.NameBridal}_${b.BrandName}`,
          Attributes: b
        })),
        ...response.data.diamondRings.map((r) => ({
          ProductID: r.DiamondRingsID,
          ProductName: `DiamondRing ${r.DiamondRingsID} - ${r.RingStyle} ${r.BrandName} (${r.Material})`,
          ProductType: 'DiamondRing',
          UniqueKey: `ring_${r.DiamondRingsID}_${r.RingStyle}_${r.BrandName}`,
          Attributes: r
        })),
        ...response.data.diamondTimepieces.map((t) => ({
          ProductID: t.DiamondTimepiecesID,
          ProductName: `DiamondTimepieces ${t.DiamondTimepiecesID} - ${t.TimepiecesStyle} ${t.BrandName} (${t.Model})`,
          ProductType: 'DiamondTimepiece',
          UniqueKey: `timepiece_${t.DiamondTimepiecesID}_${t.TimepiecesStyle}_${t.BrandName}`,
          Attributes: t
        })),
      ];
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Save or update certificate logic
  const handleSaveCertificate = async (values) => {
    try {
      const selectedProduct = products.find((product) => product.ProductID === values.ProductID);

      if (!selectedProduct) {
        console.error("Selected product not found:", values.ProductID);
        message.error("Selected product is invalid.");
        return;
      }

      const certificateData = {
        ...values,
        InspectionDate: values.InspectionDate.format("YYYY-MM-DD"),
        ImageLogoCertificate: previewImage,
        [`${selectedProduct.ProductType}ID`]: selectedProduct.ProductID,
      };

      console.log("Certificate Data to Save:", certificateData);

      if (editingCertificate) {
        await axios.put(`http://localhost:8090/certificate/update-cert/${editingCertificate.CertificateID}`, certificateData);
      } else {
        await axios.post("http://localhost:8090/certificate/add", certificateData);
      }

      fetchCertificates(); // Refresh the list
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      setPreviewImage(null); // Clear image preview
      setEditingCertificate(null); // Clear editing state
    } catch (error) {
      console.error("Error saving certificate:", error.response?.data || error.message);
      message.error("Failed to save certificate");
    }
  };

  const handleEditCertificate = (record) => {
    setEditingCertificate(record);
    setIsModalVisible(true);

    const productID = record.DiamondID || record.BridalID || record.DiamondRingsID || record.DiamondTimepiecesID;
    const selectedProduct = products.find((product) => product.ProductID === productID);

    if (selectedProduct) {
      form.setFieldsValue({
        ...record,
        InspectionDate: moment(record.InspectionDate, "YYYY-MM-DD"),
        ProductID: selectedProduct.ProductID,
      });
      setPreviewImage(record.ImageLogoCertificate);
    } else {
      message.error("Selected product not found.");
    }
  };

  const handleSearch = () => {
    const filtered = certificates.filter((certificate) =>
      certificate.GIAReportNumber.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

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

  const handleProductChange = (selectedUniqueKey) => {
    const [type, id] = selectedUniqueKey.split('_');
    // Use type and id to process the selected product
    console.log('Selected Product Type:', type);
    console.log('Selected Product ID:', id);
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
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select
              showSearch
              placeholder="Select a product"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleProductChange} // Add this line
            >
              {products.map((product) => (
                <Select.Option key={product.UniqueKey} value={product.UniqueKey}>
                  {product.ProductName}
                </Select.Option>
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
