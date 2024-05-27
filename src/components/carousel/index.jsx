// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import "./index.scss";

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="carousel"
      >
        <SwiperSlide>
          <img
            src="https://i5.walmartimages.com/seo/Women-s-Double-Layer-Micro-Inlaid-Zircon-Artificial-Diamond-Ring-Set_982efef2-d3aa-464a-99af-2fcf9bf356be.175f5939a7793421774a6cb59ae07d51.jpeg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.withclarity.com/cdn/shop/articles/SOLITAIRE_ENGAGEMENT_RINGS.jpg?v=1697178742"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
