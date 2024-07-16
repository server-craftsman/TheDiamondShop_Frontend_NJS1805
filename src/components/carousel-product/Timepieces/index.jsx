// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// import "./index.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function CarouselTimepiece({
  numberOfSlide,
  isUseNavigation = false,
}) {
  const { Meta } = Card;
  const [highestPricedProducts, setHighestPricedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighestPricedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/products/timepieces"
        );
        let products = response.data;

        // Sort products by price in descending order and take the top 10
        products = products.sort((a, b) => b.Price - a.Price).slice(0, 10);

        setHighestPricedProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHighestPricedProducts();
  }, []);

  const handleCardClick = (DiamondTimepiecesID) => {
    navigate(`/timepieces-detail/${DiamondTimepiecesID}`);
  };

  return (
    <Card
      title={
        <span style={{ color: "#333", fontSize: "30px" }}>
          Highest Priced Timepieces
        </span>
      }
      style={{
        width: "100%",
        maxWidth: "1600px", // Set a maximum width
        padding: "20px",
        margin: "70px auto", // Center the card horizontally
        backgroundColor: "azure",
        overflow: "hidden", // Prevent overflow
      }}
    >
      <Swiper
        navigation={isUseNavigation}
        slidesPerView={numberOfSlide}
        spaceBetween={30}
        autoplay={{
          delay: 2300,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
        style={{ width: "100%", boxSizing: "border-box", overflow: "hidden" }}
      >
        {highestPricedProducts.map((product) => (
          <SwiperSlide key={product.TimepieceID}>
            <Card
              onClick={() => handleCardClick(product.DiamondTimepiecesID)}
              key={product.TimepieceID}
              hoverable
              cover={
                <img
                  src={product.ImageTimepieces}
                  alt=""
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              }
              style={{
                width: "100%", // Set the width to 100% for responsiveness
                maxWidth: "300px", // Optional: limit the maximum width
                height: "400px",
                margin: "auto",
              }}
            >
              <Meta
                title={
                  <span
                    style={{ whiteSpace: "normal", display: "-webkit-flex" }}
                  >
                    {product.NameTimepieces}
                  </span>
                }
                description={
                  <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                    {product.Price}$
                  </span>
                }
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/timepiece-page">
          <Button type="primary">View More</Button>
        </Link>
      </div>
    </Card>
  );
}
