import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Descriptions, Form, Input, InputNumber, Modal, notification, Spin, Upload } from "antd";
import "./index.scss"
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function ViewBridalDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [bridalDetail, setBridalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [isEditBridalVisible, setIsEditBridalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBridal, setEditingBridal] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const brialDetailResponse = await axios.get(`http://localhost:8090/products/bridals/${id}`);
      setBridalDetail(brialDetailResponse.data);

      const materialsResponse = await axios.get('http://localhost:8090/products/material-details');
      setMaterials(materialsResponse.data);

      const ringSizesResponse = await axios.get('http://localhost:8090/products/ring-size-details');
      setRingSizes(ringSizesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleEditBridals = (record) => {
    setEditingBridal(record);
    setIsEditBridalVisible(true); // Show the modal
    form.setFieldsValue({
      bridalStyle: record.BridalStyle,
      nameBridal: record.NameBridal,
      category: record.Category,
      brandName: record.BrandName,
      material: record.Material,
      settingType: record.SettingType,
      gender: record.Gender,
      weight: record.Weight,
      centerDiamond: record.CenterDiamond,
      diamondCaratRange: record.DiamondCaratRange,
      ringSizeRange: record.RingSizeRang,
      totalCaratweight: record.TotalCaratWeight,
      totalDiamond: record.TotalDiamond,
      description: record.Description,
      price: record.Price,
      imageBridal: record.ImageBridal,
      imageBrand: record.ImageBrand,
      inventory: record.Inventory,
    });
  };

  const handleUpdateBridals = async (values) => {
    try {
      values.imageBridal = imageUrl || values.imageBridal; 
      await axios.put(`http://localhost:8090/products/edit-bridals/`, values);
      fetchData(); // Refresh the list
      setIsEditBridalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: 'Success',
        description: 'Bridals edited successfully!',
      });
    } catch (error) {
      console.error("Error updating bridals:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditBridalVisible(false);
    form.resetFields();
  };

  const handleUpload = (imageBridal) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(imageBridal);
    return false; // Prevent default upload behavior
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="Detail">
      <Descriptions title="Bridal Details">
        <Descriptions.Item label="Bridal Style">
          {bridalDetail?.BridalStyle}
        </Descriptions.Item>
        <Descriptions.Item label="Name Bridal">
          {bridalDetail?.NameBridal}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {bridalDetail?.Category}
        </Descriptions.Item>
        <Descriptions.Item label="Brand Name">
          {bridalDetail?.BrandName}
        </Descriptions.Item>
        <Descriptions.Item label="Image Brand">
          <img
            src={bridalDetail?.ImageBrand}
            alt="Bridal"
            style={{ width: "100px", height: "auto" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Material">
          <div className="materials-container">
            {materials.map((material) => (
              <div key={material.MaterialID} className="material-item">
                {material.MaterialName}
              </div>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Ring Size Rang">
          <div className="ring-sizes-container">
            {ringSizes.map((size) => (
              <div key={size.RingSizeID} className="ring-size-item">
                {size.RingSize}
              </div>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {bridalDetail?.Price}
        </Descriptions.Item>
        <Descriptions.Item label="Inventory">
          {bridalDetail?.Inventory}
        </Descriptions.Item>
        <Descriptions.Item label="Image Bridal">
          <img
            src={bridalDetail?.ImageBridal}
            alt="Bridal"
            style={{ width: "100px", height: "auto" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="SettingType">
          {bridalDetail?.SettingType}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {bridalDetail?.Gender}
        </Descriptions.Item>
        <Descriptions.Item label="Weight">
          {bridalDetail?.Weight}
        </Descriptions.Item>
        <Descriptions.Item label="CenterDiamond">
          {bridalDetail?.CenterDiamond}
        </Descriptions.Item>
        <Descriptions.Item label="DiamondCaratRange">
          {bridalDetail?.DiamondCaratRange}
        </Descriptions.Item>
        <Descriptions.Item label="TotalDiamond">
          {bridalDetail?.TotalDiamond}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {bridalDetail?.Description}
        </Descriptions.Item>
        {/* Add more details as per your schema */}
      </Descriptions>
      <Button onClick={() => handleEditBridals(bridalDetail)}>Edit</Button>
      <Button onClick={() => window.history.back()}>Back</Button>
      <Modal
        title="Edit Bridal"
        open={isEditBridalVisible}
        onCancel={handleCancelEdit}
        footer={[
          <Button key="cancel" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleUpdateBridals}
          layout="vertical"
        >
          <Form.Item
            name="bridalStyle"
            label="Bridal Style"
            rules={[
              { required: true, message: "Please input the Bridal Style!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nameBridal"
            label="Name Bridal"
            rules={[
              { required: true, message: "Please input the Name Bridal!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the Category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please input the Brand Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="settingType"
            label="Setting Type"
            rules={[
              { required: true, message: "Please input the Setting Type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the Gender!" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="imageBridal"
            label="Image Bridal URL"
            rules={[
              { required: true, message: "Please input the Image Bridal URL!" },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            name="imageBridal"
            label="Upload Image Bridal"
            rules={[
              { required: true, message: "Please upload an image Bridal!" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={handleUpload}
              showUploadList={false}
              maxCount={1}
              accept="image/*"
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload>
          </Form.Item>
          {imageUrl && (
            <div style={{ marginTop: 20 }}>
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{ width: "100%", maxWidth: 400 }}
              />
            </div>
          )}

          <Form.Item name="weight" label="Weight"
          rules={[{ required: true, message: "Please input the weight!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="centerDiamond" label="Center Diamond"
          rules={[{ required: true, message: "Please input the center Diamond!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="diamondCaratRange" label="Diamond Carat Range"
          rules={[{ required: true, message: "Please input the diamond Carat Range!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="totalCaratweight" label="Total Carat Weight"
          rules={[{ required: true, message: "Please input the total Carat weight!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="totalDiamond" label="Total Diamond"
          rules={[{ required: true, message: "Please input the total Diamond!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="inventory"
            label="Inventory"
            rules={[
              {
                required: true,
                message: "Please input the inventory (1 or 0)!",
              },
              {
                validator: (_, value) => {
                  if (value === 1 || value === 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Inventory must be either 1 or 0!")
                  );
                },
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewBridalDetailPage;
