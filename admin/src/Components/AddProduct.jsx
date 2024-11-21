import React, { useState } from "react";
import upload_area from "./Assets/upload_area.svg";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState(null);
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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!productDetails.name) newErrors.name = "Product name is required.";
    if (!image) newErrors.image = "Product image is required.";
    if (!productDetails.old_price) newErrors.old_price = "Price is required.";
    if (!productDetails.qty || productDetails.qty <= 0)
      newErrors.qty = "Quantity must be greater than 0.";
    if (!productDetails.description) newErrors.description = "Description is required.";
    if (!productDetails.highlights) newErrors.highlights = "Highlights are required.";
    if (!productDetails.details) newErrors.details = "Details are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddProduct = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    let dataObj;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append("product", image);

    try {
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      dataObj = await uploadResponse.json();

      if (dataObj.success) {
        product.image = dataObj.image_url;

        const addProductResponse = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const addProductResult = await addProductResponse.json();

        if (addProductResult.success) {
          toast.success("Product added successfully!");
        } else {
          toast.error("Failed to add the product.");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
        <p className="font-medium mb-2">Product Title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
          className="w-full h-12 rounded-md pl-4 border border-gray-300 outline-none text-gray-500 text-sm font-medium"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Price, Offer Price, Quantity */}
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
          {errors.old_price && <p className="text-red-500 text-sm">{errors.old_price}</p>}
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
          {errors.new_price && <p className="text-red-500 text-sm">{errors.new_price}</p>}
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
          {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
        </div>
      </div>

      {/* Image */}
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
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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