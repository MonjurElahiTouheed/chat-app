import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';
import friend5 from '../../assets/home/marvin.png';
import Button from "../../Layout/Button";
import { getDatabase, onValue, ref } from "firebase/database";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendRequest = () => {
    const [friendReqList, setfriendReqList] = useState([]);
    const db = getDatabase();
    const data = useSelector(state => state.userInfo.user.user)
    useEffect(() => {
        const arr = [];
        const starCountRef = ref(db, 'frinedRequests/');
        onValue(starCountRef, (snapshot) => {
            console.log(snapshot)
            snapshot.forEach(item => {
                console.log(item.key, 'item_keys')
                console.log(item.val());
                if(data.uid === item.val().receiverId){
                    arr.push(item.val())
                }
            })
            setfriendReqList(arr)
        });
        console.log(friendReqList);
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
    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Friend  Request</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div className="pr-[30px] mt-1.5 mr-0.5 h-[90%] overflow-y-auto">
                { 
                    friendReqList.map((user, index) =>
                        <Flex className={`pt-4 ${index === friendReqList.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={friend3} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-lg font-semibold">{user.senderName}</h6>
                                    <p className="font-primary text-sm font-medium text-[rgba(77,77,77,0.75)]">{user?.last_message}</p>
                                </div>
                            </Flex>
                            <div>
                                <Button className='px-2 py-0.5'>Accept</Button>
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default FriendRequest;