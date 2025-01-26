import React, { useState } from 'react';

const EditProduct = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    image: product.image || '',
    category: product.category || '',
    new_price: product.new_price || '',
    old_price: product.old_price || '',
    qty: product.qty || '',
    highlights: product.highlights || '',
    details: product.details || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    const productWithId = {
      id: product.id,
      ...formData,
    };

    try {
      const response = await fetch('http://localhost:4000/updateproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      onSave(updatedProduct.product); // Trigger the save function
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto w-[500px] z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">Edit Product</h2>
        <form onSubmit={submitEdit}>
            <label className="text-sm text-gray-600">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 mb-2 w-full"
          />
          <label className="text-sm text-gray-600">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 mb-2 w-full"
          />
            <label className="text-sm text-gray-600">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 mb-2 w-full"
          />
            <label className="text-sm text-gray-600">New Price</label>
          <input
            type="number"
            name="new_price"
            value={formData.new_price}
            onChange={handleChange}
            placeholder="New Price"
            className="border p-2 mb-2 w-full"
          />
            <label className="text-sm text-gray-600">Old Price</label>
          <input
            type="number"
            name="old_price"
            value={formData.old_price}
            onChange={handleChange}
            placeholder="Old Price"
            className="border p-2 mb-2 w-full"
          />
            <label className="text-sm text-gray-600">Quantity</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-2 mb-2 w-full"
          />
            <label className="text-sm text-gray-600">Highlights</label>
          <textarea
            name="highlights"
            value={formData.highlights}
            onChange={handleChange}
            placeholder="Highlights"
            className="border p-2 mb-2 w-full"
          />
            <label className="text-sm text-gray-600">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Details"
            className="border p-2 mb-2 w-full"
          />
          <button type="submit" className="w-full bg-customPurple text-white py-2 rounded-md hover:bg-purple-900 transition m-2 ">Save</button>
        </form>
        <button className="w-full bg-customPurple text-white py-2 rounded-md hover:bg-purple-900 transition m-2" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProduct;
