import React from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Button } from "antd";
import { useCart } from "../../CartContext";
import "./index.scss";
import Footer from "../../components/footer";

const ProductDetailsTimepiecesPage = ({ data }) => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = data.find((item) => item.DiamondTimepiecesID.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
        id: product.DiamondTimepiecesID,
        name: product.NameTimepieces,
        image: product.ImageTimepieces,
        price: product.Price,
        quantity: 1,
      });
  };

  return (
    <div>
    <div className="product-details">
      <div className="product-details-content">
        <div className="image-section">
          <Image src={product.ImageTimepieces} />
          <div className="">
            <p>Descriptors:</p> <span>{product.Description}</span>
          </div>
        </div>
        <div className="details-section">
          <h1>{product.TimepiecesStyle}</h1>
          <div className="price">
            <span className="discounted-price">{product.Price}$</span>
          </div>
          <div className="attributes">
            <div className="attribute-row">
              <p>Name Timepieces:</p> <span>{product.NameTimepieces}</span>
            </div>
            <div className="attribute-row">
              <p>Collection:</p> <span>{product.Collection}</span>
            </div>
            <div className="attribute-row">
              <p>Water Resistance:</p> <span>{product.WaterResistance}</span>
            </div>
            <div className="attribute-row">
              <p>Crystal Type:</p> <span>{product.CrystalType}</span>
            </div>
            <div className="attribute-row">
              <p>Bracelet Material:</p> <span>{product.BraceletMaterial}</span>
            </div>
            <div className="attribute-row">
              <p>Case Size:</p> <span>{product.CaseSize}</span>
            </div>
            <div className="attribute-row">
              <p>Dial Color:</p> <span>{product.DialColor}</span>
            </div>
            <div className="attribute-row">
              <p>Movement:</p> <span>{product.Movement}</span>
            </div>
            <div className="attribute-row">
              <p>Gender:</p> <span>{product.Gender}</span>
            </div>
            <div className="attribute-row">
              <p>Category:</p> <span>{product.Category}</span>
            </div>
            <div className="attribute-row">
              <p>Brand Name:</p> <span>{product.BrandName}</span>
            </div>
            <div className="attribute-row">
              <p>Dial Type:</p> <span>{product.DialType}</span>
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

export default ProductDetailsTimepiecesPage;
