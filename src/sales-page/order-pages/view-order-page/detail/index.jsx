import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Descriptions, Button, message, List } from "antd";
import moment from "moment";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/features/order/${id}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  if (!orderDetails || orderDetails.length === 0) {
    return <div>Loading...</div>;
  }

  const handleVerifyOrder = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8090/features/update-order-status-sale",
        { orderID: id }
      );
      console.log("Order verified successfully:", response.data);
      message.success("Order verified successfully");
      window.history.back();
    } catch (error) {
      console.error("Error verifying order:", error);
      message.error("Error verifying order");
    }
  };

  return (
    <div className="order-detail">
      <Descriptions title="Order Summary" bordered>
        {orderDetails[0].OrderID && <Descriptions.Item label="OrderID">{orderDetails[0].OrderID}</Descriptions.Item>}
        {orderDetails[0].OrderDate && (
          <Descriptions.Item label="OrderDate">
          {moment(orderDetails[0].OrderDate).format('YYYY-MM-DD')}
         </Descriptions.Item>
          )}
        {orderDetails[0].FirstName && <Descriptions.Item label="FirstName">{orderDetails[0].FirstName}</Descriptions.Item>}
        {orderDetails[0].LastName && <Descriptions.Item label="LastName">{orderDetails[0].LastName}</Descriptions.Item>}
        {orderDetails[0].PhoneNumber && <Descriptions.Item label="PhoneNumber">{orderDetails[0].PhoneNumber}</Descriptions.Item>}
        {orderDetails[0].TotalPrice && <Descriptions.Item label="TotalPrice">{orderDetails[0].TotalPrice}</Descriptions.Item>}
        {orderDetails[0].DeliveryAddress && <Descriptions.Item label="DeliveryAddress">{orderDetails[0].DeliveryAddress}</Descriptions.Item>}
        {orderDetails[0].OrderStatus && <Descriptions.Item label="OrderStatus">{orderDetails[0].OrderStatus}</Descriptions.Item>}
        {orderDetails[0].Shipping && <Descriptions.Item label="Shipping">{orderDetails[0].Shipping}</Descriptions.Item>}
        {orderDetails[0].Quantity && <Descriptions.Item label="Quantity">{orderDetails[0].Quantity}</Descriptions.Item>}
        {orderDetails[0].AttachedAccessories && <Descriptions.Item label="AttachedAccessories">{orderDetails[0].AttachedAccessories}</Descriptions.Item>}             
      </Descriptions>
      
      <List
        itemLayout="vertical"
        size="large"
        bordered
        dataSource={orderDetails}
        renderItem={(item, index) => (
          <List.Item key={item.ReportNo}>
            <Descriptions title={`Order Detail ${index + 1}`} bordered>
              {item.StockNumber && <Descriptions.Item label="StockNumber">{item.StockNumber}</Descriptions.Item>}
              {item.NameRings && <Descriptions.Item label="NameRings">{item.NameRings}</Descriptions.Item>}
              {item.NameBridal && <Descriptions.Item label="NameBridal">{item.NameBridal}</Descriptions.Item>}
              {item.NameTimepieces && <Descriptions.Item label="NameTimepieces">{item.NameTimepieces}</Descriptions.Item>}
              {item.RingSize && <Descriptions.Item label="RingSize">{item.RingSize}</Descriptions.Item>}
              {item.MaterialName && <Descriptions.Item label="MaterialName">{item.MaterialName}</Descriptions.Item>}            
              {item.ReportNo && <Descriptions.Item label="ReportNo">{item.ReportNo}</Descriptions.Item>}
            </Descriptions>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={handleVerifyOrder}>
        Verify Order
      </Button>
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
};

export default OrderDetail;
