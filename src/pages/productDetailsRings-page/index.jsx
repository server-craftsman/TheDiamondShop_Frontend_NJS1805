import React from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Button } from "antd";
import { useCart } from "../../CartContext";
import "./index.scss";
import Footer from "../../components/footer";

const ProductDetailsRingPage = ({ data }) => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = data.find((item) => item.DiamondRingsID.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
        id: product.RingsID,
        name: product.NameRings,
        image: product.ImageRings,
        price: product.Price,
        quantity: 1,
      });
  };

  return (
    <div>
    <div className="product-details">
      <div className="product-details-content">
        <div className="image-section">
          <Image alt={product.DiamondOrigin} src={product.ImageRings} />
          <div className="">
            <p>Descriptors:</p> <span>{product.Description}</span>
          </div>
        </div>

        <div className="details-section">
          {/* <h1>{product.RingStyle}</h1> */}
          <h1>{product.NameRings}</h1>
          <div className="price">
            <span className="discounted-price">${product.Price}</span>
          </div>
          <Button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </Button>
          <hr />
          <div className="attributes">
          <h2>Specifications:</h2>
            <div className="attribute-row">
              <p>Rings Style:</p> <span>{product.RingStyle}</span>
            </div>
            <div className="attribute-row">
              <p>Category:</p> <span>{product.Category}</span>
            </div>
            <div className="attribute-row">
              <p>Inventory:</p> <span>{product.Inventory}</span>
            </div>
            <div className="attribute-row">
              <p>Brand Name:</p> <span>{product.BrandName}</span>
            </div>
            <div className="attribute-row">
              <p>Material:</p> <span>{product.Material}</span>
            </div>
            <div className="attribute-row">
              <p>Center Gemstone:</p> <span>{product.CenterGemstone}</span>
            </div>
            <div className="attribute-row">
              <p>Center Gemstone Shape:</p> <span>{product.CenterGemstoneShape}</span>
            </div>
            <div className="attribute-row">
              <p>Width:</p> <span>{product.Width}</span>
            </div>
            <div className="attribute-row">
              <p>Center Diamond Dimension:</p> <span>{product.CenterDiamondDimension}</span>
            </div>
            <div className="attribute-row">
              <p>Weight:</p> <span>{product.Weight}</span>
            </div>
            <div className="attribute-row">
              <p>Gemstone Weight:</p> <span>{product.GemstoneWeight}</span>
            </div>
            <div className="attribute-row">
              <p>Center Diamond Color:</p> <span>{product.CenterDiamondColor}</span>
            </div>
            <div className="attribute-row">
              <p>Center Diamond Clarity:</p> <span>{product.CenterDiamondClarity}</span>
            </div>
            <div className="attribute-row">
              <p>Center Diamond CaratWeight:</p> <span>{product.CenterDiamondCaratWeight}</span>
            </div>
            <div className="attribute-row">
              <p>Ring Size:</p> <span>{product.RingSize}</span>
            </div>
            <div className="attribute-row">
              <p>Gender:</p> <span>{product.Gender}</span>
            </div>
            <div className="attribute-row">
              <p>Fluorescence:</p> <span>{product.Fluorescence}</span>
            </div>
            <div className="attribute-row">
            <p>Image Brand</p> <Image src={product.ImageBrand} />
            </div>
          </div>
          {/* <Button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </Button> */}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetailsRingPage;
