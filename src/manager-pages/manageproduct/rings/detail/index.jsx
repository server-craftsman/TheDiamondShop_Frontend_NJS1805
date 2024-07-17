import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Descriptions, Form, Input, InputNumber, Modal, notification, Spin } from "antd";
import "./index.scss"; // Import the CSS file

function ViewRingDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [ringDetail, setRingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [isEditRingVisible, setIsEditRingVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const ringDetailResponse = await axios.get(`http://localhost:8090/products/rings/${id}`);
      setRingDetail(ringDetailResponse.data);

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

  const handleEditRings = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditRingVisible(true); // Show the modal
    form.setFieldsValue({
      ringStyle: record.RingStyle,
      nameRings: record.NameRings,
      category: record.Category,
      brandName: record.BrandName,
      material: record.Material,
      centerGemstone: record.CenterGemstone,
      centerGemstoneShape: record.CenterGemstoneShape,
      width: record.Width,
      centerDiamondDimension: record.CenterDiamondDimension,
      weight: record.Weight,
      gemstoneWeight: record.GemstoneWeight,
      centerDiamondColor: record.CenterDiamondColor,
      centerDiamondClarity: record.CenterDiamondClarity,
      centerDiamondCaratWeight: record.CenterDiamondCaratWeight,
      ringSize: record.RingSize,
      price: record.Price,
      gender: record.Gender,
      fluorescence: record.Fluorescence,
      description: record.Description,
      imageRings: record.ImageRings,
      imageBrand: record.ImageBrand,
      inventory: record.Inventory,
    });
  };

  const handleUpdateRings = async (values) => {
    try {
      await axios.put(
        "http://localhost:8090/products/edit-diamond-rings",
        values
      );
      fetchData(); // Refresh the list
      setIsEditRingVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: 'Success',
        description: 'Diamond Ring edited successfully!',
      });
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditRingVisible(false);
    form.resetFields();
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="detail">
      <Descriptions title="Rings Details" className="descriptions">
        <Descriptions.Item label="Ring Style">
          {ringDetail?.RingStyle}
        </Descriptions.Item>
        <Descriptions.Item label="Name Rings">
          {ringDetail?.NameRings}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {ringDetail?.Category}
        </Descriptions.Item>
        <Descriptions.Item label="Brand Name">
          {ringDetail?.BrandName}
        </Descriptions.Item>
        <Descriptions.Item label="Image Brand">
          <img
            src={ringDetail?.ImageBrand}
            alt="Bridal"
            className="brand-image"
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
        <Descriptions.Item label="Center Gemstone">
          {ringDetail?.CenterGemstone}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {ringDetail?.Price}
        </Descriptions.Item>
        <Descriptions.Item label="Inventory">
          {ringDetail?.Inventory}
        </Descriptions.Item>
        <Descriptions.Item label="Image Rings">
          <img
            src={ringDetail?.ImageRings}
            alt="Bridal"
            className="rings-image"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Center Gemstone Shape">
          {ringDetail?.CenterGemstoneShape}
        </Descriptions.Item>
        <Descriptions.Item label="Width">
          {ringDetail?.Width}
        </Descriptions.Item>
        <Descriptions.Item label="Center Diamond Dimension">
          {ringDetail?.CenterDiamondDimension}
        </Descriptions.Item>
        <Descriptions.Item label="CenterDiamond">
          {ringDetail?.CenterDiamond}
        </Descriptions.Item>
        <Descriptions.Item label="Weight">
          {ringDetail?.Weight}
        </Descriptions.Item>
        <Descriptions.Item label="Gemstone Weight">
          {ringDetail?.GemstoneWeight}
        </Descriptions.Item>
        <Descriptions.Item label="Center Diamond Color">
          {ringDetail?.CenterDiamondColor}
        </Descriptions.Item>
        <Descriptions.Item label="Center Diamond Clarity">
          {ringDetail?.CenterDiamondClarity}
        </Descriptions.Item>
        <Descriptions.Item label="Center Diamond Carat Weight">
          {ringDetail?.CenterDiamondCaratWeight}
        </Descriptions.Item>
        <Descriptions.Item label="Ring Sizes">
          <div className="ring-sizes-container">
            {ringSizes.map((size) => (
              <div key={size.RingSizeID} className="ring-size-item">
                {size.RingSize}
              </div>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {ringDetail?.Gender}
        </Descriptions.Item>
        <Descriptions.Item label="Fluorescence">
          {ringDetail?.Fluorescence}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {ringDetail?.Description}
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={() => handleEditRings(ringDetail)}>Edit</Button>
      <Button onClick={() => window.history.back()}>Back</Button>
    
      <Modal
        title="Edit Rings"
        open={isEditRingVisible}
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
          onFinish={handleUpdateRings}
          layout="vertical"
        >
          <Form.Item
            name="ringStyle"
            label="Ring Style"
            rules={[
              { required: true, message: "Please input the Ring Style!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nameRings"
            label="Name Rings"
            rules={[
              { required: true, message: "Please input the name Rings!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="BrandName"
            rules={[
              { required: true, message: "Please input the brand Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerGemstone"
            label="CenterGemstone"
            rules={[
              { required: true, message: "Please input the center gemstone!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerGemstoneShape"
            label="CenterGemstoneShape"
            rules={[
              {
                required: true,
                message: "Please input the center gemstone shape!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="width"
            label="Width"
            rules={[{ required: true, message: "Please input the width!" }]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item
            name="centerDiamondDimension"
            label="Center Diamond Dimension"
            rules={[{ required: true, message: "Please input the center Diamond Dimension!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="weight" label="Weight"
            rules={[{ required: true, message: "Please input the weight!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gemstoneWeight" label="Gem stone Weight"
           rules={[{ required: true, message: "Please input the gemstone Weight!" }]}>
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="centerDiamondColor" label="Center Diamond Color"
           rules={[{ required: true, message: "Please input the center Diamond Color!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="centerDiamondClarity" label="Center Diamond Clarity"
           rules={[{ required: true, message: "Please input the center Diamond Clarity!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="centerDiamondCaratWeight"
            label="Center Diamond CaratWeight"
            rules={[{ required: true, message: "Please input the center Diamond Carat Weight!" }]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item name="price" label="Price"
           rules={[{ required: true, message: "Please input the price!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gender" label="Gender"
           rules={[{ required: true, message: "Please input the gender!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fluorescence" label="Fluorescence"
           rules={[{ required: true, message: "Please input the fluorescence!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description"
           rules={[{ required: true, message: "Please input the description!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="imageRings" label="ImageRings"
           rules={[{ required: true, message: "Please input the image Rings!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="imageBrand" label="ImageBrand"
           rules={[{ required: true, message: "Please input the image Brand!" }]}>
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

export default ViewRingDetailPage;
