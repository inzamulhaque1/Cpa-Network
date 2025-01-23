import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";



const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default MainLayout;