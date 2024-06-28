import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Descriptions, Spin } from "antd";
import "./index.scss"
function ViewBridalDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [bridalDetail, setBridalDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBridalDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/products/bridals/${id}`
        );
        setBridalDetail(response.data);
      } catch (error) {
        console.error("Error fetching bridal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBridalDetail();
  }, [id]);

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
          {bridalDetail?.Material}
        </Descriptions.Item>
        <Descriptions.Item label="Ring Size Range">
          {bridalDetail?.RingSizeRange}
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
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}

export default ViewBridalDetailPage;
