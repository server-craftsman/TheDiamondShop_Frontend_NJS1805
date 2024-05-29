import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";

function HomePage() {
  return (
    <div className="homepage">
      {/* <Header /> */}
      <Carousel />
      <h1>Trending</h1>
      <Carousel />
      <h1>Timepiece</h1>
      <Carousel />
      <h1>Elden ring</h1>
      <Carousel />
      <h1>Bridal</h1>
      <Carousel />
    </div>
  );
}

export default HomePage;
