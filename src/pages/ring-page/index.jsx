import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";

function RingPage() {
  return (
    <div className="ringpage">
      {/* <Header /> */}
      <h1>The ring makes you noble and shows your class</h1>
      <h1>Choose what suits you</h1>
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

export default RingPage;
