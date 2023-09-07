import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";

import Home from "./screens/Home";
import Inbox from "./screens/Inbox";
import MyShows from "./screens/MyShows";
import Profile from "./screens/Profile";
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Shipping from "./screens/Shipping";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Home />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/myShows" element={<MyShows />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product">
        <Route path=":id" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/user">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
