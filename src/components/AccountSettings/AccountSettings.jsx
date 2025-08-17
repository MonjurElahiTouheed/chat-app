import { RiEdit2Fill } from "react-icons/ri";
import { TbBubbleText } from "react-icons/tb";
import { RiImageAddFill } from "react-icons/ri";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const AccountSettings = () => {
    return (
        <div className="pl-[26px] pt-7 pb-14 pr-[39px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]">
            <h3 className="font-primary font-semibold text-xl">Account Settings</h3>
            <div className="flex flex-col h-full">
                {/* Edit profile info */}
                <div className='ml-9 mt-[43px] flex-1'>
                    <div className='flex gap-9'>
                        <FaKey size={25} />
                        <p className='font-primary text-xl'>Change Password</p>
                    </div>
                    <div className='flex gap-9 mt-[37px]'>
                        <RiDeleteBin6Fill size={28} />
                        <p className='font-primary text-xl'>Delete Account.</p>
                    </div>
                </div>
                {/* Edit profile info ends*/}
                <p className='font-primary text-xl text-black/50 text-center'>Chat App</p>
            </div>
        </div>
    )
}

export default AccountSettings
