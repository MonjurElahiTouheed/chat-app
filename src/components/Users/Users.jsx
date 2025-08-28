import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend3 from '../../assets/home/kiren.png'
import Button from "../../Layout/Button";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovingComponent from 'react-moving-text'
import SearchBar from "../SearchBar/SearchBar";
import { LuSearch } from "react-icons/lu";

const Users = () => {

    const db = getDatabase();
    const [userList, setUserList] = useState([]);
    const [friendReqList, setfriendReqList] = useState([]);
    const [friendList, setfriendList] = useState([]);
    const [blockList, setBlockList] = useState([]);
    const [filterUser, setFilterUser] = useState([]);

    const data = useSelector(state => state.userInfo.user.user)
    const handleSearch = e => {
        let arr = [];
        if(e.target.value.length == 0){
            setFilterUser([]);
        }
        else {
            userList.filter(item => {
                if (item.username.toLowerCase().includes(e.target.value.toLowerCase())){
                    arr.push(item);
                    setFilterUser(arr);
                }
            })
        }
    }

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            const arr = [];
            snapshot.forEach(item => {
                if (data.uid !== item.key) {
                    arr.push({ ...item.val(), userId: item.key });
                }
            })
            setUserList(arr);
        });
    }, [])

    useEffect(() => {
        const friendReqRef = ref(db, 'friendRequests/');
        onValue(friendReqRef, (snapshot) => {
            const arr = [];
            snapshot.forEach(item => {
                arr.push(item.val().receiverId + item.val().senderId);
            })
            setfriendReqList(arr)
        });
    }, [])

    useEffect(() => {
        const friendRef = ref(db, 'friends/');
        onValue(friendRef, (snapshot) => {
            const arr = [];
            snapshot.forEach(item => {
                arr.push(item.val().receiverId + item.val().senderId);
            })
            setfriendList(arr);
        });
    }, [])

    useEffect(() => {
        const blockRef = ref(db, 'blockList/');
        onValue(blockRef, (snapshot) => {
            const arr = [];
            snapshot.forEach(item => {
                arr.push(item.val().blockById + item.val().blockId);
            })
            setBlockList(arr);
        });
    }, [])

console.log(blockList);
    const handleFrndReq = (user) => {
        set(push(ref(db, 'friendRequests/')), {
            senderId: data.uid,
            senderName: data.displayName,
            receiverId: user.userId,
            receiverName: user.username
        });
    }
    // to be coded...
    // const handleCancelReq = (user, index) => {
    //     set(ref(db, 'frinedRequests/' + user.userId + data.uid), {
    //         senderId: data.uid,
    //         senderName: data.displayName,
    //         receiverId: null,
    //         receiverName: user.username
    //     });
    // }


    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">User List</h4>
                <BsThreeDotsVertical size={19}/>

            </Flex>
            <div className="relative mt-3">
                <input type="text" className="rounded-[20px] pl-[58px] w-full pr-[17px] py-5 relative shadow-[0_4px_4px_rgba(0,0,0,0.25)] outline-none" placeholder="Search" onChange={handleSearch}/>
                <LuSearch size={19} className="absolute top-1/2 -translate-y-[50%] left-[23px]" />
            </div>
            {/* <SearchBar className="mt-2" onChange={handleSearch}/> */}
            <div className="pr-[30px] mt-1.5 mr-0.5 h-[292px] overflow-y-auto">
                {
                    filterUser.length > 0
                    ?
                    filterUser.map((user, index) =>
                        <Flex className={`pt-4 ${index === userList.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={friend3} alt="" />
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
                    :

                    userList.map((user, index) =>
                        <Flex className={`pt-4 ${index === userList.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={friend3} alt="" />
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