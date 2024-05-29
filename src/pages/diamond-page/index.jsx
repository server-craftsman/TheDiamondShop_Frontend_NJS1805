import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";

function DiamondPage() {
  return (
    <div className="diamondpage">
      {/* <Header /> */}
      <h1>Diversity of diamond patterns</h1>
      <h1>Let's choose your favorite color</h1>
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

export default DiamondPage;
