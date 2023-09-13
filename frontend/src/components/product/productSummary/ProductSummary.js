import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import InfoBox from "../../infoBox/InfoBox";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STORE_VALUE,
  selectOutOfStock,
  selectTotalStoreValue,
  CALC_OUTOFSTOCK,
  CALC_Category,
  selectCategory
} from "../../../redux/features/product/productSlice";
//Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const OutOfStock = useSelector(selectOutOfStock);
  const AllCategory = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_Category(products));
  }, [dispatch, products]);
  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`Rs${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out Of Stock"}
          count={OutOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={AllCategory.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
