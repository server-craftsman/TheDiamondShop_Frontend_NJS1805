import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Spin,
  Upload,
} from "antd";
import "./index.scss";
import { Avatar, Button, Divider, Grid, Typography, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getAllFeedbacks } from "../../../../pages/feedback-service/getAllFeedbacks";
import { AuthContext } from "../../../../AuthContext";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

function ViewBridalDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [bridalDetail, setBridalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [ringPrice, setRingPrice] = useState([]);
  const [isEditBridalVisible, setIsEditBridalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBridal, setEditingBridal] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [feedbackBridal, setFeedbackBridal] = useState([]);
  const { user } = useContext(AuthContext);

  //========used to check exist===============//
  const [bridals, setBridals] = useState([]);
  const fetchBridals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/bridals"
      );
      setBridals(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchBridals();
  }, []);
  //=========================================//

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const brialDetailResponse = await axios.get(
        `http://localhost:8090/products/bridals/${id}`
      );
      setBridalDetail(brialDetailResponse.data);

      const materialsResponse = await axios.get(
        `http://localhost:8090/products/bridal-material/${id}`
      );
      setMaterials(materialsResponse.data);

      const ringSizesResponse = await axios.get(
        `http://localhost:8090/products/bridal-size/${id}`
      );
      setRingSizes(ringSizesResponse.data);

      const ringPriceResponse = await axios.get(
        `http://localhost:8090/products/bridal-prices/${id}`
      );
      setRingPrice(ringPriceResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      if (!user || !user.token) {
        console.error("User or token not available");
        return;
      }

      const productType = "Bridal"; // Adjust based on your logic
      const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
      setFeedbackBridal(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeedback();
    }
  }, [id, user]);

  const handleEditBridals = (record) => {
    setEditingBridal(record);
    setIsEditBridalVisible(true); // Show the modal
    form.setFieldsValue({
      bridalID: record.BridalID,
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
        message: "Success",
        description: "Bridals edited successfully!",
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
  //==============validate=============//

  const validateBridalExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = bridals
      .filter(
        (item) =>
          !bridalDetail ||
          (item.BridalStyle !== bridalDetail.BridalStyle &&
            item.NameBridal !== bridalDetail.NameBridalr)
      )
      .some(
        (item) => item.BridalStyle === value || item.NameBridal === value // || another attribute if have
      );

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
  };

  const validateBridalsStyle = (rule, value) => {
    // Check if the value has exactly 10 characters
    // if (value.length !== 10) {
    //   return Promise.reject("Bridals Style must be exactly 10 characters long");
    // }

    // Check if the value has a length between 7 and 10 characters
    if (value.length < 7 || value.length > 10) {
      return Promise.reject(
        "Bridals Style must be between 7 and 10 characters long"
      );
    }

    // Check if the first 5 characters are digits
    const firstPart = value.substring(0, 5);
    if (!/^\d{5}$/.test(firstPart)) {
      return Promise.reject("The first 5 characters must be digits");
    }

    // Check if the hyphen is in the correct position
    if (value[5] !== "-") {
      return Promise.reject("The 6th character must be a hyphen");
    }

    // Check the remaining part after the hyphen
    const secondPart = value.substring(6);
    if (!/^([A-Z0-9]+)$/.test(secondPart)) {
      return Promise.reject(
        "The characters after the hyphen can be letters (uppercase), numbers."
      );
    }

    // Check if there are two consecutive hyphens in the second part
    if (secondPart.includes("--")) {
      return Promise.reject(
        'The "-" signs cannot be placed next to each other'
      );
    }

    return Promise.resolve();
  };

  const validateWeight = (rule, value) => {
    const Weight = parseFloat(value);
    if (isNaN(Weight) || Weight < 2 || Weight > 3.6) {
      return Promise.reject(
        "Weight must be a decimal number between 2 and 3.6 mm"
      );
    }
    return Promise.resolve();
  };

  const validateDiamondCaratRange = (rule, value) => {
    // Split the input value by the dash character
    const parts = value.split("-");

    // Ensure there are exactly two parts
    if (parts.length !== 2) {
      // if (parts.length <10) {
      return Promise.reject(
        "Invalid format. Use the format: Decimal 1 - Decimal 2"
      );
    }

    // Parse the parts as floating-point numbers
    const decimal1 = parseFloat(parts[0]);
    const decimal2 = parseFloat(parts[1]);

    // Validate that both parts are numbers and within the correct range
    if (
      isNaN(decimal1) ||
      isNaN(decimal2) ||
      decimal1 <= 0 ||
      decimal1 >= 1 ||
      decimal2 <= 0 ||
      decimal2 > 1 ||
      decimal1 >= decimal2
    ) {
      return Promise.reject(
        "Invalid range. Ensure Decimal 1 < Decimal 2, and both are within (0, 1]"
      );
    }

    return Promise.resolve();
  };

  const validateTotalCaratWeight = (rule, value) => {
    const caratWeight = parseFloat(value);
    if (isNaN(caratWeight) || caratWeight <= 0 || caratWeight > 5) {
      return Promise.reject(
        "Total carat weight must be a decimal number greater than 0 and less than or equal to 5"
      );
    }
    return Promise.resolve();
  };

  const validateTotalDiamond = (rule, value) => {
    const totalDiamond = Number(value); // Parse the value as a number
    if (
      !Number.isInteger(totalDiamond) ||
      totalDiamond <= 0 ||
      totalDiamond > 30
    ) {
      return Promise.reject(
        "Total Diamond must be a natural number greater than 0 and less than or equal to 30"
      );
    }
    return Promise.resolve();
  };

  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 1");
    }
    return Promise.resolve();
  };

  //=======================================//
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
          {/* {bridalDetail?.Price} */}
          <div className="ring-price-container">
            {ringPrice.map((price) => (
              <div key={price.PriceID} className="ring-price-item">
                {price.Price}
              </div>
            ))}
          </div>
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
      <hr />
      <Grid item xs={12} md={6}>
        <Box mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Existing Feedbacks
          </Typography>
          <Grid container spacing={3}>
            {feedbackBridal.length > 0 ? (
              feedbackBridal.map((feedback, index) => (
                <React.Fragment key={feedback.id}>
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    {/* Customer Avatar */}
                    <Grid item xs={2} style={{ marginRight: "-12%" }}>
                      <Avatar alt={feedback.LastName} src={feedback.Image} />
                    </Grid>
                    {/* Feedback Details */}
                    <Grid item xs={10} sx={{ paddingLeft: "25px" }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          mb: 1,
                        }}
                      >
                        {feedback.FirstName} {feedback.LastName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontStyle: "italic",
                          color: "text.secondary",
                          mb: 1,
                        }}
                      >
                        Evaluation Date:{" "}
                        {new Date(feedback.EvaluationDate).toLocaleDateString()}
                      </Typography>
                      <Rating
                        name={`rating-${feedback.id}`}
                        value={feedback.Rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Typography sx={{ mt: 1 }}>{feedback.Content}</Typography>
                    </Grid>
                  </Grid>
                  {index < feedbackBridal.length - 1 && (
                    <Divider
                      variant="middle"
                      sx={{
                        my: 2,
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      }}
                    />
                  )}
                  {index < feedbackBridal.length - 1 && (
                    <hr
                      style={{
                        width: "100%",
                        borderTop: "1px dashed black",
                        marginBottom: "16px",
                      }}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
                No feedback available
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
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
        <Form form={form} onFinish={handleUpdateBridals} layout="vertical">
          {/* <Form.Item
            name="bridalID"
            label="Bridal ID"
            rules={[{ required: true, message: "Please input the Bridal ID!" }]}
          >
            <Input disabled />
          </Form.Item> */}

          <Form.Item
            name="bridalStyle"
            label="Bridal Style (12345-EX10)"
            rules={[
              { required: true, message: "Please input the Bridal Style!" },
              { validator: validateBridalsStyle },
              { validator: validateBridalExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameBridal"
            label="Name Bridal"
            rules={[
              { required: true, message: "Please input the Name Bridal!" },
              { validator: validateBridalExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the Category!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the Brand Name!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="settingType"
            label="Setting Type"
            rules={[
              { required: true, message: "Please input the Setting Type!" },
            ]}
          >
            <Select>
              <Select.Option value="Halo">Halo</Select.Option>
              <Select.Option value="Three Stone">Three Stone</Select.Option>
              <Select.Option value="Single Row">Single Row</Select.Option>
              <Select.Option value="Multi Row">Multi Row</Select.Option>
              <Select.Option value="Antique">Antique</Select.Option>
              <Select.Option value="Bypass">Bypass</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the Gender!" }]}
          >
            <Input disabled />
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

          <Form.Item
            name="weight"
            label="Weight (2g - 3.6g)"
            rules={[
              { required: true, message: "Please input the weight!" },
              { validator: validateWeight },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="centerDiamond"
            label="Center Diamond"
            rules={[
              { required: true, message: "Please input the center Diamond!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="diamondCaratRange"
            label="Diamond Carat Range (0,2 - 0,4)"
            rules={[
              {
                required: true,
                message: "Please input the diamond Carat Range!",
              },
              { validator: validateDiamondCaratRange },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalCaratweight"
            label="Total Carat Weight (0.1)"
            rules={[
              {
                required: true,
                message: "Please input the total Carat weight!",
              },
              { validator: validateTotalCaratWeight },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalDiamond"
            label="Total Diamond (25)"
            rules={[
              { required: true, message: "Please input the total Diamond!" },
              { validator: validateTotalDiamond },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
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
          {/* <Form.Item name="price" label="Price"
          rules={[{ required: true, message: "Please input the price!" },
            {validator: validatePrice},
          ]}>
            <InputNumber style={{width: "100%"}}/>
          </Form.Item> */}
          <Form.Item
            name="inventory"
            label="Inventory"
            rules={[
              {
                required: true,
                message: "Please input the inventory quantity!",
              },
            ]}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input the inventory (1 or 0)!",
            //   },
            //   {
            //     validator: (_, value) => {
            //       if (value === 1 || value === 0) {
            //         return Promise.resolve();
            //       }
            //       return Promise.reject(
            //         new Error("Inventory must be either 1 or 0!")
            //       );
            //     },
            //   },
            // ]}
          >
            {/* <InputNumber style={{ width: "100%" }} /> */}
            <Select>
              <Select.Option value="0">0</Select.Option>
              <Select.Option value="1">1</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewBridalDetailPage;
