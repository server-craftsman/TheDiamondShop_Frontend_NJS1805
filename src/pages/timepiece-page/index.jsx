import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";

function TimepiecePage() {
  return (
    <div className="timepiecepage">
      {/* <Header /> */}
      <h1>Each timepiece represents each person's unique style.</h1>
      <h1>Choose your style</h1>
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

export default TimepiecePage;
