import React from "react";
import "./ConfirmOrder.css";
import { Button } from "antd";

const ConfirmOrder = ({ handleCloseModal, order, total }) => {
  console.log("1", order);
  return (
    <div className="confirm-container">
      <div className="title">
        <div className="title-content">Xác nhận thông tin</div>
        <div onClick={handleCloseModal} className="close-icon">
          <button>x</button>
        </div>
      </div>
      <div className="customer">
        <div className="customer-left">
          <div className="customer-group">
            <span>Tên KH: </span>
            <div>{order.customerName}</div>
          </div>
          <div className="customer-group">
            <span>Email:</span>
            <div>{order.email}</div>
          </div>
        </div>
        <div className="customer-right">
          <div className="customer-group">
            <span>SĐT:</span>
            <div>{order.phone}</div>
          </div>
        </div>
      </div>
      <div className="product">
        <span>Giỏ hàng</span>
        <div className="list-product">
          {order.cart.map((item, index) => (
            <div key={index} className="product-item">
              <div className="product-name">
                <strong> Tên:</strong> {item.name}
              </div>
              <div className="product-quantity">
                <strong>SL:</strong> {item.quantity}
              </div>
              <div className="product-price">
                <strong>Đơn giá:{"   "}</strong>
                <span>
                  {item.discountCode === "8"
                    ? (item.price * item.quantity * 0.92).toLocaleString()
                    : item.discountCode === "10"
                    ? (item.price * item.quantity - 10000).toLocaleString()
                    : (item.price * item.quantity).toLocaleString()}{" "}
                </span>
                VND
              </div>

              <div className="product-discount">
                <strong style={{ marginRight: "5px" }}>Mã đã dùng:</strong>
                {item.discountCode === "8"
                  ? "giảm 8%"
                  : item.discountCode === "10"
                  ? "giảm 10k"
                  : "chưa áp mã"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-price">
        <div className="total-left">
          <div className="total-group">
            <span>Thanh toán bằng: </span>
            <div>{order.paymentMethod === "cash" ? "Tiền mặt" : "Thẻ"}</div>
          </div>
          <div className="total-group">
            <span>Tổng tiền:</span>
            <div style={{ color: "red" }}>{total.toLocaleString()} VND</div>
          </div>
        </div>
        <div className="total-right">
          <div className="total-group">
            <span>Tiền nhận:</span>
            <div>{(order.giveAmount - 0).toLocaleString()} VND</div>
          </div>
          <div className="total-group">
            <span>Tiền thừa:</span>
            <div>{(order.giveAmount - total).toLocaleString()} VND</div>
          </div>
        </div>
      </div>
      <div className="btn-submit">
        <Button type="primary"> Hoàn tất</Button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
