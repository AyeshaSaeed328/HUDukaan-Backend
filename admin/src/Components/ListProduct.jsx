import React, { useEffect, useState } from "react";
import cross_icon from './Assets/cross_icon.png';
import edit_icon from './Assets/edit_icon.png';
import EditProduct from './EditProduct'; 

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); 

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/getproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      // Fetch the updated product list
      await fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handleSave = (updatedProduct) => {
    setAllProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setEditingProduct(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products List</h1>
      <div className="grid grid-cols-8 gap-4 text-white bg-customPurple font-semibold text-sm py-2 rounded-lg mb-4">
        <p className="text-center">Image</p>
        <p className="text-center">Title</p>
        <p className="text-center">Old Price</p>
        <p className="text-center">New Price</p>
        <p className="text-center">Category</p>
        <p className="text-center">Qty</p>
        <p className="text-center">Remove</p>
        <p className="text-center">Edit</p>
      </div>

      {/* Scrollable container for product items */}
      <div className="h-96 overflow-y-auto divide-y divide-gray-300">
        {allproducts.map((e) => {
          return (
            <div key={e.id} className="grid grid-cols-8 items-center py-4 bg-white shadow-md rounded-lg mb-2">
              <img className="h-20 w-20 object-contain mx-auto" src={e.image} alt={e.name} />
              <p className="text-gray-800 text-center">{e.name}</p>
              <p className="text-gray-800 text-center">PKR {e.old_price}</p>
              <p className="text-gray-800 text-center">PKR {e.new_price}</p>
              <p className="text-gray-800 text-center">{e.category}</p>
              <p className="text-gray-800 text-center">{e.qty}</p>
              <img
                className="cursor-pointer w-4 mx-auto"
                onClick={() => { removeProduct(e.id); }}
                src={cross_icon}
                alt="Remove"
              />
              <img
                className="cursor-pointer w-6 h-6 mx-auto"
                onClick={() => setEditingProduct(e)} // Open edit modal
                src={edit_icon}
                alt="Edit"
              />
            </div>
          );
        })}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setEditingProduct(null)} // Close the modal
        />
      )}
    </div>
  );
};

export default ListProduct;
