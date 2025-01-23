import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const links = (
    <>
      {" "}
      <Link
        to="/publisher"
        className="hover:text-yellow-300 transition duration-300 font-marcellus  "
        onClick={toggleMobileMenu}
      >
        Publisher
      </Link>
      <Link
        to="/advertise"
        className="hover:text-yellow-300 transition duration-300 font-marcellus  "
        onClick={toggleMobileMenu}
      >
        Advertise
      </Link>
      <Link
        to="/about"
        className="hover:text-yellow-300 transition duration-300 font-marcellus "
        onClick={toggleMobileMenu}
      >
        About
      </Link>
      <Link
        to="/contact"
        className="hover:text-yellow-300 transition duration-300 font-marcellus "
        onClick={toggleMobileMenu}
      >
        Contact
      </Link>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500  to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold font-macondo">
          <Link to="/">TheWarriorMedia</Link>
        </div>

        

        {/* Desktop Links */}

        <div className="hidden md:flex space-x-6 ">{links}</div>

        {/* Buttons for Desktop */}

        <div className="hidden md:flex items-center space-x-4 ">
          <button
            className="text-red flex   relative  px-4 py-2 rounded-md font-bold overflow-hidden border
           border-red-500 bg-white  text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 
           before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all 
           duration-1000 before:duration-1000 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full"
          >
            <Link to={'login'} className="relative z-10">Login</Link>
          </button>

          <button
            className="relative flex px-4 py-2 rounded-md  font-bold items-center justify-center overflow-hidden 
          bg-red-600  text-white shadow-2xl transition-all duration-300 before:absolute 
          before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear 
          hover:bg-white hover:text-red-600 hover:shadow-blue-600 hover:before:border-[25px]"
          >
            <Link  to={'register'} className="relative z-10">Register</Link>
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-600">
          <div className="flex flex-col px-10  items-start space-y-4 py-6">
            {links}
            <button
              className="bg-white w-full text-indigo-600 hover:bg-gray-100 transition px-4 py-2 rounded-md"
              onClick={toggleMobileMenu}
            >
              Login
            </button>
            <button
              className="bg-yellow-300 w-full text-indigo-900 hover:bg-yellow-400 transition px-4 py-2 rounded-md"
              onClick={toggleMobileMenu}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
