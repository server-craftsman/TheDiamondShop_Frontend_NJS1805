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
  notification,
} from "antd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const { Option } = Select;

function ManageCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [products, setProducts] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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
      const allProducts = [
        ...response.data.diamonds.map((d) => ({
          ProductID: d.DiamondID,
          ProductName: `Diamond ${d.DiamondID} - ${d.Cut} ${d.Color} (${d.CaratWeight} ct)`,
          ProductType: "Diamond",
          UniqueKey: `diamond_${d.DiamondID}_${d.Cut}_${d.Color}`,
          Attributes: d,
          Image: d.Image,
        })),
        ...response.data.bridals.map((b) => ({
          ProductID: b.BridalID,
          ProductName: `Bridal ${b.BridalID} - ${b.NameBridal} ${b.BrandName} (${b.Style})`,
          ProductType: "Bridal",
          UniqueKey: `bridal_${b.BridalID}_${b.NameBridal}_${b.BrandName}`,
          Attributes: b,
          Image: b.ImageBridal,
        })),
        ...response.data.diamondRings.map((r) => ({
          ProductID: r.DiamondRingsID,
          ProductName: `DiamondRing ${r.DiamondRingsID} - ${r.RingStyle} ${r.BrandName} (${r.Material})`,
          ProductType: "DiamondRings",
          UniqueKey: `ring_${r.DiamondRingsID}_${r.RingStyle}_${r.BrandName}`,
          Attributes: r,
          Image: r.ImageRings,
        })),
        ...response.data.diamondTimepieces.map((t) => ({
          ProductID: t.DiamondTimepiecesID,
          ProductName: `DiamondTimepiece ${t.DiamondTimepiecesID} - ${t.TimepiecesStyle} ${t.BrandName} (${t.Model})`,
          ProductType: "DiamondTimepieces",
          UniqueKey: `timepiece_${t.DiamondTimepiecesID}_${t.TimepiecesStyle}_${t.BrandName}`,
          Attributes: t,
          Image: t.ImageTimepieces,
        })),
      ];
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleSaveCertificate = async (values) => {
    try {
      // Extract the numeric part of the ProductID
      const productIDNumber = values.ProductID.match(/\d+/)[0];

      const selectedProduct = products.find(
        (product) => product.ProductID === parseInt(productIDNumber, 10)
      );

      if (!selectedProduct) {
        console.error("Selected product not found:", productIDNumber);
        message.error("Selected product is invalid.");
        return;
      }

      const certificateData = {
        ...values,
        InspectionDate: values.InspectionDate.format("YYYY-MM-DD"),
        ImageLogoCertificate: previewImage,
        [`${selectedProduct.ProductType}ID`]: parseInt(productIDNumber, 10), // Use numeric ID here
      };

      console.log("Certificate Data to Save:", certificateData);

      if (editingCertificate) {
        await axios.put(
          `http://localhost:8090/certificate/update-cert/${editingCertificate.CertificateID}`,
          certificateData
        );
      } else {
        await axios.post(
          "http://localhost:8090/certificate/add",
          certificateData
        );
      }
      notification.success({
        message: "Success",
        description: editingCertificate
          ? "Certificate updated successfully!"
          : "Certificate added successfully!",
      });

      fetchCertificates(); // Refresh the list
      setIsAddModalVisible(false); // Close the add modal
      setIsEditModalVisible(false); // Close the edit modal if open
      form.resetFields(); // Reset the form fields
      setPreviewImage(null); // Clear image preview
      setEditingCertificate(null); // Clear editing state
    } catch (error) {
      console.error(
        "Error saving certificate:",
        error.response?.data || error.message
      );
      message.error("Failed to save certificate");
    }
  };

  const handleEditCertificate = (record) => {
    setEditingCertificate(record);
    setIsEditModalVisible(true);

    const productID =
      record.DiamondID ||
      record.BridalID ||
      record.DiamondRingsID ||
      record.DiamondTimepiecesID;
    const selectedProduct = products.find(
      (product) => product.ProductID === productID
    );

    if (selectedProduct) {
      form.setFieldsValue({
        ...record,
        InspectionDate: moment(record.InspectionDate, "YYYY-MM-DD"),
        ProductID: selectedProduct.UniqueKey,
      });
      setPreviewImage(record.ImageLogoCertificate);
    } else {
      message.error("Selected product not found.");
    }
  };

  const handleSearch = () => {
    const filtered = certificates.filter((certificate) => {
      const giaReportNumber = certificate.GIAReportNumber || ""; // Default to empty string if undefined
      return giaReportNumber.toLowerCase().includes(searchText.toLowerCase());
    });
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
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions (resize to 800x800, adjust as needed)
          canvas.width = 800;
          canvas.height = 800;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert canvas to Base64
          const resizedImage = canvas.toDataURL("image/jpeg"); // Change to 'image/png' if needed

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
    // Ensure selectedProductID is correctly set in the form
    const selectedProduct = products.find(
      (product) => product.UniqueKey === selectedUniqueKey
    );
    if (selectedProduct) {
      form.setFieldsValue({
        ProductID: selectedUniqueKey,
      });
    }
  };

  const disabledDate = (current) => {
    const endDate = moment().endOf("day");
    return current && current.isAfter(endDate);
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
      key: "ProductID",
      render: (record) => {
        const { BridalID, DiamondTimepiecesID, DiamondRingsID, DiamondID } =
          record;
        const ids = [
          { label: "Bridal", value: BridalID },
          { label: "Timepieces", value: DiamondTimepiecesID },
          { label: "Rings", value: DiamondRingsID },
          { label: "Diamond", value: DiamondID },
        ]
          .filter((id) => id.value !== null && id.value !== undefined)
          .map((id) => `${id.label}: ${id.value}`)
          .join(", ");
        return ids || "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Link to={`/certificate/${record.CertificateID}`}>View Details</Link>
          {/* <Button
            style={{ marginBottom: "20px" }}
            type="link"
            onClick={() => handleEditCertificate(record)}
          >
            Edit
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

  const validateCertificatesExistEdit = async (rule, value) => {
    // Assuming `currentCertificate` contains the information of the certificate being edited
    if (value === editingCertificate.GIAReportNumber) {
      return Promise.resolve();
    }

    const exists = certificates.some((item) => item.GIAReportNumber === value);
    if (exists) {
      return Promise.reject("The GIA Report Number already exists.");
    }
    return Promise.resolve();
  };

  const validateGIAReportNumber = (rule, value) => {
    const regex = /^GIA\d{1,7}$/;
    if (!regex.test(value)) {
      return Promise.reject(
        'GIA Report Number must start with "GIA" followed by up to 7 digits (max 10 characters).'
      );
    }
    return Promise.resolve();
  };

  const validateCaratWeight = (rule, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0.1 || numValue > 3.0) {
      return Promise.reject(
        "The carat weight must be a value between 0.1 and 3.0."
      );
    }
    return Promise.resolve();
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <Input
          placeholder="Search by GIA Report Number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <Button
          style={{
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "4px",
            border: "1px solid",
            height: "40px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <Button
        style={{
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid",
          borderRadius: "4px",
          height: "40px",
          marginBottom: "16px",
        }}
        onClick={() => {
          form.resetFields();
          setEditingCertificate(null);
          setPreviewImage(null);
          // setIsModalVisible(true);
          setIsAddModalVisible(true);
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

      {/* Add Certificate Modal */}
      <Modal
        // title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        title="Add Certificate"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
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
            <DatePicker 
            disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item
            label="Clarity Grade"
            name="ClarityGrade"
            rules={[{ required: true, message: "Clarity Grade is required" }]}
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
            label="Shape and Cutting Style"
            name="ShapeAndCuttingStyle"
            rules={[
              {
                required: true,
                message: "Shape and Cutting Style is required",
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
            label="Measurements"
            name="Measurements"
            rules={[{ required: true, message: "Measurements are required" }]}
            initialValue="10.0x5.0"
          >
            <Input disabled placeholder="10.0x5.0"/>
          </Form.Item>
          <Form.Item
            label="Carat Weight(0.1 - 3.0)"
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
            label="Symmetry Grade"
            name="SymmetryGrade"
            rules={[{ required: true, message: "Symmetry Grade is required" }]}
          >
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Cut Grade"
            name="CutGrade"
            rules={[{ required: true, message: "Cut Grade is required" }]}
          >
            <Select>
              <Option value="N/A">N/A</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Polish Grade"
            name="PolishGrade"
            rules={[{ required: true, message: "Polish Grade is required" }]}
          >
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Fluorescence"
            name="Fluorescence"
            rules={[{ required: true, message: "Fluorescence is required" }]}
          >
            <Select>
              <Option value="NON">NON</Option>
              <Option value="MB">MB</Option>
              <Option value="STG BL">STG BL</Option>
              <Option value="FNL BL">FNL BL</Option>
            </Select>
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
              onChange={handleProductChange}
              style={{ height: "50px" }}
            >
              {products.map((product) => (
                <Select.Option
                  key={product.UniqueKey}
                  value={product.UniqueKey}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={product.Image}
                      alt={product.ProductName}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    {product.ProductName}
                  </span>
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

      {/* Edit Certificate Modal */}
      <Modal
        // title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        title="Edit Certificate"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSaveCertificate}>
          <Form.Item
            label="GIA Report Number"
            name="GIAReportNumber"
            rules={[
              { required: true, message: "GIA Report Number is required" },
              { validator: validateGIAReportNumber },
              { validator: validateCertificatesExistEdit },
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
            <Select>
              <Option value="IF">IF</Option>
              <Option value="VVS1">VVS1</Option>
              <Option value="VVS2">VVS2</Option>
              <Option value="VS1">VS1</Option>
              <Option value="VS2">VS2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Shape and Cutting Style"
            name="ShapeAndCuttingStyle"
            rules={[
              {
                required: true,
                message: "Shape and Cutting Style is required",
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
            label="Measurements"
            name="Measurements"
            rules={[{ required: true, message: "Measurements are required" }]}
          >
            <Input disabled />
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
            label="Symmetry Grade"
            name="SymmetryGrade"
            rules={[{ required: true, message: "Symmetry Grade is required" }]}
          >
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Cut Grade"
            name="CutGrade"
            rules={[{ required: true, message: "Cut Grade is required" }]}
          >
            <Select>
              <Option value="N/A">N/A</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Polish Grade"
            name="PolishGrade"
            rules={[{ required: true, message: "Polish Grade is required" }]}
          >
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Very Good">Very Good</Option>
              <Option value="Excellent">Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Fluorescence"
            name="Fluorescence"
            rules={[{ required: true, message: "Fluorescence is required" }]}
          >
            <Select>
              <Option value="NON">NON</Option>
              <Option value="MB">MB</Option>
              <Option value="STG BL">STG BL</Option>
              <Option value="FNL BL">FNL BL</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
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
                <Select.Option
                  key={product.UniqueKey}
                  value={product.UniqueKey}
                >
                  {product.ProductName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}
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
