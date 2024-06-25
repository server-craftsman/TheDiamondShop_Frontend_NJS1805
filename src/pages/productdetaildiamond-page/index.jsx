import React from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Button } from "antd";
import { useCart } from "../../CartContext";
import "./index.scss";
import Footer from "../../components/footer";

const ProductDetailsPage = ({ data }) => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = data.find((item) => item.DiamondID.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.DiamondID,
      name: product.DiamondOrigin,
      image: product.Image,
      price: product.Price,
      quantity: 1,
    });
  };

  return (
    <div>
    <div className="product-details">
      <div className="product-details-content">
        <div className="image-section">
          <Image alt={product.DiamondOrigin} src={product.Image} />
          <div className="">
            <p>Descriptors:</p> <span>{product.Descriptors}</span>
          </div>
        </div>
        <div className="details-section">
          <h1>{product.DiamondOrigin}</h1>
          <div className="price">
            <span className="discounted-price">{product.Price}$</span>
          </div>
          <div className="attributes">
            <div className="attribute-row">
              <p>Inventory:</p> <span>{product.Inventory}</span>
            </div>
            <div className="attribute-row">
              <p>Carat Weight:</p> <span>{product.CaratWeight}</span>
            </div>
            <div className="attribute-row">
              <p>Color:</p> <span>{product.Color}</span>
            </div>
            <div className="attribute-row">
              <p>Clarity:</p> <span>{product.Clarity}</span>
            </div>
            <div className="attribute-row">
              <p>Cut:</p> <span>{product.Cut}</span>
            </div>
            <div className="attribute-row">
              <p>Shape:</p> <span>{product.Shape}</span>
            </div>
            <div className="attribute-row">
              <p>Polish:</p> <span>{product.Polish}</span>
            </div>
            <div className="attribute-row">
              <p>Symmetry:</p> <span>{product.Symmetry}</span>
            </div>
            <div className="attribute-row">
              <p>Table Percentage:</p> <span>{product.TablePercentage}%</span>
            </div>
            <div className="attribute-row">
              <p>Depth:</p> <span>{product.Depth}%</span>
            </div>
            <div className="attribute-row">
              <p>Depth:</p> <span>{product.Depth}%</span>
            </div>
            <div className="attribute-row">
              <p>Depth:</p> <span>{product.Depth}%</span>
            </div>
            <div className="attribute-row">
              <p>Measurements:</p> <span>{product.Measurements}</span>
            </div>
            <div className="attribute-row">
              <p>GIAReportNumber:</p> <span>{product.GIAReportNumber}</span>
            </div>
            <div className="attribute-row">
              <p>StockNumber:</p> <span>{product.StockNumber}</span>
            </div>
            <div className="attribute-row">
              <p>LabReportNumber:</p> <span>{product.LabReportNumber}</span>
            </div>
            <div className="attribute-row">
              <p>Gemstone:</p> <span>{product.Gemstone}</span>
            </div>
            <div className="attribute-row">
              <p>GradingReport:</p> <span>{product.GradingReport}</span>
            </div>
            <div className="attribute-row">
              <p>Fluorescence:</p> <span>{product.Fluorescence}</span>
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

export default ProductDetailsPage;
