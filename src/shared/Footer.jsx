import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        
        {/* Left Side - Company Name */}
        <div className="text-xl mt-3 font-bold font-macondo">
        TheWarriorMedia
        </div>

        {/* Center - Links */}
        <div className="space-x-4 text-sm">
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} YourCompany. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
