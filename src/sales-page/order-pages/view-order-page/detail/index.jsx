// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Descriptions, Button, message, List, Typography } from "antd";
// import moment from "moment";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [bridalPrice, setBridalPrice] = useState(null);
//   const [ringsPrice, setRingsPrice] = useState(null);

//   const fetchOrderDetail = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8090/features/order/${id}`);
//       setOrderDetails(response.data);
    
//     // Fetch Bridal and Diamond Rings prices based on order details
//     const bridalResponse = await axios.get(`http://localhost:8090/products/bridal-accessory`);
//     const ringsResponse = await axios.get(`http://localhost:8090/products/ring-accessory-details`);
//       // Adjust based on actual response structure

//       const bridalPriceData = bridalResponse.data.find(item => item.MaterialName === response.data[0]?.MaterialName);
//       const ringsPriceData = ringsResponse.data.find(item => item.MaterialName === response.data[0]?.MaterialName);

//       setBridalPrice(bridalPriceData?.Price || "N/A");
//       setRingsPrice(ringsPriceData?.Price || "N/A");

//     } catch (error) {
//       console.error("Error fetching order detail:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [id]);

//   if (!orderDetails || orderDetails.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const handleVerifyOrder = async () => {
//     try {
//       await axios.put(
//         "http://localhost:8090/features/update-order-status-sale",
//         { orderID: id }
//       );
//       message.success("Order verified successfully");
//       window.history.back();
//     } catch (error) {
//       console.error("Error verifying order:", error);
//       message.error("Error verifying order");
//     }
//   };

//   const checkImageURL = (url) => {
//     return (url && (url.startsWith("http://") || url.startsWith("https://"))) ? url : null;
//   };

//   return (
//     <div className="order-detail">
//       <Descriptions title="Order Summary" bordered>
//         {orderDetails[0].OrderID && <Descriptions.Item label="OrderID">{orderDetails[0].OrderID}</Descriptions.Item>}
//         {orderDetails[0].OrderDate && (
//           <Descriptions.Item label="OrderDate">
//             {moment(orderDetails[0].OrderDate).format('YYYY-MM-DD')}
//           </Descriptions.Item>
//         )}
//         {orderDetails[0].FirstName && <Descriptions.Item label="Full Name">{orderDetails[0].FirstName} {orderDetails[0].LastName}</Descriptions.Item>}
//         {orderDetails[0].PhoneNumber && <Descriptions.Item label="Phone Number">{orderDetails[0].PhoneNumber}</Descriptions.Item>}
//         {orderDetails[0].TotalPrice && <Descriptions.Item label="Total Price">{orderDetails[0].TotalPrice}</Descriptions.Item>}
//         {orderDetails[0].DeliveryAddress && <Descriptions.Item label="Delivery Address">{orderDetails[0].DeliveryAddress}</Descriptions.Item>}
//         {orderDetails[0].OrderStatus && <Descriptions.Item label="Order Status">{orderDetails[0].OrderStatus}</Descriptions.Item>}
//         {orderDetails[0].Shipping && <Descriptions.Item label="Shipping">{orderDetails[0].Shipping}</Descriptions.Item>}
//         {orderDetails[0].Quantity && <Descriptions.Item label="Quantity">{orderDetails[0].Quantity}</Descriptions.Item>}
//         {orderDetails[0].AttachedAccessories && <Descriptions.Item label="Attached Accessories">{orderDetails[0].AttachedAccessories}</Descriptions.Item>}
//       </Descriptions>
      
//       <Descriptions title="Price Details" bordered>
//         <Descriptions.Item label="Bridal Price">{bridalPrice}</Descriptions.Item>
//         <Descriptions.Item label="Diamond Rings Price">{ringsPrice}</Descriptions.Item>
//       </Descriptions>

//       <List
//         itemLayout="vertical"
//         size="large"
//         bordered
//         dataSource={orderDetails}
//         style={{margin: "20px 0px 0px 0px"}}
//         renderItem={(item, index) => (
//           <List.Item key={item.ReportNo}>
//             <Descriptions title={`Order Detail ${index + 1}`} bordered>
//               {/* diamond */}
//               {checkImageURL(item.Image) && (
//                 <Descriptions.Item label="Image">
//                   <img src={item.Image} alt="Diamond" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.Image); }} />
//                 </Descriptions.Item>
//               )}
//               {item.StockNumber && <Descriptions.Item label="Stock Number">{item.StockNumber}</Descriptions.Item>}
//               {item.CaratWeight && <Descriptions.Item label="Carat Weight">{item.CaratWeight}</Descriptions.Item>}
//               {item.DiamondOrigin && <Descriptions.Item label="Diamond Origin">{item.DiamondOrigin}</Descriptions.Item>}
//               {item.Color && <Descriptions.Item label="Diamond Color">{item.Color}</Descriptions.Item>}
//               {item.Clarity && <Descriptions.Item label="Diamond Clarity">{item.Clarity}</Descriptions.Item>}
//               {item.Cut && <Descriptions.Item label="Diamond Cut">{item.Cut}</Descriptions.Item>}
//               {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
//               {item.Shape && <Descriptions.Item label="Diamond Shape">{item.Shape}</Descriptions.Item>}
              
//               {/* Diamond Rings */}
//               {item.NameRings && <Descriptions.Item label="Name Rings">{item.NameRings}</Descriptions.Item>}
//               {item.RingStyle && <Descriptions.Item label="Ring Style">{item.RingStyle}</Descriptions.Item>}
//               {item.Category && <Descriptions.Item label="Category">{item.Category}</Descriptions.Item>}
//               {item.BrandName && <Descriptions.Item label="Brand Name">{item.BrandName}</Descriptions.Item>}
//               {item.MaterialName && <Descriptions.Item label="Material Name">{item.MaterialName}</Descriptions.Item>}
//               {item.RingSize && <Descriptions.Item label="Ring Size">{item.RingSize}</Descriptions.Item>}
//               {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
//               {item.Gender && <Descriptions.Item label="Gender">{item.Gender}</Descriptions.Item>}
//               {item.Description && <Descriptions.Item label="Description">{item.Description}</Descriptions.Item>}
//               {checkImageURL(item.ImageRings) && (
//                 <Descriptions.Item label="Image Rings">
//                   <img src={item.ImageRings} alt="Rings" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageRings); }} />
//                 </Descriptions.Item>
//               )}
//               {checkImageURL(item.ImageBrand) && (
//                 <Descriptions.Item label="Image Brand">
//                   <img src={item.ImageBrand} alt="Brand" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBrand); }} />
//                 </Descriptions.Item>
//               )}
              
//               {/* watch */}
//               {item.NameTimepieces && <Descriptions.Item label="Name Timepieces">{item.NameTimepieces}</Descriptions.Item>}
//               {item.TimepiecesStyle && <Descriptions.Item label="Timepieces Style">{item.TimepiecesStyle}</Descriptions.Item>}
//               {item.Collection && <Descriptions.Item label="Collection">{item.Collection}</Descriptions.Item>}
//               {item.WaterResistance && <Descriptions.Item label="Water Resistance">{item.WaterResistance}</Descriptions.Item>}
//               {item.CrystalType && <Descriptions.Item label="Crystal Type">{item.CrystalType}</Descriptions.Item>}
//               {item.BraceletMaterial && <Descriptions.Item label="Bracelet Material">{item.BraceletMaterial}</Descriptions.Item>}
//               {item.CaseSize && <Descriptions.Item label="Case Size">{item.CaseSize}</Descriptions.Item>}
//               {item.Movement && <Descriptions.Item label="Movement">{item.Movement}</Descriptions.Item>}
//               {item.Gender && <Descriptions.Item label="Gender">{item.Gender}</Descriptions.Item>}
//               {item.Category && <Descriptions.Item label="Category">{item.Category}</Descriptions.Item>}
//               {item.BrandName && <Descriptions.Item label="Brand Name">{item.BrandName}</Descriptions.Item>}
//               {item.Description && <Descriptions.Item label="Description">{item.Description}</Descriptions.Item>}
//               {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
//               {checkImageURL(item.ImageTimepieces) && (
//                 <Descriptions.Item label="Image Timepieces">
//                   <img src={item.ImageTimepieces} alt="Timepieces" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageTimepieces); }} />
//                 </Descriptions.Item>
//               )}
//               {checkImageURL(item.ImageBrand) && (
//                 <Descriptions.Item label="Image Brand">
//                   <img src={item.ImageBrand} alt="Brand" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBrand); }} />
//                 </Descriptions.Item>
//               )}

//               {/* Bridal */}
//               {item.NameBridal && <Descriptions.Item label="Name Bridal">{item.NameBridal}</Descriptions.Item>}
//               {item.BridalStyle && <Descriptions.Item label="Bridal Style">{item.BridalStyle}</Descriptions.Item>}
//               {item.Category && <Descriptions.Item label="Category">{item.Category}</Descriptions.Item>}
//               {item.BrandName && <Descriptions.Item label="Brand Name">{item.BrandName}</Descriptions.Item>}
//               {item.MaterialName && <Descriptions.Item label="Material Name">{item.MaterialName}</Descriptions.Item>}
//               {item.RingSize && <Descriptions.Item label="Ring Size">{item.RingSize}</Descriptions.Item>}
//               {item.SettingType && <Descriptions.Item label="Setting Type">{item.SettingType}</Descriptions.Item>}
//               {item.Gender && <Descriptions.Item label="Gender">{item.Gender}</Descriptions.Item>}
//               {item.Weight && <Descriptions.Item label="Weight">{item.Weight}</Descriptions.Item>}
//               {item.CenterDiamond && <Descriptions.Item label="Center Diamond">{item.CenterDiamond}</Descriptions.Item>}
//               {item.SideDiamond && <Descriptions.Item label="Side Diamond">{item.SideDiamond}</Descriptions.Item>}
//               {item.Price && <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>}
//               {item.Description && <Descriptions.Item label="Description">{item.Description}</Descriptions.Item>}
//               {checkImageURL(item.ImageBridal) && (
//                 <Descriptions.Item label="Image Bridal">
//                   <img src={item.ImageBridal} alt="Bridal" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBridal); }} />
//                 </Descriptions.Item>
//               )}
//               {checkImageURL(item.ImageBrand) && (
//                 <Descriptions.Item label="Image Brand">
//                   <img src={item.ImageBrand} alt="Brand" width="200" onError={(e) => { e.target.src = 'fallback-image-url.jpg'; console.error('Error loading image:', item.ImageBrand); }} />
//                 </Descriptions.Item>
//               )}
//             </Descriptions>
//           </List.Item>
//         )}
//       />

//       <Button
//         type="primary"
//         onClick={handleVerifyOrder}
//         style={{ marginTop: "20px" }}
//       >
//         Verify Order
//       </Button>
//     </div>
//   );
// };

// export default OrderDetail;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Descriptions, Button, message, List, Typography } from "antd";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commonValues, setCommonValues] = useState({});
  const [priceByMaterialID, setPriceByMaterialID] = useState({});
  const [priceByRingMaterialID, setPriceByRingMaterialID] = useState({});

  const { id } = useParams();
  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/features/order/${id}`);
      const orders = response.data;
      setOrderDetails(orders);
      setLoading(false);

      const common = calculateCommonValues(orders);
      setCommonValues(common);

      // Fetch prices for each unique MaterialID in the order details
      const materialIDs = orders.flatMap(order => [
        order.MaterialID,
        // Add other material IDs if applicable
      ]).filter(Boolean);

      const uniqueMaterialIDs = [...new Set(materialIDs)];

      await Promise.all(uniqueMaterialIDs.map(materialID => fetchBridalPrice(materialID)));
      await Promise.all(uniqueMaterialIDs.map(materialID => fetchRingPrice(materialID)));

    } catch (error) {
      message.error("Failed to fetch order details.");
      setLoading(false);
    }
  };

  const fetchBridalPrice = async (materialID) => {
    if (isNaN(materialID)) {
      console.error(`Invalid MaterialID: ${materialID}`);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8090/products/bridal-price/${materialID}`);
      setPriceByMaterialID(prevPrices => ({
        ...prevPrices,
        [materialID]: response.data[0]?.Price || 'Not available'
      }));
    } catch (error) {
      message.error("Failed to fetch bridal price.");
    }
  };

  const fetchRingPrice = async (materialID) => {
    if (isNaN(materialID)) {
      console.error(`Invalid MaterialID: ${materialID}`);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8090/products/ring-price/${materialID}`);
      setPriceByRingMaterialID(prevPrices => ({
        ...prevPrices,
        [materialID]: response.data[0]?.Price || 'Not available'
      }));
    } catch (error) {
      message.error("Failed to fetch bridal price.");
    }
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleVerifyOrder = async () => {
    try {
      await axios.put(
        "http://localhost:8090/features/update-order-status-sale",
        { orderID: id }
      );
      message.success("Order verified successfully");
      window.history.back();
    } catch (error) {
      console.error("Error verifying order:", error);
      message.error("Error verifying order");
    }
  };

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
        dataSource={orderDetails}
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
                  <Descriptions.Item label="Bridal Price">
                    {`$${priceByMaterialID[order.MaterialID] || 'Not available'}`}
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
                  <Descriptions.Item label="Ring Size">
                    {order.RingSize}
                  </Descriptions.Item>
                  <Descriptions.Item label="Material Name">
                    {order.MaterialName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ring Price">
                    {`$${priceByRingMaterialID[order.MaterialID] || 'Not available'}`}
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
      
      {/* <Button type="primary" style={{ margin: "10px" }} onClick={() => message.success("Order verified successfully!")}>
        Verify Order
      </Button> */}
       <Button
         type="primary"
        onClick={handleVerifyOrder}
         style={{ marginTop: "20px" }}
       >
         Verify Order
       </Button>
       <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
};

export default OrderDetail;
