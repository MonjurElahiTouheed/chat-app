import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend3 from '../../assets/chat/kevin.png';
import { GrSend } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const Chatbox = () => {

    // show current conversation chat
    const currentUser = useSelector(state => state.userInfo.user.user); // Signed In User
    const currentChatFriend = useSelector(state => state.currentConversationInfo.friend);
    // show current conversation chat ends

    // message states are below
    const [message, setMessage] = useState('');
    const [messageCollection, setMessageCollection] = useState([]);

    const db = getDatabase();
    const handleMessage = e => {
        setMessage(e.target.value);
    }

    const handleSend = () => {
        set(push(ref(db, 'messages/')), {
            senderId: currentUser.uid,
            senderName: currentUser.displayName,
            receiverId: currentUser.uid === currentChatFriend.receiverId ? currentChatFriend.senderId : currentChatFriend.receiverId,
            receiverName: currentUser.displayName === currentChatFriend.receiverName ? currentChatFriend.senderName : currentChatFriend.receiverName,
            message: message
        });
        console.log('console')
    }

    useEffect(() => {
        const db = getDatabase();
        const messageRef = ref(db, 'messages/');
        onValue(messageRef, (snapshot) => {
            const arr = [];
            const messageObjects = snapshot;
            console.log(messageObjects);
            messageObjects.forEach(messageObject => {
                arr.push(messageObject.val());
            })
            setMessageCollection(arr);
        });
    }, [])

    console.log(messageCollection);

    return (
        <div className="w-[689px h-[956px shadow-[0_0px_3px_rgba(0,0,0,0.25)] rounded-[20px] flex flex-col">
            {/* chatbox header */}
            <Flex className='rounded-t-[20px] px-[30px] py-[27px] shadow-[0_1px_3px_rgba(0,0,0,0.25)]'>
                {/* profile info */}
                <div className='flex items-center gap-[25px]'>
                    <div>
                        <img src={friend3} alt="#" />
                    </div>
                    <div>
                        {
                            !currentChatFriend ? <h2 className="text-primary font-primary text-3xl font-bold">Select a conversation</h2>
                                :
                                currentUser.uid === currentChatFriend?.senderId ? currentChatFriend.receiverName : currentChatFriend.senderName
                        }
                        <p className="font-primary text-sm">Online</p>
                    </div>
                </div>
                {/* profile info */}
                <div className="text-primary">
                    <BsThreeDotsVertical size={26} className="" />
                </div>
            </Flex>
            {/* chatbox header ends*/}

            {/* chat conversation */}
            {
                messageCollection.map(messageItem => <div className="flex-1">
                    <div className="px-[54px] mt-[56px]">
                        <p className="font-primary font-medium text-shadow-md bg-[#F1F1F1] mt-[30px] px-10 py-[14px] rounded-lg inline-block">{messageItem.message}</p>
                    </div>
                    <div className="px-[54px] mt-[30px] text-right">
                        <p className="font-primary font-medium text-shadow-md text-white bg-primary mt-[30px] px-10 py-[14px] rounded-lg inline-block">{messageItem.message}</p>
                    </div>
                </div>
                )
            }
            {/* chat conversation ends*/}

            <div className="px-7 py-[20px] rounded-b-[20px] shadow-[0_-1px_3px_rgba(0,0,0,0.25)] flex items-center gap-5">
                {/* Message Input below */}
                <input type="text" onChange={handleMessage} className="w-full pl-5 py-4 outline-none bg-[#F1F1F1] rounded-[10px]" placeholder="Send your mind..." />
                <div>
                    <button className='px-2 py-2 mt-2'><GrSend onClick={handleSend} size={30} /></button>
                </div>
            </div>

        </div>
    );
};

export default Chatbox;