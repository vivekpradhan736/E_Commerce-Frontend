import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user} = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const response = await axios.get("https://e-commerce-backend-9v8h.onrender.com/api/v1/stripeapikey", {
        withCredentials: true // This adds the credentials to the request
      });
      setStripeApiKey(response.data.stripeApiKey);
    } catch (error) {
      console.error("AxiosError:", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif", "Droid Sans", "Chilanka"],
      },
    });
    
    store.dispatch(loadUser());
    
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/process/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/account" element={ <Profile /> } />
        <Route exact path="/me/update" element={ <UpdateProfile /> } />
        <Route exact path="/password/update" element={ <UpdatePassword /> } />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={ <Shipping /> } />
        <Route exact path="/order/confirm" element={ <ConfirmOrder /> } />
        <Route exact path="/success" element={ <OrderSuccess /> } />
        <Route exact path="/orders" element={ <MyOrders /> } />
        <Route exact path="/order/:id" element={ <OrderDetails /> } />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/products" element={ <ProductList /> } />
        <Route exact path="/admin/product" element={ <NewProduct /> } />
        <Route exact path="/admin/product/:id" element={ <UpdateProduct /> } />
        <Route exact path="/admin/orders" element={ <OrderList /> } />
        <Route exact path="/admin/order/:id" element={ <ProcessOrder /> } />
        <Route exact path="/admin/users" element={ <UsersList /> } />
        <Route exact path="/admin/user/:id" element={ <UpdateUser /> } />
        <Route exact path="/admin/reviews" element={ <ProductReviews /> } />
        <Route exact element={window.location.pathname === "/process/payment" ? null : <NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
