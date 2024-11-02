import React, { useState } from "react";
import upload_area from "./Assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Electronics",
    new_price: "",
    old_price: "",
    highlights: "",
    details: "",
    description: "",
    qty: "",
  });

  const AddProduct = async () => {
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
        .then((resp) => resp.json())
        .then((data) =>
          data.success ? alert("Product Added") : alert("Failed")
        );
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="w-full max-w-2xl p-8 mx-6 my-4 bg-white rounded-md box-border">
      <div className="w-full text-gray-500 text-base mb-6">
        <p className="font-medium mb-2">Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
          className="w-full h-12 rounded-md pl-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium"
        />
      </div>
      <div className="flex gap-10 mb-6">
        <div className="w-full text-gray-500 text-base">
          <p className="font-medium mb-2">Price</p>
          <input
            type="text"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-12 rounded-md pl-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium"
          />
        </div>
        <div className="w-full text-gray-500 text-base">
          <p className="font-medium mb-2">Offer Price</p>
          <input
            type="text"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-12 rounded-md pl-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium"
          />
        </div>
        <div className="w-full text-gray-500 text-base">
          <p className="font-medium mb-2">Quantity</p>
          <input
            type="number"
            name="qty"
            value={productDetails.qty}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-12 rounded-md pl-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium"
          />
        </div>
      </div>

      <div className="w-full text-gray-500 text-base mb-6">
        <p className="font-medium mb-2">Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="w-full h-12 rounded-md pl-4 border border-gray-300 text-gray-500 text-sm font-medium"
          onChange={changeHandler}
        >
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Merch">Merch</option>
          <option value="Stationary">Stationary</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>
      
      <div className="w-full text-gray-500 text-base mb-6">
        <p className="font-medium mb-2">Product Image</p>
        <label htmlFor="file-input">
          <img
            className="w-30 h-30 rounded-md object-contain"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          className="hidden"
        />
      </div>
      <div className="w-full text-gray-500 text-base mb-6">
        <p className="font-medium mb-2">Description</p>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Provide brief description here"
          className="w-full h-32 rounded-md p-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium resize-none"
        />
      </div>
      
      <div className="w-full text-gray-500 text-base mb-6">
        <p className="font-medium mb-2">Highlights</p>
        <textarea
          name="highlights"
          value={productDetails.highlights}
          onChange={changeHandler}
          placeholder="Highlight key features here"
          className="w-full h-24 rounded-md p-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium resize-none"
        />
      </div>
      
      <div className="w-full text-gray-500 text-base mb-6">
        <p className="font-medium mb-2">Details</p>
        <textarea
          name="details"
          value={productDetails.details}
          onChange={changeHandler}
          placeholder="Provide detailed description here"
          className="w-full h-32 rounded-md p-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium resize-none"
        />
      </div>
      

      <button
          type="submit"
          className="w-full bg-customPurple text-white py-2 rounded-md hover:bg-purple-900 transition"
          onClick={AddProduct}
        >
          Add Product
        </button>
    </div>
  );
};

export default AddProduct;
