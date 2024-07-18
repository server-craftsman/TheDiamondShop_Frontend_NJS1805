import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Spin,
  Upload,
} from "antd";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function ViewDiamondDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [diamondDetail, setDiamondDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchDiamondDetail();
  }, [id]);

  const fetchDiamondDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/products/diamonds/${id}`
      );
      setDiamondDetail(response.data);
    } catch (error) {
      console.error("Error fetching Diamond details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDiamond = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditModalVisible(true); // Show the modal
    form.setFieldsValue({
      diamondOrigin: record.DiamondOrigin,
      caratWeight: record.CaratWeight,
      color: record.Color,
      clarity: record.Clarity,
      cut: record.Cut,
      price: record.Price,
      shape: record.Shape,
      image: record.Image,
      polish: record.Polish,
      symmetry: record.Symmetry,
      tablePercentage: record.TablePercentage,
      depth: record.Depth,
      measurements: record.Measurements,
      giaReportNumber: record.GIAReportNumber,
      labReportNumber: record.LabReportNumber,
      gemstone: record.Gemstone,
      gradingReport: record.GradingReport,
      descriptors: record.Descriptors,
      fluorescence: record.Fluorescence,
      inventory: record.Inventory,
      stockNumber: record.StockNumber, // Populate StockNumber, but disable input
    });
  };

  const handleUpdateDiamond = async (values) => {
    try {
      values.image = imageUrl || values.image; // Use the uploaded image URL or the existing one
      await axios.put("http://localhost:8090/products/edit-diamond", values);
      fetchDiamondDetail(); // Refresh the list
      setIsEditModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: "Success",
        description: "Diamond edited successfully!",
      });
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleUpload = (image) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(image);
    return false; // Prevent default upload behavior
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Descriptions title="Diamond Details">
        <Descriptions.Item label="Diamond Origin">
          {diamondDetail?.DiamondOrigin}
        </Descriptions.Item>
        <Descriptions.Item label="Carat Weight">
          {diamondDetail?.CaratWeight}
        </Descriptions.Item>
        <Descriptions.Item label="Color">
          {diamondDetail?.Color}
        </Descriptions.Item>
        <Descriptions.Item label="Clarity">
          {diamondDetail?.Clarity}
        </Descriptions.Item>
        <Descriptions.Item label="Image Diamond">
          <img
            src={diamondDetail?.Image}
            alt="Bridal"
            style={{ width: "100px", height: "auto" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Cut">{diamondDetail?.Cut}</Descriptions.Item>
        <Descriptions.Item label="Shape">
          {diamondDetail?.Shape}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {diamondDetail?.Price}
        </Descriptions.Item>
        <Descriptions.Item label="Inventory">
          {diamondDetail?.Inventory}
        </Descriptions.Item>
        <Descriptions.Item label="Polish">
          {diamondDetail?.Polish}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {diamondDetail?.Symmetry}
        </Descriptions.Item>
        <Descriptions.Item label="Depth">
          {diamondDetail?.Depth}
        </Descriptions.Item>
        <Descriptions.Item label="Table Percentage">
          {diamondDetail?.TablePercentage}
        </Descriptions.Item>
        <Descriptions.Item label="Measurements">
          {diamondDetail?.Measurements}
        </Descriptions.Item>
        <Descriptions.Item label="GIAReportNumber">
          {diamondDetail?.GIAReportNumber}
        </Descriptions.Item>
        <Descriptions.Item label="LabReportNumber">
          {diamondDetail?.LabReportNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Gemstone">
          {diamondDetail?.Gemstone}
        </Descriptions.Item>
        <Descriptions.Item label="GradingReport">
          {diamondDetail?.GradingReport}
        </Descriptions.Item>
        <Descriptions.Item label="Descriptors">
          {diamondDetail?.Descriptors}
        </Descriptions.Item>
        <Descriptions.Item label="Fluorescence">
          {diamondDetail?.Fluorescence}
        </Descriptions.Item>
        {/* Add more details as per your schema */}
      </Descriptions>
      <Button onClick={() => handleEditDiamond(diamondDetail)}>Edit</Button>
      <Button onClick={() => window.history.back()}>Back</Button>

      <Modal
        title="Edit Diamond"
        open={isEditModalVisible}
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
        <Form form={form} onFinish={handleUpdateDiamond} layout="vertical">
          <Form.Item
            name="diamondOrigin"
            label="Diamond Origin"
            rules={[
              { required: true, message: "Please input the diamond origin!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Other Form.Item fields */}
          <Form.Item
            name="caratWeight"
            label="Carat Weight"
            rules={[
              { required: true, message: "Please input the carat weight!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please input the color!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="clarity"
            label="Clarity"
            rules={[{ required: true, message: "Please input the clarity!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cut"
            label="Cut"
            rules={[{ required: true, message: "Please input the cut!" }]}
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
            name="shape"
            label="Shape"
            rules={[{ required: true, message: "Please input the shape!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
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
          <Form.Item
            name="polish"
            label="Polish"
            rules={[{ required: true, message: "Please input the polish!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="symmetry"
            label="Symmetry"
            rules={[{ required: true, message: "Please input the symmetry!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tablePercentage"
            label="Table Percentage"
            rules={[
              { required: true, message: "Please input the table Percentage!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="depth"
            label="Depth"
            rules={[{ required: true, message: "Please input the depth!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="measurements"
            label="Measurements"
            rules={[
              { required: true, message: "Please input the measurements!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="giaReportNumber"
            label="GIA Report Number"
            rules={[
              {
                required: true,
                message: "Please input the gia Report Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stockNumber"
            label="Stock Number"
            rules={[
              { required: true, message: "Please input the stock Number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="labReportNumber"
            label="Lab Report Number"
            rules={[
              {
                required: true,
                message: "Please input the lab Report Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gemstone"
            label="Gemstone"
            rules={[{ required: true, message: "Please input the gemstone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gradingReport"
            label="Grading Report"
            rules={[
              { required: true, message: "Please input the grading Report!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descriptors"
            label="Descriptors"
            rules={[
              { required: true, message: "Please input the descriptors!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="fluorescence"
            label="Fluorescence"
            rules={[
              { required: true, message: "Please input the fluorescence!" },
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
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewDiamondDetailPage;
