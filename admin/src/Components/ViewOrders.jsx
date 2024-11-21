import React, { useEffect, useState } from "react";
import cross_icon from "./Assets/cross_icon.png";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:4000/getproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const fetchOrders = () => {
    fetch("http://localhost:4000/getorders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const getProductDetails = (products, orderProducts) => {
    return orderProducts.map((orderProduct) => {
      const product = products.find((p) => p._id === orderProduct.product);
      return {
        name: product ? product.name : "Unknown",
        quantity: orderProduct.quantity,
      };
    });
  };

  const removeOrder = async (id) => {
    await fetch("http://localhost:4000/removeorder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    fetchOrders();
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] p-6 bg-white rounded-lg shadow-md my-8">
    <h1 className="text-3xl font-bold mb-4">All Orders List</h1>
    <div className="overflow-y-auto w-full">
      {/* Header Row */}
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 p-4 bg-customPurple font-semibold text-center text-white">
        <p className="truncate">Order ID</p>
        <p className="truncate">User</p>
        <p className="truncate">Date</p>
        <p className="truncate">Total</p>
        <p className="truncate">Products</p>
        <p className="truncate">Qty</p>
        <p className="truncate">Remove</p>
      </div>
      {/* Data Rows */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="grid grid-cols-[1fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center border-b p-4 text-gray-700 text-center text-sm"
        >
          <p className="truncate">{order.id}</p>
          <p className="truncate">{order.user}</p>
          <p className="truncate">{order.date}</p>
          <p className="truncate">${order.total}</p>
          <div className="flex flex-col items-center">
            {getProductDetails(products, order.products).map((product, idx) => (
              <span key={idx} className="truncate">
                {product.name}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center">
            {getProductDetails(products, order.products).map((product, idx) => (
              <span key={idx} className="truncate">
                {product.quantity}
              </span>
            ))}
          </div>
          <img
            className="cursor-pointer w-6 h-6 mx-auto"
            onClick={() => removeOrder(order.id)}
            src={cross_icon}
            alt="Remove"
          />
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default ViewOrders;
