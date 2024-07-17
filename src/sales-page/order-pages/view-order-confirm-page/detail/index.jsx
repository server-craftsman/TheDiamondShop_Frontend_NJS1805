import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Descriptions, Button, List } from "antd";
import moment from "moment";
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
      <Descriptions title="Order Summary" bordered>
        {orderDetail[0].OrderID && <Descriptions.Item label="OrderID">{orderDetail[0].OrderID}</Descriptions.Item>}
        {orderDetail[0].OrderDate && (
          <Descriptions.Item label="OrderDate">
          {moment(orderDetail[0].OrderDate).format('YYYY-MM-DD')}
         </Descriptions.Item>
          )}
        {orderDetail[0].FirstName && <Descriptions.Item label="FirstName">{orderDetail[0].FirstName}</Descriptions.Item>}
        {orderDetail[0].LastName && <Descriptions.Item label="LastName">{orderDetail[0].LastName}</Descriptions.Item>}
        {orderDetail[0].PhoneNumber && <Descriptions.Item label="PhoneNumber">{orderDetail[0].PhoneNumber}</Descriptions.Item>}
        {orderDetail[0].TotalPrice && <Descriptions.Item label="TotalPrice">{orderDetail[0].TotalPrice}</Descriptions.Item>}
        {orderDetail[0].DeliveryAddress && <Descriptions.Item label="DeliveryAddress">{orderDetail[0].DeliveryAddress}</Descriptions.Item>}
        {orderDetail[0].OrderStatus && <Descriptions.Item label="OrderStatus">{orderDetail[0].OrderStatus}</Descriptions.Item>}
        {orderDetail[0].Shipping && <Descriptions.Item label="Shipping">{orderDetail[0].Shipping}</Descriptions.Item>}
        {orderDetail[0].Quantity && <Descriptions.Item label="Quantity">{orderDetail[0].Quantity}</Descriptions.Item>}
        {orderDetail[0].AttachedAccessories && <Descriptions.Item label="AttachedAccessories">{orderDetail[0].AttachedAccessories}</Descriptions.Item>}             
      </Descriptions>
      
      <List
        itemLayout="vertical"
        size="large"
        bordered
        dataSource={orderDetail}
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
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
};

export default OrderConfirmDetail;
