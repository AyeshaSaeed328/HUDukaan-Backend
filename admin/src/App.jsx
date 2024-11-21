import React from 'react'
import Navbar from './Components/Navbar'
import Admin from './Pages/Admin/Admin'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Admin />
    </div>
  )
}

export default App