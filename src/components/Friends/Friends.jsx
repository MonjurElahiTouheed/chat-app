import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';
import friend5 from '../../assets/home/marvin.png';
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Friends = ({className, height_value}) => {
    const db = getDatabase();
    const data = useSelector(state => state.userInfo.user.user);
    const [friendList, setFriendList] = useState([]);
    useEffect(() => {
        const arr = [];
        const starCountRef = ref(db, 'friends/');
                onValue(starCountRef, (snapshot) => {
                    console.log(snapshot.val())
                    snapshot.forEach(item => {
                        if(data.uid !== item.key){
                            arr.push(item.val())
                        }
                    })
                    setFriendList(arr);
                    console.log(friendList)
                });
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
    return (
        <div className={`pl-5 pr-[22px] pt-[17px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className}`}>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Friends</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div className={`pr-[10px] mt-1.5 mr-0.5 overflow-y-auto ${height_value}`}>
                {
                    friendList.map((user, index) =>
                        <Flex className={`pt-4 ${index === friendList.length-1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={friend1} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-sm font-semibold">{user.friendName}</h6>
                                    <p className="font-primary text-xs font-medium text-[rgba(77,77,77,0.75)]">{user?.last_message}</p>
                                </div>
                            </Flex>
                            <p className="font-primary text-[10px] font-medium text-[rgba(77,77,77,0.50)]">{user?.last_replay_time}</p>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default Friends;