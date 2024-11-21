import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile toggle

  const Menus = [
    { title: "Add Products", id: 1, route: "addproduct" },
    { title: "List Products", id: 2, route: "listproduct" },
    { title: "View Orders", id: 3, route: "vieworders" },
  ];

  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-customPurple text-white rounded-md"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-0"
        } md:w-64 h-screen bg-neutral-100 overflow-hidden md:relative fixed top-0 left-0 transition-all duration-300 z-40`}
      >
        <ul className="pt-6">
          {Menus.map((Menu) => (
            <Link to={`/${Menu.route}`} key={Menu.id}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-customPurple text-sm items-center gap-x-4 border-b-2 border-light-white`}
              >
                <span className={`origin-left duration-200`}>{Menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
