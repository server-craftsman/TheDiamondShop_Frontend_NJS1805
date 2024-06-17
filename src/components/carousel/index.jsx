// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "./index.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Carousel({
  
  numberOfSlide,
  isUseNavigation = false,
}) {
  const [banner, setBanner] = useState([]);

  const fetechBanner = async () => {
    const response = await axios.get(
      "http://localhost:8090/products/banner"
    );
    console.log(response.data);
    setBanner(response.data);
  };
  useEffect(() => {
    fetechBanner();
  });
  return (
    <>
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
        className="carousel"
      >
        {banner.map((banners) => (
          <SwiperSlide key={banners.BannerID}>
            <img src={banners.ImageBanner} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
