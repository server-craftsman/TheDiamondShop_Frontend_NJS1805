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
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { PlusOutlined } from "@ant-design/icons";
import { getAllFeedbacks } from "../../../../pages/feedback-service/getAllFeedbacks";
import { AuthContext } from "../../../../AuthContext";
import "./index.scss";
const { Option } = Select;

const ViewRingDetailPage = () => {
  const { id } = useParams();
  const [ringDetail, setRingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [ringSizes, setRingSizes] = useState([]);
  const [ringPrice, setRingPrice] = useState([]);
  const [isEditRingVisible, setIsEditRingVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlBrand, setImageUrlBrand] = useState("");
  const [feedbackRings, setFeedbackRings] = useState([]);
  const { user } = useContext(AuthContext);

  //fetch id
  const [selectedMaterialID, setSelectedMaterialID] = useState(null);
  const [selectedRingSizeID, setSelectedRingSizeID] = useState(null);
  const [selectedPriceID, setSelectedPriceID] = useState(null);

  //used to check exsis
  const [rings, setRings] = useState([]);
  const fetchRings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/products/diamond-rings"
      );
      setRings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch ring data.",
      });
    }
  };
  useEffect(() => {
    fetchRings();
  }, []);

  //======================//
  useEffect(() => {
    fetchData();
    if (user) {
      fetchFeedback();
    }
  }, [id, user]);

  const fetchData = async () => {
    try {
      const [
        ringDetailResponse,
        materialsResponse,
        ringSizesResponse,
        ringPriceResponse,
      ] = await Promise.all([
        axios.get(`http://localhost:8090/products/rings/${id}`),
        axios.get(
          `http://localhost:8090/products/diamond-rings-material/${id}`
        ),
        axios.get(`http://localhost:8090/products/diamond-rings-size/${id}`),
        axios.get(`http://localhost:8090/products/diamond-rings-price/${id}`),
      ]);
      setRingDetail(ringDetailResponse.data);
      setMaterials(materialsResponse.data);
      setRingSizes(ringSizesResponse.data);
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
      const feedbacks = await getAllFeedbacks("DiamondRings", id, user.token);
      setFeedbackRings(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const validatePrice = (rule, value) => {
    if (value < 1) {
      return Promise.reject("Price must be greater than 1");
    }
    return Promise.resolve();
  };

  const handleEditRings = (record) => {
    setIsEditRingVisible(true);
    form.setFieldsValue({
      ...record,
      ImageRings: record.ImageRings || "",
      ImageBrand: record.ImageBrand || "",
    });
    setImageUrl(record.ImageRings || "");
    setImageUrlBrand(record.ImageBrand || "");
  };

  const handleUpdateRings = async (values) => {
    try {
      values.ImageRings = imageUrl || values.ImageRings;
      values.ImageBrand = imageUrlBrand || values.ImageBrand;
      values.PriceID = selectedPriceID; // Include selected PriceID

      const response = await axios.put(
        `http://localhost:8090/products/edit-diamond-rings/${id}`,
        values
      );

      if (response.status === 200) {
        fetchData();
        setIsEditRingVisible(false);
        form.resetFields();
        notification.success({
          message: "Success",
          description: "Diamond Ring edited successfully!",
        });
      } else {
        throw new Error("Failed to update the ring");
      }
    } catch (error) {
      console.error("Error updating diamond:", error);
      notification.error({
        message: "Error",
        description:
          "There was an error updating the diamond ring. Please try again.",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditRingVisible(false);
    form.resetFields();
  };

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageUrl(e.target.result);
    if (file && file.originFileObj) {
      reader.readAsDataURL(file.originFileObj);
    }
    return false;
  };

  const handleUploadBrand = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageUrlBrand(e.target.result);
    if (file && file.originFileObj) {
      reader.readAsDataURL(file.originFileObj);
    }
    return false;
  };

  const fetchPriceID = async (diamondRingsID, materialID, ringSizeID) => {
    if (diamondRingsID && materialID && ringSizeID) {
      try {
        const response = await axios.get(
          `http://localhost:8090/products/diamond-rings-price/${id}`,
          {
            params: { diamondRingsID, materialID, ringSizeID },
          }
        );
        return response.data.PriceID;
      } catch (error) {
        console.error("Error fetching price ID:", error);
        return null; // Handle errors as needed
      }
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }
  //=============validate=============//

  const validateStringLength = (maxLength) => (rule, value) => {
    if (value && value.length > maxLength) {
      return Promise.reject(`Must be ${maxLength} characters or less`);
    }
    return Promise.resolve();
  };

  const validateRingExist = (rule, value) => {
    // Check if any of the specified fields exist in the fetched data
    const exists = rings
      .filter(
        (item) =>
          !ringDetail ||
          (item.RingStyle !== ringDetail.RingStyle &&
            item.NameRings !== ringDetail.NameRings)
      )
      .some(
        (item) => item.RingStyle === value || item.NameRings === value // || another attribute if have
      );

    if (exists) {
      return Promise.reject("The value already exists.");
    }

    return Promise.resolve();
  };

  const validateWidth = (rule, value) => {
    const width = parseFloat(value);
    if (isNaN(width) || width < 1 || width > 5) {
      return Promise.reject(
        "Width must be a decimal number between 1mm and 5 mm"
      );
    }
    return Promise.resolve();
  };

  const validateDimension = (rule, value) => {
    const Dimension = parseFloat(value);
    if (isNaN(Dimension) || Dimension < 1 || Dimension > 6.5) {
      return Promise.reject(
        "Dimension must be a decimal number between 1mm and 6.5 mm"
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

  const validateGemstoneWeight = (rule, value) => {
    const GemstoneWeight = parseFloat(value);
    if (isNaN(GemstoneWeight) || GemstoneWeight < 1 || GemstoneWeight > 3) {
      return Promise.reject(
        "Gem Stone Weight must be a decimal number between 1ct and 3ct"
      );
    }
    return Promise.resolve();
  };

  const validateDiamondCaratWeight = (rule, value) => {
    const DiamondCaratWeight = parseFloat(value);
    if (
      isNaN(DiamondCaratWeight) ||
      DiamondCaratWeight < 1 ||
      DiamondCaratWeight > 3
    ) {
      return Promise.reject(
        "Diamond Carat Weight must be a decimal number between 1ct and 3ct"
      );
    }
    return Promise.resolve();
  };

  //=================================//
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
            alt="Brand"
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
          <div className="ring-price-container">
            {ringPrice.map((price) => (
              <div key={price.PriceID} className="ring-price-item">
                {price.Price}
              </div>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Inventory">
          {ringDetail?.Inventory}
        </Descriptions.Item>
        <Descriptions.Item label="Image Rings">
          <img
            src={ringDetail?.ImageRings}
            alt="Rings"
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
      <Button type="primary" onClick={() => handleEditRings(ringDetail)}>
        Edit Ring
      </Button>
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
                    <Grid item xs={2} style={{ marginRight: "-12px" }}>
                      <Avatar src={feedback.image} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {feedback.name}{" "}
                        <Rating
                          name="read-only"
                          value={feedback.rating}
                          readOnly
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feedback.comment}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(feedback.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  {index < feedbackRings.length - 1 && (
                    <Divider sx={{ mb: 2 }} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2">No feedback available.</Typography>
            )}
          </Grid>
        </Box>
      </Grid>
      <Modal
        title="Edit Diamond Ring"
        visible={isEditRingVisible}
        onOk={() => form.submit()}
        onCancel={handleCancelEdit}
        okText="Update"
      >
        <Form form={form} onFinish={handleUpdateRings} layout="vertical">
          <Form.Item
            name="RingStyle"
            label="Ring Style"
            rules={[
              { required: true, message: "Please input the Ring Style!" },
              { validator: validateStringLength(50) },
              { validator: validateRingExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="NameRings"
            label="Name Rings"
            rules={[
              { required: true, message: "Please input the name Rings!" },
              { validator: validateStringLength(50) },
              { validator: validateRingExist },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Select>
              <Option value="Diamond Fashion Rings">
                Diamond Fashion Rings
              </Option>
              <Option value="Women`s Wedding Bands">
                Women`s Wedding Bands
              </Option>
              <Option value="Gemstone Fashion Rings">
                Gemstone Fashion Rings
              </Option>
              <Option value="Rings">Rings</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="BrandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the Brand Name!" },
            ]}
          >
            <Select>
              <Option value="Simon G">Simon G</Option>
              <Option value="Allison Kaufman">Allison Kaufman</Option>
            </Select>
          </Form.Item>
          <Form.Item name="ImageRings" label="Image Rings">
            <Upload
              listType="picture-card"
              showUploadList={false}
              customRequest={handleUpload}
              accept="image/*"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Ring" style={{ width: "100%" }} />
              ) : (
                <PlusOutlined />
              )}
            </Upload>
          </Form.Item>
          <Form.Item name="ImageBrand" label="Image Brand">
            <Upload
              listType="picture-card"
              showUploadList={false}
              customRequest={handleUploadBrand}
              accept="image/*"
            >
              {imageUrlBrand ? (
                <img
                  src={imageUrlBrand}
                  alt="Brand"
                  style={{ width: "100%" }}
                />
              ) : (
                <PlusOutlined />
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="Inventory"
            label="Inventory"
            rules={[
              {
                required: true,
                message: "Please input the inventory quantity!",
              },
            ]}
          >
            <Select>
              <Option value="0">0</Option>
              <Option value="1">1</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterGemstone"
            label="Center Gemstone"
            rules={[
              { required: true, message: "Please select the center gemstone!" },
            ]}
          >
            <Select>
              <Option value="NULL">NULL</Option>
              <Option value="Yellow Diamond">Yellow Diamond</Option>
              <Option value="Amethyst">Amethyst</Option>
              <Option value="Ruby">Ruby</Option>
              <Option value="Emerald">Emerald</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterGemstoneShape"
            label="Center Gemstone Shape"
            rules={[
              {
                required: true,
                message: "Please select the center gemstone shape!",
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
            name="Width"
            label="Width (1mm - 5mm)"
            rules={[
              { required: true, message: "Please input the width!" },
              { validator: validateWidth },
              // Width là chiều rộng của cái vòng nhẫn nên 1.25mm - 5mm là hợp lý cho cả nam/nữ nữ thì phù hợp là 1mm - 2.25mm
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CenterDiamondDimension"
            label="Center Diamond Dimension (1mm - 6.5mm)"
            rules={[
              {
                required: true,
                message: "Please input the center diamond dimension!",
              },
              { validator: validateDimension },
              //Dimension là cái đường kính của kích thước gắn viên kim cương chính vào nó khoảng 1.25mm đến 6.5 là hợp lý nhưng với các chỉ số kim cương của hàng mình có
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Weight"
            label="Weight (2g - 3.6g)"
            rules={[
              { required: true, message: "Please input the weight!" },
              // { validator: validateNumber("Weight must be greater than 0") },
              { validator: validateWeight },
              // Này là trọng lượng tổng của cái nhẫn cả viên kim cương trọng lượng nhẫn thì khoẳng từ 2 - 3 gam từy từng loại vật liệu + trọng lượng của diamond or gem ct(carat) 1ct = 0.2 gam|| EX: nhẫn 3g & gem 3ct => 3 + (0.2x3)=3.6g
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="GemstoneWeight"
            label="Gemstone Weight  (1ct - 3ct)"
            rules={[
              { required: true, message: "Please input the gemstone weight!" },
              { validator: validateGemstoneWeight },
              // Gem stone weight tính = ct. !ct = 0.2g
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CenterDiamondColor"
            label="Center Diamond Color"
            rules={[
              {
                required: true,
                message: "Please select the center diamond color!",
              },
            ]}
          >
            <Select>
              <Option value="D">D</Option>
              <Option value="E">E</Option>
              <Option value="F">F</Option>
              <Option value="G">G</Option>
              <Option value="H">H</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="CenterDiamondClarity"
            label="Center Diamond Clarity"
            rules={[
              {
                required: true,
                message: "Please select the center diamond clarity!",
              },
            ]}
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
            name="CenterDiamondCaratWeight"
            label="Center Diamond Carat Weight (1ct - 3ct)"
            rules={[
              {
                required: true,
                message: "Please input the center diamond carat weight!",
              },
              { validator: validateDiamondCaratWeight },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="MaterialID" label="Material">
            <Select
              onChange={(value) => {
                setSelectedMaterialID(value);
                fetchPriceID(value, selectedRingSizeID); // Fetch PriceID based on MaterialID and RingSizeID
              }}
            >
              {materials.map((material) => (
                <Select.Option
                  key={material.MaterialID}
                  value={material.MaterialID}
                >
                  {material.MaterialName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="RingSizeID" label="Ring Size">
            <Select
              onChange={(value) => {
                setSelectedRingSizeID(value);
                fetchPriceID(selectedMaterialID, value); // Fetch PriceID based on MaterialID and RingSizeID
              }}
            >
              {ringSizes.map((size) => (
                <Select.Option key={size.RingSizeID} value={size.RingSizeID}>
                  {size.RingSize}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Price"
            label="Price"
            rules={[{ validator: validatePrice }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="Gender"
            label="Gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Option value="Men">Men</Option>
              <Option value="Women">Women</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Fluorescence"
            label="Fluorescence"
            rules={[
              { required: true, message: "Please select the fluorescence!" },
            ]}
          >
            <Select>
              <Option value="None">None</Option>
              <Option value="Faint">Faint</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Strong">Strong</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewRingDetailPage;
