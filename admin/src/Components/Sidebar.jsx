

import { Link } from "react-router-dom";

const Sidebar = () => {
  const Menus = [
    { title: "Add Products" , id:1, route:"addproduct"},
    { title: "List Products" , id:2, route:"listproduct"},
    { title: "View Orders", id:3, route:"vieworders" },
    
  ];
  return(
    
      <div
        className={` ${
          open ? "w-72  border-2 border-light-white" : "w-0 bg-transparent"
        } h-screen p-4 pt-8 relative bg-neutral-100`}
      >
       
        
        <ul className="pt-6">
          {Menus.map((Menu) => (
             <Link to={`/${Menu.route}` } key={Menu.id}>
            <li
              
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-customPurple text-sm items-center gap-x-4 border-b-2 border-light-white
               `}
            >
              <span className={` origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
            </Link>
          ))}
        </ul>
      </div>
      )};export default Sidebar;

