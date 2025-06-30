import { Outlet } from "react-router";
import Menubar from "../components/Menubar/Menubar";

const Root = () => {
    return (
        <div className="pl-8 pr-[23px] py-[35px] flex gap-[43px justify-between">
            <Menubar></Menubar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;