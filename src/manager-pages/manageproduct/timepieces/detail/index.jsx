import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Descriptions,
  Input,
  InputNumber,
  Modal,
  Spin,
  Form,
  notification,
} from "antd";
//import "./index.scss"
function ViewTimepiecesDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [timepiecesDetail, setTimepiecesDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditTimepiecesVisible, setIsEditTimepiecesVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTimepiecesDetail();
  }, [id]);

  const fetchTimepiecesDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/products/timepieces/${id}`
      );
      setTimepiecesDetail(response.data);
    } catch (error) {
      console.error("Error fetching bridal details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTimepieces = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditTimepiecesVisible(true); // Show the modal
    form.setFieldsValue({
      timepiecesStyle: record.TimepiecesStyle,
      nameTimepieces: record.NameTimepieces,
      collection: record.Collection,
      waterResistance: record.WaterResistance,
      crystalType: record.CrystalType,
      braceletMaterial: record.BraceletMaterial,
      caseSize: record.CaseSize,
      dialColor: record.DialColor,
      movement: record.Movement,
      gender: record.Gender,
      category: record.Category,
      brandName: record.BrandName,
      dialType: record.DialType,
      description: record.Description,
      price: record.Price,
      imageTimepieces: record.ImageTimepieces,
      imageBrand: record.ImageBrand,
      inventory: record.Inventory,
    });
  };

  const handleUpdateTimepieces = async (values) => {
    try {
      await axios.put("http://localhost:8090/products/edit-timepieces", values);
      fetchTimepiecesDetail(); // Refresh the list
      setIsEditTimepiecesVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: 'Success',
        description: 'Timepieces edited successfully!',
      });
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditTimepiecesVisible(false);
    form.resetFields();
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="Detail">
      <Descriptions title="Timepieces Details">
        <Descriptions.Item label="Timepieces Style">
          {timepiecesDetail?.TimepiecesStyle}
        </Descriptions.Item>
        <Descriptions.Item label="Name Timepieces">
          {timepiecesDetail?.NameTimepieces}
        </Descriptions.Item>
        <Descriptions.Item label="Collection">
          {timepiecesDetail?.Collection}
        </Descriptions.Item>
        <Descriptions.Item label="Brand Name">
          {timepiecesDetail?.BrandName}
        </Descriptions.Item>
        <Descriptions.Item label="Image Brand">
          <img
            src={timepiecesDetail?.ImageBrand}
            alt="Bridal"
            style={{ width: "100px", height: "auto" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Water Resistance">
          {timepiecesDetail?.WaterResistance}
        </Descriptions.Item>
        <Descriptions.Item label="Crystal Type">
          {timepiecesDetail?.CrystalType}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {timepiecesDetail?.Price}
        </Descriptions.Item>
        <Descriptions.Item label="Inventory">
          {timepiecesDetail?.Inventory}
        </Descriptions.Item>
        <Descriptions.Item label="Image Timepieces">
          <img
            src={timepiecesDetail?.ImageTimepieces}
            alt="Bridal"
            style={{ width: "100px", height: "auto" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Bracelet Material">
          {timepiecesDetail?.BraceletMaterial}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {timepiecesDetail?.Gender}
        </Descriptions.Item>
        <Descriptions.Item label="Case Size">
          {timepiecesDetail?.CaseSize}
        </Descriptions.Item>
        <Descriptions.Item label="Dial Color">
          {timepiecesDetail?.DialColor}
        </Descriptions.Item>
        <Descriptions.Item label="Movement">
          {timepiecesDetail?.Movement}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {timepiecesDetail?.Category}
        </Descriptions.Item>
        <Descriptions.Item label="Dial Type">
          {timepiecesDetail?.DialType}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {timepiecesDetail?.Description}
        </Descriptions.Item>
        {/* Add more details as per your schema */}
      </Descriptions>
      <Button onClick={() => handleEditTimepieces(timepiecesDetail)}>
        Edit
      </Button>
      <Button onClick={() => window.history.back()}>Back</Button>

      <Modal
        title="Edit Rings"
        open={isEditTimepiecesVisible}
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
        <Form form={form} onFinish={handleUpdateTimepieces} layout="vertical">
          <Form.Item
            name="timepiecesStyle"
            label="Timepieces Style"
            rules={[
              { required: true, message: "Please input the Timepieces Style!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nameTimepieces"
            label="Name Timepieces"
            rules={[
              { required: true, message: "Please input the name Timepieces!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="collection"
            label="Collection"
            rules={[
              { required: true, message: "Please input the collection!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="waterResistance"
            label="Water Resistance"
            rules={[
              { required: true, message: "Please input water resistance!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="crystalType"
            label="Crystal Type"
            rules={[
              { required: true, message: "Please input the crystal type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="braceletMaterial"
            label="BraceletMaterial"
            rules={[
              {
                required: true,
                message: "Please input the bracelet material!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caseSize"
            label="CaseSize"
            rules={[{ required: true, message: "Please input the case size!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dialColor"
            label="DialColor"
            rules={[
              { required: true, message: "Please input the dial color!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="movement"
            label="Movement"
            rules={[{ required: true, message: "Please input the movement!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the gender!" }]}
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
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the brand Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dialType"
            label="Dial Type"
            rules={[{ required: true, message: "Please input the dial Type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="imageTimepieces"
            label="Image Timepieces"
            rules={[
              { required: true, message: "Please input the image Timepieces!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageBrand"
            label="Image Brand"
            rules={[
              { required: true, message: "Please input the image Brand!" },
            ]}
          >
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

export default ViewTimepiecesDetailPage;
