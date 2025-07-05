import user_profile from '../../assets/home/user_profile.png';
import { SlHome } from "react-icons/sl";
import { AiFillMessage } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { Link, NavLink } from 'react-router';
import { ImExit } from "react-icons/im";

const Menubar = () => {
    return (
        <div className="bg-primary pt-[38px] pb-[47px] w-[186px] rounded-[20px]">
            <div>
                <img className='mx-auto' src={user_profile} alt="" />
            </div>
            {/* <div className='mt-[98px] flex flex-col gap-[60px] pl-[25px]'>
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
            </div> */}
            {/* <div className='mt-[98px] flex flex-col gap-[60px] pl-[25px]'> */}
            <div className="mt-[78px]">

                <NavLink
                    to="/home"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-black relative after:content-[''] after:absolute after:bg-white after:w-full after:h-full after:rounded-2xl after:z-[-1] z-[1] after:top-0 after:left-[25px] py-[20px] block before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl before:bg-primary before:shadow-[-2px_0_4px_rgba(0,0,0,0.25)]" : "text-white py-[20px] block"
                    }
                >
                    <SlHome size={45} className='mx-auto'/>
                </NavLink>
            </div>
            <div className="mt-[60px]">
                <NavLink
                    to="/chat"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-black relative after:content-[''] after:absolute after:bg-white after:w-full after:h-full after:rounded-2xl after:z-[-1] z-[1] after:top-0 after:left-[25px] py-[20px] block before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl before:bg-primary before:shadow-[-2px_0_4px_rgba(0,0,0,0.25)]" : "text-white py-[20px] block"
                    }
                >
                    <AiFillMessage size={45} className='mx-auto'/>
                </NavLink>
            </div>
            <div className="mt-[60px]">

                <NavLink
                    to="/settings"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-black relative after:content-[''] after:absolute after:bg-white after:w-full after:h-full after:rounded-2xl after:z-[-1] z-[1] after:top-0 after:left-[25px] py-[20px] block before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl before:bg-primary before:shadow-[-2px_0_4px_rgba(0,0,0,0.25)]" : "text-white py-[20px] block"
                    }
                >
                    <GoGear size={45} className='mx-auto'/>
                </NavLink>
            </div>
            {/* </div> */}
                <Link to='/logi' className='pl-[45px pr-[70px mt-[193px] flex justify-center'>
                    <ImExit size={45} color='white' className='pl-[45px pt- pb-[26px text-white' />
                </Link>
        </div>
    );
};

export default Menubar;