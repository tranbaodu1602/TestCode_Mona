import React, { useState } from "react";
import { Input, Select, Radio, Button } from "antd";
import "./CreateOrder.css";
import ConfirmOrder from "../confirmOrder/ConfirmOrder";

// mock data product
const product = [
  { id: 1, name: "product A", price: 10000 },
  { id: 2, name: "product B", price: 20000 },
  { id: 3, name: "product C", price: 30000 },
  { id: 4, name: "product D", price: 10000 },
  { id: 5, name: "product E", price: 20000 },
];

const { Option } = Select;
const CreateOrder = () => {
  const [order, setOrder] = useState({
    customerName: "",
    email: "",
    phone: "",
    cart: [],
    paymentMethod: "cash",
    giveAmount: 0,
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = (productId) => {
    const selectedProduct = product.find((p) => p.id === productId);

    const exisProduct = order.cart.findIndex(
      (item) => item.id === selectedProduct.id
    );
    if (exisProduct !== -1) {
      const newCart = [...order.cart];
      newCart[exisProduct].quantity += 1;
      setOrder({ ...order, cart: newCart });
    } else
      setOrder((preOrder) => ({
        ...preOrder,
        cart: [...preOrder.cart, { ...selectedProduct, quantity: 1 }],
      }));
  };

  const handleUpdateQuantity = (index, quantity) => {
    const newCart = [...order.cart];
    newCart[index].quantity = parseInt(quantity) || 1;
    setOrder({ ...order, cart: newCart });
  };
  const handleDeleteProduct = (index) => {
    // animation
    const element = document.getElementById(`item-${index}`);
    element.classList.add("fade-out");
    setTimeout(() => {
      const newCart = order.cart.filter((_, i) => i !== index);
      setOrder({ ...order, cart: newCart });
    }, 500);
  };
  const handleDiscountChange = (index, value) => {
    const newCart = [...order.cart];
    newCart[index].discountCode = value;
    setOrder({ ...order, cart: newCart });
  };
  const calculateTotal = () => {
    return order.cart.reduce((total, item) => {
      let discount = 0;
      if (item.discountCode === "10") {
        discount = 8000;
      } else if (item.discountCode === "8") {
        discount = item.price * item.quantity * 0.08;
      }
      return total + (item.price * item.quantity - discount);
    }, 0);
  };
  const total = calculateTotal();

  const handlePayment = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="create-order">
      <span>Đơn hàng</span>
      <div className="customer-info">
        <span>Nhập thông tin khách hàng</span>
        <div className="form-input">
          <span>Tên khác hàng</span>
          <Input
            placeholder="Tên khách hàng"
            onChange={(e) =>
              setOrder({ ...order, customerName: e.target.value })
            }
          />
        </div>
        <div className="form-input">
          <span>Email:</span>
          <Input
            placeholder="Email khách hàng"
            onChange={(e) => setOrder({ ...order, email: e.target.value })}
          />
        </div>
        <div className="form-input">
          <span>SDT:</span>
          <Input
            placeholder="SĐT khách hàng"
            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          />
        </div>
      </div>
      <div className="product-list">
        <div className="select-item">
          <span>Sản Phẩm:</span>
          <Select placeholder="Chọn sản phẩm" onChange={handleAddProduct}>
            {product.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name} - Giá: {item.price.toLocaleString()} VND
              </Option>
            ))}
          </Select>
        </div>
        <div className="card">
          <span>Giỏ hàng</span>
          <div className="list-card">
            {order.cart.map((item, index) => (
              <div key={index} className="card-item" id={`item-${index}`}>
                <div className="card-top">
                  <div className="card-name">
                    <strong> Tên:</strong> {item.name}
                  </div>
                  <div className="card-price">
                    <strong>Đơn giá:{"   "}</strong>
                    {item.discountCode === "8"
                      ? (item.price * item.quantity * 0.92).toLocaleString()
                      : item.discountCode === "10"
                      ? (item.price * item.quantity - 10000).toLocaleString()
                      : (item.price * item.quantity).toLocaleString()}{" "}
                    VND
                  </div>

                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(index, e.target.value)
                    }
                  />
                </div>
                <div className="card-bottom">
                  <Radio.Group
                    value={item.discountCode}
                    onChange={(e) =>
                      handleDiscountChange(index, e.target.value)
                    }
                  >
                    <Radio value="10">Giảm 10.000</Radio>
                    <Radio value="8">Giảm 8%</Radio>
                  </Radio.Group>
                  <Button danger onClick={() => handleDeleteProduct(index)}>
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="total">
          <span>Tổng tiền</span>
          <p>
            {/* {order.cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString()}{" "}
          vnd */}
            {calculateTotal().toLocaleString()} VND
          </p>
        </div>
      </div>

      <div className="payment-method">
        <span>Phương thức thanh toán</span>
        <Radio.Group
          value={order.paymentMethod}
          onChange={(e) =>
            setOrder({ ...order, paymentMethod: e.target.value })
          }
        >
          <Radio value="cash">Tiền mặt</Radio>
          <Radio value="card">Thẻ</Radio>
        </Radio.Group>

        {order.paymentMethod === "cash" && (
          <div className="input-money">
            <Input
              placeholder="Số tiền khách đưa"
              onChange={(e) =>
                setOrder({
                  ...order,
                  giveAmount: e.target.value,
                })
              }
            />
            {order.giveAmount > total && (
              <p>
                Tiền thừa: {(order.giveAmount - total).toLocaleString()} VND
              </p>
            )}
          </div>
        )}
      </div>
      <Button type="primary" onClick={handlePayment}>
        Thanh toán
      </Button>

      {showModal && (
        <div className="show-modal">
          <ConfirmOrder
            handleCloseModal={handleCloseModal}
            order={order}
            total={total}
          />
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
