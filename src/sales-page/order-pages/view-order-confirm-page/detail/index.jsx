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

  const checkImageURL = (url) => {
    return (url && (url.startsWith("http://") || url.startsWith("https://"))) ? url : null;
  };

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
        style={{margin: "20px 0px 0px 0px"}}
        renderItem={(item, index) => (
          <List.Item key={item.ReportNo}>
            <Descriptions title={`Order Detail ${index + 1}`} bordered>
              {/* diamond */}
              {checkImageURL(item.Image) && (
                <Descriptions.Item label="Image">
                  <img src={item.Image} alt="Diamond" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.Image); }} />
                </Descriptions.Item>
              )}
              {item.StockNumber && <Descriptions.Item label="Stock Number">{item.StockNumber}</Descriptions.Item>}
              {item.CaratWeight && <Descriptions.Item label="Carat Weight">{item.CaratWeight}</Descriptions.Item>}
              {item.DiamondOrigin && <Descriptions.Item label="Diamond Origin">{item.DiamondOrigin}</Descriptions.Item>}
              {item.Color && <Descriptions.Item label="Diamond Color">{item.Color}</Descriptions.Item>}
              {item.Clarity && <Descriptions.Item label="Diamond Clarity">{item.Clarity}</Descriptions.Item>}
              {item.Cut && <Descriptions.Item label="Diamond Cut">{item.Cut}</Descriptions.Item>}
              {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
              {item.Shape && <Descriptions.Item label="Diamond Shape">{item.Shape}</Descriptions.Item>}

              {/* jewelry */}
              {item.NameRings && <Descriptions.Item label="Name Rings">{item.NameRings}</Descriptions.Item>}
              {item.RingStyle && <Descriptions.Item label="Ring Style">{item.RingStyle}</Descriptions.Item>}
              {item.Category && <Descriptions.Item label="Category">{item.Category}</Descriptions.Item>}
              {item.BrandName && <Descriptions.Item label="Brand Name">{item.BrandName}</Descriptions.Item>}
              {item.MaterialName && <Descriptions.Item label="Material Name">{item.MaterialName}</Descriptions.Item>}
              {item.RingSize && <Descriptions.Item label="Ring Size">{item.RingSize}</Descriptions.Item>}
              {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
              {item.Gender && <Descriptions.Item label="Gender">{item.Gender}</Descriptions.Item>}
              {item.Description && <Descriptions.Item label="Description">{item.Description}</Descriptions.Item>}
              {checkImageURL(item.ImageRings) && (
                <Descriptions.Item label="Image Rings">
                  <img src={item.ImageRings} alt="Rings" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageRings); }} />
                </Descriptions.Item>
              )}
              {checkImageURL(item.ImageBrand) && (
                <Descriptions.Item label="Image Brand">
                  <img src={item.ImageBrand} alt="Brand" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBrand); }} />
                </Descriptions.Item>
              )}

              {/* watch */}
              {item.NameTimepieces && <Descriptions.Item label="Name Timepieces">{item.NameTimepieces}</Descriptions.Item>}
              {item.TimepiecesStyle && <Descriptions.Item label="Timepieces Style">{item.TimepiecesStyle}</Descriptions.Item>}
              {item.Collection && <Descriptions.Item label="Collection">{item.Collection}</Descriptions.Item>}
              {item.WaterResistance && <Descriptions.Item label="Water Resistance">{item.WaterResistance}</Descriptions.Item>}
              {item.CrystalType && <Descriptions.Item label="Crystal Type">{item.CrystalType}</Descriptions.Item>}
              {item.BraceletMaterial && <Descriptions.Item label="Bracelet Material">{item.BraceletMaterial}</Descriptions.Item>}
              {item.CaseSize && <Descriptions.Item label="Case Size">{item.CaseSize}</Descriptions.Item>}
              {item.Movement && <Descriptions.Item label="Movement">{item.Movement}</Descriptions.Item>}
              {item.Gender && <Descriptions.Item label="Gender">{item.Gender}</Descriptions.Item>}
              {item.Category && <Descriptions.Item label="Category">{item.Category}</Descriptions.Item>}
              {item.BrandName && <Descriptions.Item label="Brand Name">{item.BrandName}</Descriptions.Item>}
              {item.Description && <Descriptions.Item label="Description">{item.Description}</Descriptions.Item>}
              {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
              {checkImageURL(item.ImageTimepieces) && (
                <Descriptions.Item label="Image Timepieces">
                  <img src={item.ImageTimepieces} alt="Timepieces" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageTimepieces); }} />
                </Descriptions.Item>
              )}
              {checkImageURL(item.ImageBrand) && (
                <Descriptions.Item label="Image Brand">
                  <img src={item.ImageBrand} alt="Brand" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBrand); }} />
                </Descriptions.Item>
              )}

              {/* Bridal */}
              {item.NameBridal && <Descriptions.Item label="Name Bridal">{item.NameBridal}</Descriptions.Item>}
              {item.BridalStyle && <Descriptions.Item label="Bridal Style">{item.BridalStyle}</Descriptions.Item>}
              {item.Category && <Descriptions.Item label="Category">{item.Category}</Descriptions.Item>}
              {item.BrandName && <Descriptions.Item label="Brand Name">{item.BrandName}</Descriptions.Item>}
              {item.MaterialName && <Descriptions.Item label="Material Name">{item.MaterialName}</Descriptions.Item>}
              {item.RingSize && <Descriptions.Item label="Ring Size">{item.RingSize}</Descriptions.Item>}
              {item.SettingType && <Descriptions.Item label="Setting Type">{item.SettingType}</Descriptions.Item>}
              {item.Gender && <Descriptions.Item label="Gender">{item.Gender}</Descriptions.Item>}
              {item.Weight && <Descriptions.Item label="Weight">{item.Weight}</Descriptions.Item>}
              {item.CenterDiamond && <Descriptions.Item label="Center Diamond">{item.CenterDiamond}</Descriptions.Item>}
              {item.SideDiamond && <Descriptions.Item label="Side Diamond">{item.SideDiamond}</Descriptions.Item>}
              {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
              {item.Description && <Descriptions.Item label="Description">{item.Description}</Descriptions.Item>}
              {checkImageURL(item.ImageBridal) && (
                <Descriptions.Item label="Image Bridal">
                  <img src={item.ImageBridal} alt="Bridal" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBridal); }} />
                </Descriptions.Item>
              )}
              {checkImageURL(item.ImageBrand) && (
                <Descriptions.Item label="Image Brand">
                  <img src={item.ImageBrand} alt="Brand" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBrand); }} />
                </Descriptions.Item>
              )}            </Descriptions>
          </List.Item>
        )}
      />
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
};

export default OrderConfirmDetail;
