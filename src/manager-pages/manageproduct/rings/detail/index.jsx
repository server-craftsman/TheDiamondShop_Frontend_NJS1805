// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   Descriptions,
//   Form,
//   Input,
//   InputNumber,
//   Modal,
//   notification,
//   Spin,
//   Upload,
// } from "antd";
// import "./index.scss"; // Import the CSS file
// import { Button } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// function ViewRingDetailPage() {
//   const { id } = useParams(); // Assuming you're using React Router for routing
//   const [ringDetail, setRingDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [materials, setMaterials] = useState([]);
//   const [ringSizes, setRingSizes] = useState([]);
//   const [isEditRingVisible, setIsEditRingVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [imageUrl, setImageUrl] = useState("");
//   const [imageUrlbrand, setImageUrlBrand] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       const ringDetailResponse = await axios.get(
//         `http://localhost:8090/products/rings/${id}`
//       );
//       setRingDetail(ringDetailResponse.data);

//       const materialsResponse = await axios.get(
//         "http://localhost:8090/products/material-details"
//       );
//       setMaterials(materialsResponse.data);

//       const ringSizesResponse = await axios.get(
//         "http://localhost:8090/products/ring-size-details"
//       );
//       setRingSizes(ringSizesResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditRings = (record) => {
//     //setEditingDiamond(record); // Set the diamond to be edited
//     setIsEditRingVisible(true); // Show the modal
//     form.setFieldsValue({
//       ringStyle: record.RingStyle,
//       nameRings: record.NameRings,
//       category: record.Category,
//       brandName: record.BrandName,
//       material: record.Material,
//       centerGemstone: record.CenterGemstone,
//       centerGemstoneShape: record.CenterGemstoneShape,
//       width: record.Width,
//       centerDiamondDimension: record.CenterDiamondDimension,
//       weight: record.Weight,
//       gemstoneWeight: record.GemstoneWeight,
//       centerDiamondColor: record.CenterDiamondColor,
//       centerDiamondClarity: record.CenterDiamondClarity,
//       centerDiamondCaratWeight: record.CenterDiamondCaratWeight,
//       ringSize: record.RingSize,
//       price: record.Price,
//       gender: record.Gender,
//       fluorescence: record.Fluorescence,
//       description: record.Description,
//       imageRings: record.ImageRings,
//       imageBrand: record.ImageBrand,
//       inventory: record.Inventory,
//     });
//   };

//   const handleUpdateRings = async (values) => {
//     try {
//       values.imageRings = imageUrl || values.imageRings; // Use the uploaded image URL or the existing one
//       values.imageBrand = imageUrlbrand || values.imageBrand; // Use the uploaded image URL or the existing one
//       await axios.put(
//         "http://localhost:8090/products/edit-diamond-rings",
//         values
//       );
//       fetchData(); // Refresh the list
//       setIsEditRingVisible(false); // Close the modal
//       form.resetFields(); // Reset the form fields
//       notification.success({
//         message: "Success",
//         description: "Diamond Ring edited successfully!",
//       });
//     } catch (error) {
//       console.error("Error updating diamond:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setIsEditRingVisible(false);
//     form.resetFields();
//   };

//   const handleUpload = (imageRings) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImageUrl(e.target.result);
//     };
//     reader.readAsDataURL(imageRings);
//     return false; // Prevent default upload behavior
//   };

//   const handleUploadBrand = (imageBrand) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImageUrlBrand(e.target.result);
//     };
//     reader.readAsDataURL(imageBrand);
//     return false; // Prevent default upload behavior
//   };

//   if (loading) {
//     return <Spin size="large" />;
//   }

//   return (
//     <div className="detail">
//       <Descriptions title="Rings Details" className="descriptions">
//         <Descriptions.Item label="Ring Style">
//           {ringDetail?.RingStyle}
//         </Descriptions.Item>
//         <Descriptions.Item label="Name Rings">
//           {ringDetail?.NameRings}
//         </Descriptions.Item>
//         <Descriptions.Item label="Category">
//           {ringDetail?.Category}
//         </Descriptions.Item>
//         <Descriptions.Item label="Brand Name">
//           {ringDetail?.BrandName}
//         </Descriptions.Item>
//         <Descriptions.Item label="Image Brand">
//           <img
//             src={ringDetail?.ImageBrand}
//             alt="Bridal"
//             className="brand-image"
//           />
//         </Descriptions.Item>
//         <Descriptions.Item label="Material">
//           <div className="materials-container">
//             {materials.map((material) => (
//               <div key={material.MaterialID} className="material-item">
//                 {material.MaterialName}
//               </div>
//             ))}
//           </div>
//         </Descriptions.Item>
//         <Descriptions.Item label="Center Gemstone">
//           {ringDetail?.CenterGemstone}
//         </Descriptions.Item>
//         <Descriptions.Item label="Price">{ringDetail?.Price}</Descriptions.Item>
//         <Descriptions.Item label="Inventory">
//           {ringDetail?.Inventory}
//         </Descriptions.Item>
//         <Descriptions.Item label="Image Rings">
//           <img
//             src={ringDetail?.ImageRings}
//             alt="Bridal"
//             className="rings-image"
//           />
//         </Descriptions.Item>
//         <Descriptions.Item label="Center Gemstone Shape">
//           {ringDetail?.CenterGemstoneShape}
//         </Descriptions.Item>
//         <Descriptions.Item label="Width">{ringDetail?.Width}</Descriptions.Item>
//         <Descriptions.Item label="Center Diamond Dimension">
//           {ringDetail?.CenterDiamondDimension}
//         </Descriptions.Item>
//         <Descriptions.Item label="CenterDiamond">
//           {ringDetail?.CenterDiamond}
//         </Descriptions.Item>
//         <Descriptions.Item label="Weight">
//           {ringDetail?.Weight}
//         </Descriptions.Item>
//         <Descriptions.Item label="Gemstone Weight">
//           {ringDetail?.GemstoneWeight}
//         </Descriptions.Item>
//         <Descriptions.Item label="Center Diamond Color">
//           {ringDetail?.CenterDiamondColor}
//         </Descriptions.Item>
//         <Descriptions.Item label="Center Diamond Clarity">
//           {ringDetail?.CenterDiamondClarity}
//         </Descriptions.Item>
//         <Descriptions.Item label="Center Diamond Carat Weight">
//           {ringDetail?.CenterDiamondCaratWeight}
//         </Descriptions.Item>
//         <Descriptions.Item label="Ring Sizes">
//           <div className="ring-sizes-container">
//             {ringSizes.map((size) => (
//               <div key={size.RingSizeID} className="ring-size-item">
//                 {size.RingSize}
//               </div>
//             ))}
//           </div>
//         </Descriptions.Item>
//         <Descriptions.Item label="Gender">
//           {ringDetail?.Gender}
//         </Descriptions.Item>
//         <Descriptions.Item label="Fluorescence">
//           {ringDetail?.Fluorescence}
//         </Descriptions.Item>
//         <Descriptions.Item label="Description">
//           {ringDetail?.Description}
//         </Descriptions.Item>
//       </Descriptions>
//       <Button onClick={() => handleEditRings(ringDetail)}>Edit</Button>
//       <Button onClick={() => window.history.back()}>Back</Button>

//       <Modal
//         title="Edit Rings"
//         open={isEditRingVisible}
//         onCancel={handleCancelEdit}
//         footer={[
//           <Button key="cancel" onClick={handleCancelEdit}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={() => form.submit()}>
//             Save
//           </Button>,
//         ]}
//       >
//         <Form form={form} onFinish={handleUpdateRings} layout="vertical">
//           <Form.Item
//             name="ringStyle"
//             label="Ring Style"
//             rules={[
//               { required: true, message: "Please input the Ring Style!" },
//             ]}
//           >
//             <Input disabled />
//           </Form.Item>
//           <Form.Item
//             name="nameRings"
//             label="Name Rings"
//             rules={[
//               { required: true, message: "Please input the name Rings!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="category"
//             label="Category"
//             rules={[{ required: true, message: "Please input the category!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="brandName"
//             label="BrandName"
//             rules={[
//               { required: true, message: "Please input the brand Name!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="centerGemstone"
//             label="CenterGemstone"
//             rules={[
//               { required: true, message: "Please input the center gemstone!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="centerGemstoneShape"
//             label="CenterGemstoneShape"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the center gemstone shape!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="width"
//             label="Width"
//             rules={[{ required: true, message: "Please input the width!" }]}
//           >
//             <InputNumber style={{ width: "100%" }} precision={2} />
//           </Form.Item>
//           <Form.Item
//             name="centerDiamondDimension"
//             label="Center Diamond Dimension"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the center Diamond Dimension!",
//               },
//             ]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="weight"
//             label="Weight"
//             rules={[{ required: true, message: "Please input the weight!" }]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="gemstoneWeight"
//             label="Gem stone Weight"
//             rules={[
//               { required: true, message: "Please input the gemstone Weight!" },
//             ]}
//           >
//             <InputNumber style={{ width: "100%" }} precision={2} />
//           </Form.Item>
//           <Form.Item
//             name="centerDiamondColor"
//             label="Center Diamond Color"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the center Diamond Color!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="centerDiamondClarity"
//             label="Center Diamond Clarity"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the center Diamond Clarity!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="centerDiamondCaratWeight"
//             label="Center Diamond CaratWeight"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the center Diamond Carat Weight!",
//               },
//             ]}
//           >
//             <InputNumber style={{ width: "100%" }} precision={2} />
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: "Please input the price!" }]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             name="gender"
//             label="Gender"
//             rules={[{ required: true, message: "Please input the gender!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="fluorescence"
//             label="Fluorescence"
//             rules={[
//               { required: true, message: "Please input the fluorescence!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[
//               { required: true, message: "Please input the description!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           {/* <Form.Item name="imageRings" label="ImageRings"
//            rules={[{ required: true, message: "Please input the image Rings!" }]}>
//             <Input />
//           </Form.Item> */}
//           <Form.Item
//             name="imageRings"
//             label="Upload Image Rings"
//             rules={[
//               { required: true, message: "Please upload an image Rings!" },
//             ]}
//           >
//             <Upload
//               listType="picture"
//               beforeUpload={handleUpload}
//               showUploadList={false}
//               maxCount={1}
//               accept="image/*"
//             >
//               <Button variant="contained" style={{ background: "#fff" }}>
//                 <AddPhotoAlternateIcon
//                   style={{ fontSize: "100px", color: "#000" }}
//                 />
//               </Button>
//             </Upload>
//           </Form.Item>
//           {imageUrl && (
//             <div style={{ marginTop: 20 }}>
//               <img
//                 src={imageUrl}
//                 alt="Uploaded"
//                 style={{ width: "100%", maxWidth: 400 }}
//               />
//             </div>
//           )}

//           {/* <Form.Item name="imageBrand" label="ImageBrand"
//            rules={[{ required: true, message: "Please input the image Brand!" }]}>
//             <Input />
//           </Form.Item> */}

//           <Form.Item
//             name="imageBrand"
//             label="Upload Image Brand"
//             rules={[
//               { required: true, message: "Please upload an image Brand!" },
//             ]}
//           >
//             <Upload
//               listType="picture"
//               beforeUpload={handleUploadBrand}
//               showUploadList={false}
//               maxCount={1}
//               accept="image/*"
//             >
//               <Button variant="contained" style={{ background: "#fff" }}>
//                 <AddPhotoAlternateIcon
//                   style={{ fontSize: "100px", color: "#000" }}
//                 />
//               </Button>
//             </Upload>
//           </Form.Item>
//           {imageUrlbrand && (
//             <div style={{ marginTop: 20 }}>
//               <img
//                 src={imageUrlbrand}
//                 alt="Uploaded"
//                 style={{ width: "100%", maxWidth: 400 }}
//               />
//             </div>
//           )}

//           <Form.Item
//             name="inventory"
//             label="Inventory"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the inventory (1 or 0)!",
//               },
//               {
//                 validator: (_, value) => {
//                   if (value === 1 || value === 0) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error("Inventory must be either 1 or 0!")
//                   );
//                 },
//               },
//             ]}
//           >
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default ViewRingDetailPage;

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
  Spin,
  Upload,
} from "antd";
import "./index.scss"; // Import the CSS file
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getAllFeedbacks } from "../../../../pages/feedback-service/getAllFeedbacks";
import { AuthContext } from "../../../../AuthContext";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

function ViewRingDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [ringDetail, setRingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [isEditRingVisible, setIsEditRingVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlbrand, setImageUrlBrand] = useState("");
  const [feedbackRings, setFeedbackRings] = useState([]);
  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const ringDetailResponse = await axios.get(
        `http://localhost:8090/products/rings/${id}`
      );
      setRingDetail(ringDetailResponse.data);

      const materialsResponse = await axios.get(
        "http://localhost:8090/products/material-details"
      );
      setMaterials(materialsResponse.data);

      const ringSizesResponse = await axios.get(
        "http://localhost:8090/products/ring-size-details"
      );
      setRingSizes(ringSizesResponse.data);
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

      const productType = "DiamondRings"; // Adjust based on your logic
      const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
      setFeedbackRings(feedbacks);
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
      return Promise.reject('Price must be greater than 1');
    }
    return Promise.resolve();
  }

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
      values.imageRings = imageUrl || values.imageRings; // Use the uploaded image URL or the existing one
      values.imageBrand = imageUrlbrand || values.imageBrand; // Use the uploaded image URL or the existing one
      await axios.put(
        "http://localhost:8090/products/edit-diamond-rings",
        values
      );
      fetchData(); // Refresh the list
      setIsEditRingVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
      notification.success({
        message: "Success",
        description: "Diamond Ring edited successfully!",
      });
    } catch (error) {
      console.error("Error updating diamond:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditRingVisible(false);
    form.resetFields();
  };

  const handleUpload = (imageRings) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(imageRings);
    return false; // Prevent default upload behavior
  };

  const handleUploadBrand = (imageBrand) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrlBrand(e.target.result);
    };
    reader.readAsDataURL(imageBrand);
    return false; // Prevent default upload behavior
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
        <Descriptions.Item label="Price">{ringDetail?.Price}</Descriptions.Item>
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
        <Descriptions.Item label="Width">{ringDetail?.Width}</Descriptions.Item>
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
      <hr />
      <Grid item xs={12} md={6}>
        <Box mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Existing Feedbacks
          </Typography>
          <Grid container spacing={3}>
            {feedbackRings.length > 0 ? (
              feedbackRings.map((feedback, index) => (
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
                  {index < feedbackRings.length - 1 && (
                    <Divider
                      variant="middle"
                      sx={{
                        my: 2,
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      }}
                    />
                  )}
                  {index < feedbackRings.length - 1 && (
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
        <Form form={form} onFinish={handleUpdateRings} layout="vertical">
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
            rules={[
              {
                required: true,
                message: "Please input the center Diamond Dimension!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="weight"
            label="Weight"
            rules={[{ required: true, message: "Please input the weight!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="gemstoneWeight"
            label="Gem stone Weight"
            rules={[
              { required: true, message: "Please input the gemstone Weight!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item
            name="centerDiamondColor"
            label="Center Diamond Color"
            rules={[
              {
                required: true,
                message: "Please input the center Diamond Color!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerDiamondClarity"
            label="Center Diamond Clarity"
            rules={[
              {
                required: true,
                message: "Please input the center Diamond Clarity!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="centerDiamondCaratWeight"
            label="Center Diamond CaratWeight"
            rules={[
              {
                required: true,
                message: "Please input the center Diamond Carat Weight!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} precision={2} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" },
            { validator: validatePrice }
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the gender!" }]}
          >
            <Input />
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
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name="imageRings" label="ImageRings"
           rules={[{ required: true, message: "Please input the image Rings!" }]}>
            <Input />
          </Form.Item> */}
          <Form.Item
            name="imageRings"
            label="Upload Image Rings"
            rules={[
              { required: true, message: "Please upload an image Rings!" },
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

          {/* <Form.Item name="imageBrand" label="ImageBrand"
           rules={[{ required: true, message: "Please input the image Brand!" }]}>
            <Input />
          </Form.Item> */}

          <Form.Item
            name="imageBrand"
            label="Upload Image Brand"
            rules={[
              { required: true, message: "Please upload an image Brand!" },
            ]}
          >
            <Upload
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
            </Upload>
          </Form.Item>
          {imageUrlbrand && (
            <div style={{ marginTop: 20 }}>
              <img
                src={imageUrlbrand}
                alt="Uploaded"
                style={{ width: "100%", maxWidth: 400 }}
              />
            </div>
          )}

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

export default ViewRingDetailPage;
