import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Descriptions, Spin } from "antd";
//import "./index.scss"
function ViewRingDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [ringDetail, setRingDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBridalDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/products/rings/${id}`
        );
        setRingDetail(response.data);
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
      <Descriptions title="Rings Details">
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
            style={{ width: "100px", height: "auto" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Material">
          {ringDetail?.Material}
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
            style={{ width: "100px", height: "auto" }}
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
        <Descriptions.Item label="Ring Size">
          {ringDetail?.RingSize}
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
        {/* Add more details as per your schema */}
      </Descriptions>
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}

export default ViewRingDetailPage;
