import React from "react";
import { Link } from "react-router-dom";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(individualProduct);
  };

  const backgroundProductImg = individualProduct.url;

  return (
    <div className="col-md-4 p-3 ">
      <Link to={`/product/${individualProduct.ID}`} className="unlinked">
        <div className="card border-0 divHover">
          <div
            style={{ backgroundImage: `url(${backgroundProductImg})` }}
            className="productImg"
          ></div>
          <div className="card-body">
            <h5 className="card-title productTitle">
              {individualProduct.title}
            </h5>
            <p className="card-text productDesc truncate m-0">
              {individualProduct.description}
            </p>
            <p className="card-text productPrice m-1">
              $ {individualProduct.price}
            </p>
          </div>
        </div>
      </Link>
      <div className="d-flex justify-content-center">
        <button type="button" class="btn btnpr" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
