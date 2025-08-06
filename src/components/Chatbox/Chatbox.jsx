import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend3 from '../../assets/chat/kevin.png';
import { GrSend } from "react-icons/gr";
import Button from "../../Layout/Button";
import { useSelector } from "react-redux";
const Chatbox = () => {
    // show current conversation chat
    const currentUserInfo = useSelector(state => state.userInfo.user.user); // Signed In User
    const currentChatInfo = useSelector(state => state.currentConversationInfo.friend);
    // show current conversation chat ends
    return (
        <div className="w-[689px h-[956px shadow-[0_0px_3px_rgba(0,0,0,0.25)] rounded-[20px] flex flex-col">

            {/* chatbox top header */}
            <Flex className='rounded-t-[20px] px-[30px] py-[27px] shadow-[0_1px_3px_rgba(0,0,0,0.25)]'>
                {/* profile info */}
                <div className='flex items-center gap-[25px]'>
                    <div>
                        <img src={friend3} alt="#" />
                    </div>
                    <div className="text-primary">
                        <h3 className="font-primary font-bold text-2xl">
                            {currentUserInfo.uid === currentChatInfo.senderId ? currentChatInfo.receiverName : currentChatInfo.senderName}
                        </h3>
                        <p className="font-primary text-sm">Online</p>
                    </div>
                </div>
                {/* profile info */}
                <div className="text-primary">
                    <BsThreeDotsVertical size={26} className="" />
                </div>
            </Flex>
            {/* chatbox top header ends*/}
            <div className="flex-1">
                <div className="px-[54px] mt-[56px]">
                    <p className="font-primary font-medium text-shadow-md bg-[#F1F1F1] mt-[30px] px-10 py-[14px] rounded-lg inline-block">vaia</p>
                </div>
                <div className="px-[54px] mt-[30px] text-right">
                    <p className="font-primary font-medium text-shadow-md text-white bg-primary mt-[30px] px-10 py-[14px] rounded-lg inline-block">vaia</p>
                </div>
            </div>

            <div className="px-7 py-[20px] rounded-b-[20px] shadow-[0_-1px_3px_rgba(0,0,0,0.25)] flex items-center gap-5">
                <input type="text" className="w-full pl-5 py-4 outline-none bg-[#F1F1F1] rounded-[10px]" placeholder="send your mind" />
                <div>
                    <button className='px-2 py-2 mt-2'><GrSend size={30} /></button>
                </div>
            </div>

        </div>
    );
};

export default Chatbox;