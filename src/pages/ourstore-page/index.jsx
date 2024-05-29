import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";

function OurstorePage() {
  return (
    <div className="ourstorepage">
      {/* <Header /> */}
      <h1>Product quality is our pride</h1>
      <h1>It's a pleasure to be of service to you</h1>
      <Carousel />
      <h1>Trending</h1>
      <Carousel />
      <h1>Best Sales</h1>
      <Carousel />
      <h1>New Products</h1>
      <Carousel />
      <h1>New design</h1>
      <Carousel />
    </div>
  );
}

export default OurstorePage;
