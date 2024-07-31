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
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getAllFeedbacks } from "../../../../pages/feedback-service/getAllFeedbacks";
import { AuthContext } from "../../../../AuthContext";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

function ViewDiamondDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [diamondDetail, setDiamondDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [feedbackDiamond, setFeedbackDiamond] = useState([]);
  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
  const [diamonds, setDiamonds] = useState([]);

  //=====================================================

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/diamonds"
      );
      setDiamonds(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFeedback = async () => {
    try {
      if (!user || !user.token) {
        console.error("User or token not available");
        return;
      }

      const productType = "Diamond"; // Adjust based on your logic
      const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
      setFeedbackDiamond(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeedback();
    }
  }, [id, user]);

  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 1");
    }
    return Promise.resolve();
  };

  const handleEditDiamond = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditModalVisible(true); // Show the modal
    form.setFieldsValue({
      diamondID: record.DiamondID,
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
  //=====================validate diamond==========================//
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

  const validateTablePercentageAndDepth = (rule, value) => {
    // Check if the value is a number and between 1 and 100
    if (value < 1 || value > 100) {
      return Promise.reject("The percentage must be between 1 and 100.");
    }

    return Promise.resolve();
  };

  const validateDiamondMeasurements = (rule, value) => {
    // Define a regular expression to match a pattern like "length x width x depth"
    const regex = /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?$/;

    // Check if the value matches the pattern
    if (!regex.test(value)) {
      return Promise.reject(
        'Measurements must be in the format "length x width x depth" with positive numbers. EX: 6.75x4.25x2.86'
      );
    }

    // Split the measurements and convert them to numbers
    const [length, width, depth] = value
      .split("x")
      .map((num) => parseFloat(num.trim()));

    // Check if the measurements are positive numbers and within a reasonable range
    if (length <= 0 || width <= 0 || depth <= 0) {
      return Promise.reject("All measurements must be positive numbers.");
    }

    return Promise.resolve();
  };

  const validateDiamondExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = diamonds
      .filter(
        (item) =>
          !diamondDetail ||
          (item.GIAReportNumber !== diamondDetail.GIAReportNumber &&
            item.StockNumber !== diamondDetail.StockNumber &&
            item.LabReportNumber !== diamondDetail.LabReportNumber)
      )
      .some(
        (item) =>
          item.GIAReportNumber === value ||
          item.StockNumber === value ||
          item.LabReportNumber === value
      );

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
  };

  const validateReportNumAndLabNum = (rule, value) => {
    const regex = /^\d{10}$/; // Regular expression to check if value is exactly 10 digits

    if (!regex.test(value)) {
      return Promise.reject(
        "The input value must be a 10-digit natural number. EX: 1234567890"
      );
    }

    return Promise.resolve();
  };

  const validateStockNumber = (rule, value) => {
    // Define a regular expression to match the format "D60057-01"
    const regex = /^[A-Z]\d{5}-\d{2}$/;

    // Check if the value matches the pattern
    if (!regex.test(value)) {
      return Promise.reject(
        'Stock Number must be in the format is: A capital letter followed by 5 digits separated by a hyphen "-" and 2 digits. EX: "D12345-67".'
      );
    }

    return Promise.resolve();
  };

  //======================================================================
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
      <Button style={{ color: "#000", border: "1px solid", fontSize: "20px", margin: "30px 15px 20px 0" }} onClick={() => handleEditDiamond(diamondDetail)}>Edit</Button>
      <Button style={{ color: "#000", border: "1px solid", fontSize: "20px", margin: "30px 0 20px 0" }} onClick={() => window.history.back()}>Back</Button>
      <hr />
      <Grid item xs={12} md={6}>
        <Box mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Existing Feedbacks
          </Typography>
          <Grid container spacing={3}>
            {feedbackDiamond.length > 0 ? (
              feedbackDiamond.map((feedback, index) => (
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
                  {index < feedbackDiamond.length - 1 && (
                    <Divider
                      variant="middle"
                      sx={{
                        my: 2,
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      }}
                    />
                  )}
                  {index < feedbackDiamond.length - 1 && (
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
            name="diamondID"
            label="Diamond ID"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="diamondOrigin"
            label="Diamond Origin"
            rules={[
              { required: true, message: "Please input the diamond origin!" },
            ]}
          >
            <Select>
              <Select.Option value="natural">natural</Select.Option>
              <Select.Option value="artificial">artificial</Select.Option>
            </Select>
          </Form.Item>
          {/* Other Form.Item fields */}
          <Form.Item
            name="caratWeight"
            label="Carat Weight (0.1 - 3)"
            rules={[
              { required: true, message: "Please input the carat weight!" },
              { validator: validateCaratWeight },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please input the color!" }]}
          >
            <Select>
              <Select.Option value="F">F</Select.Option>
              <Select.Option value="G">G</Select.Option>
              <Select.Option value="I">I</Select.Option>
              <Select.Option value="K">K</Select.Option>
              <Select.Option value="J">J</Select.Option>
              <Select.Option value="E">E</Select.Option>
              <Select.Option value="H">H</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="clarity"
            label="Clarity"
            rules={[{ required: true, message: "Please input the clarity!" }]}
          >
            <Select>
              <Select.Option value="Very Slightly Included">
                Very Slightly Included
              </Select.Option>
              <Select.Option value="Slightly Included">
                Slightly Included
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="cut"
            label="Cut"
            rules={[{ required: true, message: "Please input the cut!" }]}
          >
            <Select>
              <Select.Option value="N/A">N/A</Select.Option>
              <Select.Option value="Very Good">Very Good</Select.Option>
              <Select.Option value="Excellent">Excellent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
              { validator: validatePrice },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="shape"
            label="Shape"
            rules={[{ required: true, message: "Please input the shape!" }]}
          >
            <Select>
              <Select.Option value="Emerald">Emerald</Select.Option>
              <Select.Option value="Round">Round</Select.Option>
              <Select.Option value="Cushion">Cushion</Select.Option>
              <Select.Option value="Princess">Princess</Select.Option>
            </Select>
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
            <Select>
              <Select.Option value="Good">Good</Select.Option>
              <Select.Option value="Very Good">Very Good</Select.Option>
              <Select.Option value="Excellent">Excellent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="symmetry"
            label="Symmetry"
            rules={[{ required: true, message: "Please input the symmetry!" }]}
          >
            <Select>
              <Select.Option value="Good">Good</Select.Option>
              <Select.Option value="Very Good">Very Good</Select.Option>
              <Select.Option value="Excellent">Excellent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tablePercentage"
            label="Table Percentage (1% - 100%)"
            rules={[
              { required: true, message: "Please input the table Percentage!" },
              { validator: validateTablePercentageAndDepth },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="depth"
            label="Depth (1% - 100%)"
            rules={[
              { required: true, message: "Please input the depth!" },
              { validator: validateTablePercentageAndDepth },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="measurements"
            label="Measurements"
            rules={[
              { required: true, message: "Please input the measurements!" },
              { validator: validateDiamondMeasurements },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="giaReportNumber"
            label="GIA Report Number (10 digit numbers)"
            rules={[
              {
                required: true,
                message: "Please input the gia Report Number!",
              },
              { validator: validateDiamondExist },
              { validator: validateReportNumAndLabNum },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stockNumber"
            label="Stock Number (EX: D12345-67)"
            rules={[
              { required: true, message: "Please input the stock Number!" },
              { validator: validateDiamondExist },
              { validator: validateStockNumber },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="labReportNumber"
            label="Lab Report Number (10 digit numbers)"
            rules={[
              {
                required: true,
                message: "Please input the lab Report Number!",
              },
              { validator: validateDiamondExist },
              { validator: validateReportNumAndLabNum },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gemstone"
            label="Gemstone"
            rules={[{ required: true, message: "Please input the gemstone!" }]}
          >
            <Select>
              <Select.Option value="Natural, untreated diamond">
                Natural, untreated diamond
              </Select.Option>
              <Select.Option value="Natural, treated diamond">
                Natural, treated diamond
              </Select.Option>
              <Select.Option value="Artificial, untreated diamond">
                Artificial, untreated diamond
              </Select.Option>
              <Select.Option value="Artificial, treated diamond">
                Artificial, treated diamond
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gradingReport"
            label="Grading Report"
            rules={[{ required: true }]}
          // rules={[
          //   { required: true, message: "Please input the grading Report!" },
          // ]}
          >
            <Input disabled />
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
            <Select>
              <Select.Option value="NON">NON</Select.Option>
              <Select.Option value="MB">MB</Select.Option>
              <Select.Option value="STG BL">STG BL</Select.Option>
              <Select.Option value="FNL BL">FNL BL</Select.Option>
            </Select>
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
