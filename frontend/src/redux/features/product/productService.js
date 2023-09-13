import axios from "axios";
import { BACKEND_URL } from "../../../services/authService";
const API_URL = `${BACKEND_URL}/api/products/`;
// Create new Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
// Get all Product
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Delete a  Product
const deleteProducts = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get Single Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id,formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData );
  return response.data;
}; 

const productService = {
  createProduct,
  getProducts,
  deleteProducts,
  getProduct,
  updateProduct,
};
export default productService;
