import React from "react";
import CreateOrder from "../../component/createOrder/CreateOrder";
import "./OrderPage.css";

const OrderPage = () => {
  return (
    <div className="order-container">
      <CreateOrder />
    </div>
  );
};

export default OrderPage;
