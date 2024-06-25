import React from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Button } from "antd";
import { useCart } from "../../CartContext";
import "./index.scss";
import Footer from "../../components/footer";

const ProductDetailsBridalPage = ({ data }) => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = data.find((item) => item.BridalID.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
        id: product.BridalID,
        name: product.NameBridal,
        image: product.ImageBridal,
        price: product.Price,
        quantity: 1,
      });
  };

  return (
    <div>
    <div className="product-details">
      <div className="product-details-content">
        <div className="image-section">
          <Image src={product.ImageBridal} />
          <div className="">
            <p>Descriptors:</p> <span>{product.Description}</span>
          </div>
        </div>
        <div className="details-section">
          <h1>{product.BridalStyle}</h1>
          <div className="price">
            <span className="discounted-price">{product.Price}$</span>
          </div>
          <div className="attributes">
            <div className="attribute-row">
              <p>Name Bridal:</p> <span>{product.NameBridal}</span>
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
              <p>Setting Type:</p> <span>{product.SettingType}</span>
            </div>
            <div className="attribute-row">
              <p>Gender:</p> <span>{product.Gender}</span>
            </div>
            <div className="attribute-row">
              <p>Weight:</p> <span>{product.Weight}</span>
            </div>
            <div className="attribute-row">
              <p>Center Diamond:</p> <span>{product.CenterDiamond}</span>
            </div>
            <div className="attribute-row">
              <p>Diamond Carat Range:</p> <span>{product.DiamondCaratRange}</span>
            </div>
            <div className="attribute-row">
              <p>Ring Size Rang:</p> <span>{product.RingSizeRang}</span>
            </div>
            <div className="attribute-row">
              <p>Total Carat Weight:</p> <span>{product.TotalCaratWeight}</span>
            </div>
            <div className="attribute-row">
              <p>Total Diamond:</p> <span>{product.TotalDiamond}</span>
            </div>
            <div className="attribute-row">
            <p>Image Brand</p> <Image src={product.ImageBrand} />
            </div>
          </div>
          <Button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetailsBridalPage;
