import Carousel from "../../components/carousel";
import Footer from "../../components/footer";
// import Header from "../../components/header";
import "./index.scss";

function HomePage() {
  return (
    <div className="homepage">
            <Carousel numberOfSlide={1} isUseNavigation={true} /> {/* Include the Carousel component */}
      <Footer />

    </div>
  );
}

export default HomePage;
