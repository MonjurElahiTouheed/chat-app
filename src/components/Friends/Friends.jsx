import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "../../Layout/Button";
import { toast } from "react-toastify";
import { BiMessageSquareDetail } from "react-icons/bi";
import { currentConversationInfo } from "../../slice/currentConversationSlice";
import { RiUserMinusFill } from "react-icons/ri";
import { MdBlockFlipped } from "react-icons/md";

const Friends = ({ className, height_value }) => {

    const db = getDatabase();
    const data = useSelector(state => state.userInfo.user.user);

    const dispatch = useDispatch();
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        const friendRef = ref(db, 'friends/');
        onValue(friendRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                if (data.uid === item.val().receiverId || data.uid === item.val().senderId) {
                    arr.push({ ...item.val(), userId: item.key })
                }
            })
            setFriendList(arr);
            console.log(friendList)
        });
    }, []);

    const handleUnfriend = (user) => {
        remove(ref(db, "friends/" + user.userId))
            .then(() => {
                console.log(friendList)
                toast.error(` ${user.senderName} ওর সাথে কাট্টি 😐`);
            })
    }

    const handleBlock = (user) => {
        set(push(ref(db, 'blockList/')), {
            // blocker is always the current user
            blockId: data.uid,
            blockName: data.displayName,
            // blocker codes above 👆
            // blocked user is current user's friend
            blockById: data.uid === user.senderId ? user.receiverId : user.senderId,
            blockByName: data.displayName === user.senderName ? user.receiverName : user.senderName
            // blocked user's codes above 👆
        }).then(() => {
            remove(ref(db, "friends/" + user.userId))
                .then(() => {
                    console.log(friendList)
                    // toast.error(` ${user.senderName} ওর সাথে কাট্টি 😐`);
                })
        })

        // probably wrong codes below
        // else {
        //     set(push(ref(db, 'blockList/')), {
        //         blockId: user.senderId,
        //         blockName: user.senderName,
        //         blockById: user.receiverId,
        //         blockByName: user?.receiverName
        //     }).then(() => {
        //         remove(ref(db, "friends/" + user.userId))
        //             .then(() => {
        //                 console.log(friendList)
        //                 toast.error(` ${user.senderName} ওর সাথে কাট্টি 😐`);
        //             })
        //     })
        // }
    }

    // msg handler for sending friend user info to redux store
    const handleMessage = friend => {
        console.log(friend);
        localStorage.setItem('currentChatInfo', JSON.stringify(friend));
        dispatch(currentConversationInfo(friend));
    }

    return (
        <div className={`pl-5 pr-[22px] pt-[17px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className}`}>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Friends</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div className={`pr-[10px] mt-1.5 mr-0.5 overflow-y-auto ${height_value}`}>
                {
                    friendList.map((user, index) =>
                        <Flex className={`pt-4 ${index === friendList.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={friend1} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-sm font-semibold">{
                                        data.uid === user.receiverId ? user.senderName : user.receiverName
                                    }</h6>
                                    <p className="font-primary text-xs font-medium text-[rgba(77,77,77,0.75)]">{user?.last_message}</p>
                                </div>
                            </Flex>
                            {/* <p className="font-primary text-[10px] font-medium text-[rgba(77,77,77,0.50)]">{user?.last_replay_time}</p> */}
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleMessage(user)} className='px-1 py-0.5 bg-primary text-white rounded-lg'><BiMessageSquareDetail size={30} />
                                </button>
                                <button onClick={() => handleUnfriend(user)} className='px-2 py-2 bg-primary text-white rounded-lg'><RiUserMinusFill /></button>
                                <button onClick={() => handleBlock(user)} className='px-2 py-2 text-white rounded-lg bg-red-500 hover:bg-red-800 font-bold text-lg'><MdBlockFlipped /></button>
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default Friends;