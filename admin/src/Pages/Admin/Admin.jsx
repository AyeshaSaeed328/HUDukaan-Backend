import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import AddProduct from '../../Components/AddProduct';
import ViewOrders from '../../Components/ViewOrders';
import ListProduct from '../../Components/ListProduct';

const Admin = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/vieworders" element={<ViewOrders />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
