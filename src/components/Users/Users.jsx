import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';
import friend5 from '../../assets/home/marvin.png';
import Button from "../../Layout/Button";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovingComponent from 'react-moving-text'

const Users = () => {
    const db = getDatabase();
    const [userList, setUserList] = useState([]);
    const [friendReqList, setfriendReqList] = useState([]);
    const [friendList, setfriendList] = useState([]);
    const [blockList, setBlockList] = useState([]);
    const data = useSelector(state => state.userInfo.user.user)
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {

            const arr = [];
            snapshot.forEach(item => {
                console.log(item.key, 'item-keys')
                console.log(item.val());
                if (data.uid !== item.key) {
                    arr.push({ ...item.val(), userId: item.key })
                }
            })
            console.log(arr)
            setUserList(arr)
        });
    }, [])
    console.log(userList);

    useEffect(() => {
        const friendReqRef = ref(db, 'friendRequests/');
        onValue(friendReqRef, (snapshot) => {
            const arr = [];
            console.log(snapshot)
            snapshot.forEach(item => {
                console.log(item.val());
                arr.push(item.val().receiverId + item.val().senderId)
                console.log(item.val().receiverId)
                console.log(item.val().senderId)
            })
            console.log(arr)
            setfriendReqList(arr)
            console.log(friendReqList);
        });
        console.log(friendReqList);
    }, [])
    useEffect(() => {
        const friendRef = ref(db, 'friends/');
        onValue(friendRef, (snapshot) => {
            const arr = [];
            console.log(snapshot)
            snapshot.forEach(item => {
                console.log(item.val());
                arr.push(item.val().receiverId + item.val().senderId)
                console.log(item.val().receiverId)
                console.log(item.val().senderId)
            })
            console.log(arr)
            setfriendList(arr)
            console.log(friendReqList);
        });
        console.log(friendList);
    }, [])

    useEffect(() => {
        const blockRef = ref(db, 'blockList/');
        onValue(blockRef, (snapshot) => {
            const arr = [];
            console.log(snapshot)
            snapshot.forEach(item => {
                console.log(item.val());
                arr.push(item.val().receiverId + item.val().senderId)
                console.log(item.val().receiverId)
                console.log(item.val().senderId)
            })
            console.log(arr)
            setBlockList(arr)
            console.log(blockList);
        });
        console.log(blockList);
    }, [])

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
        }
    ];

    const handleFrndReq = (user) => {
        console.log(user);
        console.log(user.friendId);
        console.log(user.userId);
        set(push(ref(db, 'friendRequests/')), {
            senderId: data.uid,
            senderName: data.displayName,
            receiverId: user.userId,
            receiverName: user.username
        });


    }
    const handleCancelReq = (user, index) => {
        set(ref(db, 'frinedRequests/' + user.userId + data.uid), {
            senderId: data.uid,
            senderName: data.displayName,
            receiverId: null,
            receiverName: user.username
        });
    }


    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">User List</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div className="pr-[30px] mt-1.5 mr-0.5 h-[90%] overflow-y-auto">
                {
                    userList.map((user, index) =>
                        <Flex className={`pt-4 ${index === userList.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={user?.image} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-sm font-semibold">{user.username}</h6>
                                    <p className="font-primary text-[10px] font-medium text-[rgba(77,77,77,0.50)] mt-[3px]">{user.email}</p>
                                </div>
                            </Flex>
                            <div className="pr-[30px]">
                                { blockList.includes(data.uid + user.userId) || blockList.includes(user.userId + data.uid)
                                        ?
                                        
                                        <MovingComponent
                                            type="jelly"
                                            duration="1000ms"
                                            delay="0s"
                                            direction="normal"
                                            timing="ease"
                                            iteration="7"
                                            fillMode="none">
                                            blocked
                                        </MovingComponent>
                                        :
                                    friendList.includes(data.uid + user.userId) || friendList.includes(user.userId + data.uid)
                                        ?
                                        <MovingComponent
                                            type="bounce"
                                            duration="1000ms"
                                            delay="0s"
                                            direction="normal"
                                            timing="ease"
                                            iteration="7"
                                            fillMode="none">
                                            Friend
                                        </MovingComponent>

                                        :
                                        friendReqList.includes(data.uid + user.userId) || friendReqList.includes(user.userId + data.uid)

                                            ?
                                            <Button isDisabled={true} className='px-2 py-0.5'>-</Button>
                                            :
                                            <Button onClick={() => handleFrndReq(user)} className='px-2 py-0.5'>+</Button>
                                }
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default Users;