import Carousel from "../../components/carousel";
import Footer from "../../components/footer";
import "./index.scss";
import CarouselTimepiece from "../../components/carousel-product/Timepieces";
import CarouselBridal from "../../components/carousel-product/Bridals";
import CarouselDiamond from "../../components/carousel-product/Diamond";
import CarouselRing from "../../components/carousel-product/Rings";

function HomePage() {
  return (
    <div className="homepage">
      <Carousel numberOfSlide={1} isUseNavigation={true} />{" "}
      <CarouselTimepiece numberOfSlide={5} isUseNavigation={true} />
      <CarouselBridal numberOfSlide={5} isUseNavigation={true} />
      <CarouselDiamond numberOfSlide={5} isUseNavigation={true} />
      <CarouselRing numberOfSlide={5} isUseNavigation={true} />
      <Footer />
    </div>
  );
}

export default HomePage;
