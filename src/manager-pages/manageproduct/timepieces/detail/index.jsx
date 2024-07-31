import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Descriptions,
  Input,
  InputNumber,
  Modal,
  Spin,
  Form,
  notification,
  Upload,
  Select,
} from "antd";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getAllFeedbacks } from "../../../../pages/feedback-service/getAllFeedbacks";
import { AuthContext } from "../../../../AuthContext";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
function ViewTimepiecesDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [timepiecesDetail, setTimepiecesDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditTimepiecesVisible, setIsEditTimepiecesVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlbrand, setImageUrlBrand] = useState("");
  const [feedbackTimepieces, setFeedbackTimepieces] = useState([]);
  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
  const [timepieces, setTimepieces] = useState([]);
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

  const fetchFeedback = async () => {
    try {
      if (!user || !user.token) {
        console.error("User or token not available");
        return;
      }

      const productType = "Bridal"; // Adjust based on your logic
      const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
      setFeedbackTimepieces(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeedback();
    }
  }, [id, user]);

  const handleEditTimepieces = (record) => {
    //setEditingDiamond(record); // Set the diamond to be edited
    setIsEditTimepiecesVisible(true); // Show the modal
    form.setFieldsValue({
      diamondTimepiecesID: record.DiamondTimepiecesID,
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
      values.imageTimepieces = imageUrl || values.imageTimepieces; // Use the uploaded image URL or the existing one
      values.imageBrand = imageUrlbrand || values.imageBrand; // Use the uploaded image URL or the existing one
      await axios.put("http://localhost:8090/products/edit-timepieces", values);
      fetchTimepiecesDetail(); // Refresh the list
      setIsEditTimepiecesVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: "Success",
        description: "Timepieces edited successfully!",
      });
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditTimepiecesVisible(false);
    form.resetFields();
  };

  const handleUpload = (imageTimepieces) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(imageTimepieces);
    return false; // Prevent default upload behavior
  };

  // const handleUploadBrand = (imageBrand) => {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setImageUrlBrand(e.target.result);
  //   };
  //   reader.readAsDataURL(imageBrand);
  //   return false; // Prevent default upload behavior
  // };

  if (loading) {
    return <Spin size="large" />;
  }
  //============================================================================
  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 1");
    }
    return Promise.resolve();
  };

  const validateTimepiecesStyle = (rule, value) => {
    // Check if value matches the regex pattern
    const regex = /^[A-Z]{2}\d{4}-\d{2}[A-Z]$/;
    if (!regex.test(value)) {
      return Promise.reject(
        "Invalid Timepieces Style format. It should be in the format XX1234-65X."
      );
    }

    // Check if value exists in the fetched data
    // const exists = timepieces.some(item => item.TimepiecesStyle === value);
    // if (exists) {
    //   return Promise.reject('Timepieces Style already exists.');
    // }
    const exists = timepieces
      .filter(
        (item) =>
          timepiecesDetail &&
          item.TimepiecesStyle !== timepiecesDetail.TimepiecesStyle
      ) // Exclude the product stored in timepiecesDetail
      .some((item) => item.TimepiecesStyle === value);

    if (exists) {
      return Promise.reject("Timepieces Style already exists.");
    }

    return Promise.resolve();
  };

  //=============================================
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
      <Button style={{ color: "#000", border: "1px solid", fontSize: "20px", margin: "30px 15px 20px 0" }} onClick={() => handleEditTimepieces(timepiecesDetail)}>
        Edit
      </Button>
      <Button style={{ color: "#000", border: "1px solid", fontSize: "20px", margin: "30px 0 20px 0" }} onClick={() => window.history.back()}>Back</Button>
      <hr />
      <Grid item xs={12} md={6}>
        <Box mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Existing Feedbacks
          </Typography>
          <Grid container spacing={3}>
            {feedbackTimepieces.length > 0 ? (
              feedbackTimepieces.map((feedback, index) => (
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
                  {index < feedbackTimepieces.length - 1 && (
                    <Divider
                      variant="middle"
                      sx={{
                        my: 2,
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      }}
                    />
                  )}
                  {index < feedbackTimepieces.length - 1 && (
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
        title="Edit Timepieces"
        open={isEditTimepiecesVisible}
        onCancel={handleCancelEdit}
        footer={[
          <Button style={{ color: "#000", border: "1px solid", fontSize: "20px", marginRight: '10px' }} key="cancel" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button style={{ color: "#000", border: "1px solid", fontSize: "20px" }} key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleUpdateTimepieces} layout="vertical">
          <Form.Item
            name="diamondTimepiecesID"
            label="Diamond Timepieces ID"
            rules={[
              { required: true, message: "Please input the Timepieces Style!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="timepiecesStyle"
            label="Timepieces Style"
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
              { required: true, message: "Please input water resistance!" },
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
              { required: true, message: "Please input the crystal type!" },
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
            label="BraceletMaterial"
            rules={[
              {
                required: true,
                message: "Please input the bracelet material!",
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
              { required: true, message: "Please input the case size!" },
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
            label="DialColor"
            rules={[
              { required: true, message: "Please input the dial color!" },
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
            rules={[{ required: true, message: "Please input the movement!" }]}
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
            rules={[{ required: true, message: "Please input the gender!" }]}
          >
            <Select>
              <Select.Option value="Men">Men</Select.Option>
              <Select.Option value="Women">Women</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the brand Name!" },
            ]}
          // initialValue="Citizen"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="dialType"
            label="Dial Type"
            rules={[{ required: true, message: "Please input the dial Type!" }]}
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
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
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
          {/* <Form.Item
            name="imageTimepieces"
            label="Image Timepieces"
            rules={[
              { required: true, message: "Please input the image Timepieces!" },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            name="imageTimepieces"
            label="Upload Image Timepieces"
            rules={[
              { required: true, message: "Please upload an image Timepieces!" },
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

          {/* <Form.Item
            name="imageBrand"
            label="Image Brand"
            rules={[
              { required: true, message: "Please input the image Brand!" },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            name="imageBrand"
            label="Image Brand"
          // rules={[
          //   { required: true, message: "Please upload an image Brand!" },
          // ]}
          >
            {/* <Upload
              listType="picture"
              beforeUpload={handleUploadBrand}
              showUploadList={false}
              maxCount={1}
              accept="image/*"
            >
              <Button variant="contained" style={{ background: "#fff" }}>
                <AddPhotoAlternateIcon
                  style={{ fontSize: "100px", color: "#000" }}
                />
              </Button>
            </Upload> */}
            <div style={{ marginTop: 20 }}>
              <img
                src="https://collections.jewelryimages.net/collections_logos/Citizen_logo_white.jpg"
                alt="Brand Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
          </Form.Item>
          {/* {imageUrlbrand && (
            <div style={{ marginTop: 20 }}>
              <img
                src={imageUrlbrand}
                alt="Uploaded"
                style={{ width: "100%", maxWidth: 400 }}
              />
            </div>
          )} */}
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

export default ViewTimepiecesDetailPage;
