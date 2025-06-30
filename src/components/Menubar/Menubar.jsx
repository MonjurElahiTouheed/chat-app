import user_profile from '../../assets/home/user_profile.png';
import { SlHome } from "react-icons/sl";
import { AiFillMessage } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { Link, NavLink } from 'react-router';
import { FiLogOut } from "react-icons/fi";

const Menubar = () => {
    return (
        <div className="bg-primary pt-[38px] pb-[47px] pl-[43px w-[186px] rounded-[20px]">
            <div className='px-[43px]'>
                <img src={user_profile} alt="" />
            </div>
            <div className='mt-[98px] flex flex-col gap-[60px] pl-[25px]'>
                <NavLink
                    to="/home"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "bg-white text-black pl-[45px] pt-5 pb-[26px] pr-[70px] rounded-l-[20px] relative" : "text-white  pl-[45px] pt-5 pb-[26px] pr-[70px] relative"
                    }
                >
                    <SlHome size={45} />
                    <div className="rounded-l-[25px] absolute w-[10px] h-full bg-primary top-0 right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.25)]"></div>
                </NavLink>
                <NavLink
                    to="/chat"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "bg-white text-black pl-[45px] pt-5 pb-[26px] pr-[70px] rounded-l-[20px] relative" : "text-white  pl-[45px] pt-5 pb-[26px] pr-[70px] relative"
                    }
                >
                    <AiFillMessage size={45} />
                    <div className="rounded-l-[25px] absolute w-[10px] h-full bg-primary top-0 right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.25)]"></div>
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "bg-white text-black pl-[45px] pt-5 pb-[26px] pr-[70px] rounded-l-[20px] relative" : "text-white  pl-[45px] pt-5 pb-[26px] pr-[70px] relative"
                    }
                >
                    <GoGear size={45} />
                    <div className="rounded-l-[25px] absolute w-[10px] h-full bg-primary top-0 right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.25)]"></div>
                </NavLink>
            </div>
                <Link to='/logi' className='pl-[45px pr-[70px mt-[140px] flex justify-center'>
                    <FiLogOut size={45} color='white' className='pl-[45px pt- pb-[26px text-white' />
                </Link>
        </div>
    );
};

export default Menubar;