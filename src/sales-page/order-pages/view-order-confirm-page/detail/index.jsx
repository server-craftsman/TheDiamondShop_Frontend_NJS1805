import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Descriptions, Button } from "antd";
const OrderConfirmDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/features/order/${id}`);
      setOrderDetail(response.data);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="order-detail">
      <Descriptions title="Order Details" bordered>
        <Descriptions.Item label="OrderID">{orderDetail.OrderID}</Descriptions.Item>
        <Descriptions.Item label="OrderDate">{orderDetail.OrderDate}</Descriptions.Item>
        <Descriptions.Item label="FirstName">{orderDetail.FirstName}</Descriptions.Item>
        <Descriptions.Item label="LastName">{orderDetail.LastName}</Descriptions.Item>
        <Descriptions.Item label="PhoneNumber">{orderDetail.PhoneNumber}</Descriptions.Item>
        <Descriptions.Item label="StockNumber">{orderDetail.StockNumber}</Descriptions.Item>
        <Descriptions.Item label="NameRings">{orderDetail.NameRings}</Descriptions.Item>
        <Descriptions.Item label="NameBridal">{orderDetail.NameBridal}</Descriptions.Item>
        <Descriptions.Item label="NameTimepieces">{orderDetail.NameTimepieces}</Descriptions.Item>
        <Descriptions.Item label="Quantity">{orderDetail.Quantity}</Descriptions.Item>
        <Descriptions.Item label="OrderStatus">{orderDetail.OrderStatus}</Descriptions.Item>
        <Descriptions.Item label="TotalPrice">{orderDetail.TotalPrice}</Descriptions.Item>
        <Descriptions.Item label="AttachedAccessories">{orderDetail.AttachedAccessories}</Descriptions.Item>
        <Descriptions.Item label="Shipping">{orderDetail.Shipping}</Descriptions.Item>
        <Descriptions.Item label="ReportNo">{orderDetail.ReportNo}</Descriptions.Item>
        <Descriptions.Item label="DeliveryAddress">{orderDetail.DeliveryAddress}</Descriptions.Item>
      </Descriptions>
      <Button onClick={() => window.history.back()}>Back</Button>
      
    </div>
  );
};

export default OrderConfirmDetail;
