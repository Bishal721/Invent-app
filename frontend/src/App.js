import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import SideBar from "./components/sidebar/SideBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contactus from "./pages/contact/Contactus";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await GetLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route
          path="/dashboard"
          element={
            <SideBar>
              <Layout>
                <Dashboard />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/add-product"
          element={
            <SideBar>
              <Layout>
                <AddProduct />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <SideBar>
              <Layout>
                <ProductDetail />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/edit-products/:id"
          element={
            <SideBar>
              <Layout>
                <EditProduct />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/profile"
          element={
            <SideBar>
              <Layout>
                <Profile />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <SideBar>
              <Layout>
                <EditProfile />
              </Layout>
            </SideBar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <SideBar>
              <Layout>
                <Contactus />
              </Layout>
            </SideBar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
