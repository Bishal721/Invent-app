import React, { useEffect } from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../../customHooks/useRedirectLoggedOutUser";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImage } from "../../loader/Loader";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">InStock</span>;
    }
    return <span className="--color-danger">Out of Stock</span>;
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
      //   console.log(product);
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch,id]);
  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card>
        {isLoading && <SpinnerImage />}
        {product && (
          <div className="detail">
            <Card className="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No Image set for this Product </p>
              )}
            </Card>
            <h4>Product Availability : {stockStatus(product.quantity)} </h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;