
import {
  Disclosure,
 
} from "@headlessui/react";
import comp_logo from "./Assets/comp-logo.PNG";



export default function Navbar({ }) {
  


  return (
    <Disclosure as="nav" className="bg-customPurple">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Your Company" src={comp_logo} className="h-8 w-auto" />
            </div>
           
          </div>

         

          
        </div>
      </div>

    </Disclosure>
  );
}
