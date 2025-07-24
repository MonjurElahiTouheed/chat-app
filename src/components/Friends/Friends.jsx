import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';
import friend5 from '../../assets/home/marvin.png';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Layout/Button";
import { toast } from "react-toastify";

const Friends = ({ className, height_value }) => {
    const db = getDatabase();
    const data = useSelector(state => state.userInfo.user.user);
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
    }, [])
    console.log(friendList)
    const users = [
        {
            image: friend1,
            user_name: 'Raghav',
            last_message: 'Dinner?',
            last_replay_time: 'Today, 8:56pm'
        },
        {
            image: friend5,
            user_name: 'Swathi',
            last_message: 'Sure!',
            last_replay_time: 'Today, 2:31pm'
        },
        {
            image: friend3,
            user_name: 'Kiran',
            last_message: 'Hi.....',
            last_replay_time: 'Yesterday, 6:22pm'
        },
        {
            image: friend1,
            user_name: 'Tejeshwini C',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        },
        {
            image: friend5,
            user_name: 'Marvin McKinney',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        },
        {
            image: friend3,
            user_name: 'Marvin McKinney',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        },
        {
            image: friend1,
            user_name: 'Raghav',
            last_message: 'Dinner?',
            last_replay_time: 'Today, 8:56pm'
        },
        {
            image: friend5,
            user_name: 'Swathi',
            last_message: 'Sure!',
            last_replay_time: 'Today, 2:31pm'
        },
        {
            image: friend3,
            user_name: 'Kiran',
            last_message: 'Hi.....',
            last_replay_time: 'Yesterday, 6:22pm'
        },
        {
            image: friend1,
            user_name: 'Tejeshwini C',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        },
        {
            image: friend5,
            user_name: 'Marvin McKinney',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        },
        {
            image: friend3,
            user_name: 'Marvin McKinney',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        }
    ];
    const handleUnfriend = (user) => {
        remove(ref(db, "friends/" + user.userId))
            .then(() => {
                console.log(friendList)
                toast.error(` ${user.senderName} ওর সাথে কাট্টি 😐`);
            })
    }

    const handleBlock = (user) => {
        if (data.uid === user.senderId) {
            set(push(ref(db, 'blockList/')), {
                blockId: user.receiverId,
                blockName: user.receiverName,
                blockById: user.senderId,
                blockByName: user?.senderName
            }).then(() => {
                remove(ref(db, "friends/" + user.userId))
                    .then(() => {
                        console.log(friendList)
                        toast.error(` ${user.senderName} ওর সাথে কাট্টি 😐`);
                    })
            })
        }
        else {
            set(push(ref(db, 'blockList/')), {
                blockId: user.senderId,
                blockName: user.senderName,
                blockById: user.receiverId,
                blockByName: user?.receiverName
            }).then(() => {
                remove(ref(db, "friends/" + user.userId))
                    .then(() => {
                        console.log(friendList)
                        toast.error(` ${user.senderName} ওর সাথে কাট্টি 😐`);
                    })
            })
        }


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
                            <div>
                                <Button onClick={() => handleUnfriend(user)} className='px-2 py-0.5'>unfriend</Button>
                                <Button onClick={() => handleBlock(user)} className='text-center bg-red-500 hover:bg-red-800 py-0.5 mt-2'>block</Button>
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default Friends;