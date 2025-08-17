import user_profile from '../../assets/home/user_profile.png';
import { RiEdit2Fill } from "react-icons/ri";
import { TbBubbleText } from "react-icons/tb";
import { RiImageAddFill } from "react-icons/ri";
import { IoHelpCircleOutline } from "react-icons/io5";

const ProfileSettings = () => {
    return (
        <div className="pl-[26px] pt-7 pb-14 pr-[39px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]">
            <h3 className="font-primary font-semibold text-xl">Profile Settings</h3>
            <div className="flex flex-col h-full">
                <div className='ml-4 mt-[49px] flex items-center gap-x-[31px]'>
                    <img src={user_profile} alt="#user_profile" className='outline-[3px] outline-white' />
                    <div>
                        <h2 className='font-primary font-semibold text-[25px]'>Shohel Rana Baig</h2>
                        <p className='font-primary text-xl'>Stay home stay safe</p>
                    </div>
                </div>
                <div className='border-1 border-black/25 mt-[29px]'></div>
                {/* Edit profile info */}
                <div className='ml-9 mt-[43px] flex-1'>
                    <div className='flex gap-9'>
                        <RiEdit2Fill size={30} />
                        <p className='font-primary text-xl'>Edit Profile Name.</p>
                    </div>
                    <div className='flex gap-9 mt-[37px]'>
                        <TbBubbleText size={30} />
                        <p className='font-primary text-xl'>Edit Profile Status Info.</p>
                    </div>
                    <div className='flex gap-9 mt-[37px]'>
                        <RiImageAddFill size={30} />
                        <p className='font-primary text-xl'>Edit Profile Photo.</p>
                    </div>
                    <div className='flex gap-9 mt-[37px]'>
                        <IoHelpCircleOutline size={30} />
                        <p className='font-primary text-xl'>Help.</p>
                    </div>
                </div>
                {/* Edit profile info ends*/}
                <p className='font-primary text-xl text-black/50 text-center'>Chat App</p>
            </div>
        </div>
    )
}

export default ProfileSettings
