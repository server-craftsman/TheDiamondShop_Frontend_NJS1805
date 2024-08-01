import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Upload,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { Button, colors } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function ManageTimepiecesPage() {
  const [timepieces, setTimepieces] = useState([]);
  const [isAddTimepiecesVisible, setIsAddTimepiecesVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageTimepiecesPreview, setImageTimepiecesPreview] = useState(null);
  // const [imageBrandPreview, setImageBrandPreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/timepieces"
      );
      setTimepieces(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddTimepieces = async (values) => {
    try {
      const imageData = await fileToBase64(values.imageTimepieces[0]); // Pass the correct file object
      // const imagebrand = await fileToBase64(values.imageBrand[0]);
      const updatedValues = {
        ...values,
        imageTimepieces: imageData,
        // imageBrand: imagebrand,
      };

      await axios.post(
        "http://localhost:8090/products/add-timepieces",
        updatedValues
      );
      fetchData(); // Refresh the list
      setIsAddTimepiecesVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: "Success",
        description: "Timepieces added successfully!",
      });
    } catch (error) {
      console.error("Error adding timepieces:", error);
      notification.error({
        message: "Error",
        description: "Failed to add timepieces.",
      });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file.originFileObj); // Ensure you're accessing originFileObj
    });
  };

  const handleImageTimepiecesChange = (info) => {
    const fileList = [...info.fileList];
    if (fileList.length > 0) {
      const image = fileList[0].originFileObj;
      fileToBase64(image).then((dataUrl) => {
        setImageTimepiecesPreview(dataUrl);
      });
    } else {
      setImageTimepiecesPreview(null);
    }
  };

  // const handleImageBrandChange = (info) => {
  //   const fileList = [...info.fileList];
  //   if (fileList.length > 0) {
  //     const image = fileList[0].originFileObj;
  //     fileToBase64(image).then((dataUrl) => {
  //       setImageBrandPreview(dataUrl);
  //     });
  //   } else {
  //     setImageBrandPreview(null);
  //   }
  // };

  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 0");
    }
    return Promise.resolve();
  };
  const columns = [
    {
      title: "No",
      dataIndex: "DiamondTimepiecesID",
      key: "DiamondTimepiecesID",
    },
    {
      title: "Timepieces Style",
      dataIndex: "TimepiecesStyle",
      key: "TimepiecesStyle",
    },
    {
      title: "Name Timepieces",
      dataIndex: "NameTimepieces",
      key: "NameTimepieces",
    },
    {
      title: "Collection",
      dataIndex: "Collection",
      key: "Collection",
    },
    {
      title: "Water Resistance",
      dataIndex: "WaterResistance",
      key: "WaterResistance",
    },
    {
      title: "Crystal Type",
      dataIndex: "CrystalType",
      key: "CrystalType",
    },
    {
      title: "Bracelet Material",
      dataIndex: "BraceletMaterial",
      key: "BraceletMaterial",
    },
    {
      title: "Brand Name",
      dataIndex: "BrandName",
      key: "BrandName",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Image Timepieces",
      dataIndex: "ImageTimepieces",
      key: "ImageTimepieces",
      render: (text, record) => (
        <img
          src={record.ImageTimepieces}
          alt="Timepieces"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/timepieces-details/${record.DiamondTimepiecesID}`}>
          <Button>View Details</Button>
        </Link>
      ),
    },
  ];

  const validateTimepiecesStyle = (rule, value) => {
    // Check if value matches the regex pattern
    const regex = /^[A-Z]{2}\d{4}-\d{2}[A-Z]$/;
    if (!regex.test(value)) {
      return Promise.reject(
        "Invalid Timepieces Style format. It should be in the format XX1234-65X."
      );
    }

    // Check if value exists in the fetched data
    const exists = timepieces.some((item) => item.TimepiecesStyle === value);
    if (exists) {
      return Promise.reject("Timepieces Style already exists.");
    }

    return Promise.resolve();
  };

  const validateNameTimepieces = (rule, value) => {
    // Check if value exists in the fetched data
    const exists = timepieces.some((item) => item.NameTimepieces === value);
    if (exists) {
      return Promise.reject("Name Timepieces already exists.");
    }

    return Promise.resolve();
  };

  return (
    <>
      <h1>Timepieces</h1>
      <Button
        style={{ color: "#000", border: "1px solid", fontSize: "20px" }}
        type="primary"
        onClick={() => setIsAddTimepiecesVisible(true)}
      >
        Add Timepieces
      </Button>
      <Table dataSource={timepieces} columns={columns} rowKey="DiamondID" />

      <Modal
        title="Add Timepieces"
        open={isAddTimepiecesVisible}
        onCancel={() => setIsAddTimepiecesVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTimepieces}>
          <Form.Item
            name="timepiecesStyle"
            label="Timepieces Style (XX1234-65X)"
            rules={[
              { required: true, message: "Please input the Timepieces Style!" },
              { validator: validateTimepiecesStyle },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameTimepieces"
            label="Name Timepieces"
            rules={[
              { required: true, message: "Please input the Name Timepieces!" },
              { validator: validateNameTimepieces },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="collection"
            label="Collection"
            rules={[
              { required: true, message: "Please input the Collection!" },
            ]}
          >
            <Select>
              <Select.Option value="Sport Luxury - Radio Control">
                Sport Luxury - Radio Control
              </Select.Option>
              <Select.Option value="Sport Luxury - Carson">
                Sport Luxury - Carson
              </Select.Option>
              <Select.Option value="Sport Luxury - Sport">
                Sport Luxury - Sport
              </Select.Option>
              <Select.Option value="Dress/Classic Eco - Corso">
                Dress/Classic Eco - Corso
              </Select.Option>
              <Select.Option value="Dress/Classic Eco - Arcly">
                Dress/Classic Eco - Arcly
              </Select.Option>
              <Select.Option value="Dress/Classic Eco - Rolan">
                Dress/Classic Eco - Rolan
              </Select.Option>
              <Select.Option value="Dress/Classic Eco - Bianca">
                Dress/Classic Eco - Bianca
              </Select.Option>
              <Select.Option value="Dress/Classic Eco - Crystal Eco">
                Dress/Classic Eco - Crystal Eco
              </Select.Option>
              <Select.Option value="Dress/Classic Eco - Classic Eco">
                Dress/Classic Eco - Classic Eco
              </Select.Option>
              <Select.Option value="Promaster Eco - Dive">
                Promaster Eco - Dive
              </Select.Option>
              <Select.Option value="Promaster Eco - Northern Hemisphere">
                Promaster Eco - Northern Hemisphere
              </Select.Option>
              <Select.Option value="Modern Eco - Axiom">
                Modern Eco - Axiom
              </Select.Option>
              <Select.Option value="Weekender - Sport Casual">
                Weekender - Sport Casual
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="waterResistance"
            label="Water Resistance"
            rules={[
              { required: true, message: "Please input the Water Resistance!" },
            ]}
          >
            <Select>
              <Select.Option value="0030M">0030M</Select.Option>
              <Select.Option value="0050M">0050M</Select.Option>
              <Select.Option value="0100M">0100M</Select.Option>
              <Select.Option value="0200M">0200M</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="crystalType"
            label="Crystal Type"
            rules={[
              { required: true, message: "Please input the Crystal Type!" },
            ]}
          >
            <Select>
              <Select.Option value="Anti-Reflective Sapphire Crystal">
                Anti-Reflective Sapphire Crystal
              </Select.Option>
              <Select.Option value="Curved Sapphire Crystal">
                Curved Sapphire Crystal
              </Select.Option>
              <Select.Option value="Domed Mineral Crystal">
                Domed Mineral Crystal
              </Select.Option>
              <Select.Option value="Mineral Crystal">
                Mineral Crystal
              </Select.Option>
              <Select.Option value="Spherical Sapphire Crystal">
                Spherical Sapphire Crystal
              </Select.Option>
              <Select.Option value="Sapphire Crystal">
                Sapphire Crystal
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="braceletMaterial"
            label="Bracelet Material"
            rules={[
              {
                required: true,
                message: "Please input the Bracelet Material!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Blue Rubber Strap">
                Blue Rubber Strap
              </Select.Option>
              <Select.Option value="Brown Leather Strap">
                Brown Leather Strap
              </Select.Option>
              <Select.Option value="Black Leather Strap">
                Black Leather Strap
              </Select.Option>
              <Select.Option value="Gray Stainless Steel Bracelet">
                Gray Stainless Steel Bracelet
              </Select.Option>
              <Select.Option value="Gold-Tone Stainless Steel Bracelet">
                Gold-Tone Stainless Steel Bracelet
              </Select.Option>
              <Select.Option value="Two-Tone Stainless Steel Bracelet">
                Two-Tone Stainless Steel Bracelet
              </Select.Option>
              <Select.Option value="Pink Polyurethane Strap">
                Pink Polyurethane Strap
              </Select.Option>
              <Select.Option value="Silver-Tone Stainless Steel Bracelet">
                Silver-Tone Stainless Steel Bracelet
              </Select.Option>
              <Select.Option value="Silver-Tone Super Titanium Bracelet">
                Silver-Tone Super Titanium Bracelet
              </Select.Option>
              <Select.Option value="Rose Gold-Tone Stainless Steel Bracelet">
                Rose Gold-Tone Stainless Steel Bracelet
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="caseSize"
            label="Case Size (28mm - 48mm)"
            rules={[
              { required: true, message: "Please input the Case Size!" },
              {
                validator: (_, value) => {
                  if (value < 28 || value > 48) {
                    return Promise.reject(
                      new Error(
                        "Standard value of Case Size is from 28mm to 48mm!"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dialColor"
            label="Dial Color"
            rules={[
              { required: true, message: "Please input the Dial Color!" },
            ]}
          >
            <Select>
              <Select.Option value="Blue">Blue</Select.Option>
              <Select.Option value="Black">Black</Select.Option>
              <Select.Option value="Light Blue">Light Blue</Select.Option>
              <Select.Option value="White">White</Select.Option>
              <Select.Option value="Gray">Gray</Select.Option>
              <Select.Option value="Red">Red</Select.Option>
              <Select.Option value="Taupe">Taupe</Select.Option>
              <Select.Option value="Green">Green</Select.Option>
              <Select.Option value="Silver-Tone">Silver-Tone</Select.Option>
              <Select.Option value="Pink">Pink</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="movement"
            label="Movement"
            rules={[{ required: true, message: "Please input the Movement!" }]}
          >
            <Select>
              <Select.Option value="Eco-Drive">Eco-Drive</Select.Option>
              <Select.Option value="Eco-Drive Ring">
                Eco-Drive Ring
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the Gender!" }]}
          >
            <Select>
              <Select.Option value="Men">Men</Select.Option>
              <Select.Option value="Women">Women</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the Category!" }]}
            initialValue="Timepieces"
          >
            <Input disabled placeholder="Timepieces" />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the Brand Name!" },
            ]}
            initialValue="Citizen"
          >
            <Input disabled placeholder="Citizen" />
          </Form.Item>
          <Form.Item
            name="dialType"
            label="Dial Type"
            rules={[{ required: true, message: "Please input the Dial Type!" }]}
          >
            <Select>
              <Select.Option value="Diamond">Diamond</Select.Option>
              <Select.Option value="Crystal">Crystal</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the Description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (greater than 0)"
            rules={[
              { required: true, message: "Please input the Price!" },
              { validator: validatePrice },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="imageTimepieces"
            label="Image Timepieces"
            rules={[
              {
                required: true,
                message: "Please upload the Image Timepieces!",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleImageTimepiecesChange}
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {imageTimepiecesPreview && (
              <img
                src={imageTimepiecesPreview}
                alt="Timepieces Preview"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginTop: "10px",
                }}
              />
            )}
          </Form.Item>

          {/* <Form.Item
            name="imageBrand"
            label="Image Brand"
            rules={[
              {
                required: true,
                message: "Please upload the Image Brand!",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleImageBrandChange}
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
            {imageBrandPreview && (
              <div style={{ marginTop: 20 }}>
                <img
                  src={imageBrandPreview}
                  alt="Brand Preview"
                  style={{
                    width: "100%",
                    maxWidth: 400,
                  }}
                />
              </div>
            )}
          </Form.Item> */}

          <Form.Item
            name="imageBrand"
            label="Image Brand"
            initialValue="https://collections.jewelryimages.net/collections_logos/Citizen_logo_white.jpg"
          >
            {/* <Input disabled /> */}
            <div style={{ marginTop: 20 }}>
              <img
                src="https://collections.jewelryimages.net/collections_logos/Citizen_logo_white.jpg"
                alt="Brand Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              style={{ color: "#000", border: "1px solid", fontSize: "20px" }}
              type="primary"
              htmlType="submit"
            >
              Add Timepieces
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageTimepiecesPage;
