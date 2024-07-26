import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Descriptions, Button, List, Typography } from "antd";
import moment from "moment";
const { Title, Text } = Typography;
const OrderConfirmDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commonValues, setCommonValues] = useState({});

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/features/order/${id}`);
      const orders = response.data;
      setOrderDetail(orders);
      setLoading(false);

      const common = calculateCommonValues(orders);
      setCommonValues(common);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const calculateCommonValues = (orders) => {
    // Assuming all orders have the same common values
    if (orders.length === 0) return {};

    const firstOrder = orders[0];

    return {
      OrderID: firstOrder.OrderID,
      LastName: firstOrder.LastName,
      FirstName: firstOrder.FirstName,
      PhoneNumber: firstOrder.PhoneNumber,
      OrderDate: firstOrder.OrderDate,
      DeliveryAddress: firstOrder.DeliveryAddress,
      Shipping: firstOrder.Shipping,
      OrderStatus: firstOrder.OrderStatus,
      AttachedAccessories: firstOrder.AttachedAccessories,
      TotalPrice: firstOrder.TotalPrice,
      Quantity: firstOrder.Quantity
    };
  };

  const checkImageURL = (url) => {
    return (url && (url.startsWith("http://") || url.startsWith("https://"))) ? url : null;
  };

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-detail">
      <Title level={2}>Order Details</Title>
      <Descriptions title={`Order #${commonValues.OrderID}`} bordered>
        <Descriptions.Item label="Order ID">{commonValues.OrderID}</Descriptions.Item>
        <Descriptions.Item label="Name">{`${commonValues.FirstName} ${commonValues.LastName}`}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{commonValues.PhoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Order Date">{new Date(commonValues.OrderDate).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Delivery Address">{commonValues.DeliveryAddress}</Descriptions.Item>
        <Descriptions.Item label="Shipping">{commonValues.Shipping}</Descriptions.Item>
        <Descriptions.Item label="Order Status">{commonValues.OrderStatus}</Descriptions.Item>
        <Descriptions.Item label="Attached Accessories">{commonValues.AttachedAccessories}</Descriptions.Item>
        <Descriptions.Item label="Total Price">{`$${commonValues.TotalPrice}`}</Descriptions.Item>
        <Descriptions.Item label="Quantity">{commonValues.Quantity}</Descriptions.Item>
      </Descriptions>

      <List
        itemLayout="vertical"
        dataSource={orderDetail}
        renderItem={(order, index) => (
          <List.Item key={order.ReportNo}>
            <Descriptions title={`Ordertails ${index + 1}`} bordered>
              {order.Bridal && order.Bridal.filter(Boolean).length > 0 && (
                <>
                  <Descriptions.Item label="NameBridal">
                    {order.Bridal[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="BridalStyle">
                    {order.Bridal[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {order.Bridal[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="BrandName">
                    {order.Bridal[3]}
                  </Descriptions.Item>
                  <Descriptions.Item label="SettingType">
                    {order.Bridal[4]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {order.Bridal[5]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight">
                    {order.Bridal[6]}
                  </Descriptions.Item>
                  <Descriptions.Item label="CenterDiamond">
                    {order.Bridal[7]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {order.Bridal[8]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ring Size">
                    {order.RingSize}
                  </Descriptions.Item>
                  <Descriptions.Item label="Material Name">
                    {order.MaterialName}
                  </Descriptions.Item>
                </>
              )}

              {order.DiamondRings && order.DiamondRings.filter(Boolean).length > 0 && (
                <>
                  <Descriptions.Item label="RingStyle">
                    {order.DiamondRings[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="NameRings">
                    {order.DiamondRings[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {order.DiamondRings[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="BrandName">
                    {order.DiamondRings[3]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {order.DiamondRings[4]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {order.DiamondRings[5]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {order.RingSize}
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {order.MaterialName}
                  </Descriptions.Item>
                </>
              )}

              {order.Diamond && order.Diamond.filter(Boolean).length > 0 && (
                <>
                <Descriptions.Item label="DiamondOrigin">
                    {order.Diamond[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Clarity">
                    {order.Diamond[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cut">
                    {order.Diamond[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {`$${order.Diamond[3]}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="StockNumber">
                    {order.Diamond[4]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    {order.Diamond[5]}
                  </Descriptions.Item>
                  <Descriptions.Item label="CaratWeight">
                    {order.Diamond[6]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shape">
                    {order.Diamond[7]}
                  </Descriptions.Item>
                </>
              )}

              {order.DiamondTimepieces && order.DiamondTimepieces.filter(Boolean).length > 0 && (
                <>
                <Descriptions.Item label="NameTimepieces">
                    {order.DiamondTimepieces[0]}
                </Descriptions.Item>
                <Descriptions.Item label="TimepiecesStyle">
                    {order.DiamondTimepieces[1]}
                </Descriptions.Item>
                <Descriptions.Item label="Collection">
                    {order.DiamondTimepieces[2]}
                </Descriptions.Item>
                <Descriptions.Item label="WaterResistance">
                    {order.DiamondTimepieces[3]}
                </Descriptions.Item>
                <Descriptions.Item label="CrystalType">
                    {order.DiamondTimepieces[4]}
                </Descriptions.Item>
                <Descriptions.Item label="BraceletMaterial">
                    {order.DiamondTimepieces[5]}
                </Descriptions.Item>
                <Descriptions.Item label="CaseSize">
                    {order.DiamondTimepieces[6]}
                </Descriptions.Item>
                <Descriptions.Item label="Movement">
                    {order.DiamondTimepieces[7]}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                    {order.DiamondTimepieces[8]}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {order.DiamondTimepieces[9]}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                    {order.DiamondTimepieces[10]}
                </Descriptions.Item>
                <Descriptions.Item label="BrandName">
                    {order.DiamondTimepieces[11]}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                    {`$${order.DiamondTimepieces[12]}`}
                </Descriptions.Item>
                </>
              )}

              <Descriptions.Item label="Report No">
                {order.ReportNo}
              </Descriptions.Item>
            </Descriptions>
          </List.Item>
        )}
      />
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
};

export default OrderConfirmDetail;
