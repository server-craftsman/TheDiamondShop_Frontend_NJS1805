import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Descriptions, Spin } from "antd";
//import "./index.scss"
function ViewTimepiecesDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [timepiecesDetail, setTimepiecesDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBridalDetail = async () => {
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

    fetchBridalDetail();
  }, [id]);

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
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}

export default ViewTimepiecesDetailPage;
