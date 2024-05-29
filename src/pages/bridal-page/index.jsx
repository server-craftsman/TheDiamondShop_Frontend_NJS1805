import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";

function BridalPage() {
  return (
    <div className="bridalpage">
      {/* <Header /> */}
      <div></div>
      <h1>Bridal of the year</h1>
      <h1>Let's choose your style</h1>
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

export default BridalPage;
