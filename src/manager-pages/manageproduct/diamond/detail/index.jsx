import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Descriptions, Spin } from "antd";

function ViewDiamondDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [diamondDetail, setDiamondDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBridalDetail = async () => {
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

    fetchBridalDetail();
  }, [id]);

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
        <Descriptions.Item label="Cut">
          {diamondDetail?.Cut}
        </Descriptions.Item>
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
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}

export default ViewDiamondDetailPage;
