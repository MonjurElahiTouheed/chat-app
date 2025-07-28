import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';
import friend5 from '../../assets/home/marvin.png';
import groupImg from '../../assets/home/group_2.png';
import Button from "../../Layout/Button";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const MyGroups = () => {
    const [myGroups, setMyGroups] = useState([]);
    const data = useSelector(state => state.userInfo.user.user)
    const [groupRequestBtn, setgroupRequestBtn] = useState(false);
    const [groupRequests, setgroupRequests] = useState([]);
    const db = getDatabase();
    const handlegroupRequest = () => {
        setgroupRequestBtn(!groupRequestBtn);
    }
    useEffect(() => {
        const groupListRef = ref(db, 'groupList/');
        onValue(groupListRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                if (data.uid === item.val().groupCreatorId) {
                    arr.push({ ...item.val(), groupId: item.key })
                }
            })
            setMyGroups(arr);
            console.log(myGroups)
        });
    }, [])
    useEffect(() => {
        const groupRequestsRef = ref(db, 'groupRequests/');
        onValue(groupRequestsRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                if ( data.uid === item.val().groupCreatorId) {
                    arr.push({ ...item.val(), requestId: item.key })
                }
            })
            setgroupRequests(arr);
            console.log(groupRequests)
        });
    }, [])

    const handleLeave = (group) => {
        remove(ref(db, 'groupList/' + group.groupId))
            .then(() => {
                toast.error('You left the group 😭');
            })
    }
    const handleReject = (request) => {
        remove(ref(db, 'groupRequests/' + request.requestId))
            .then(() => {
                toast.error('Rejected 😈');
            })
    }

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
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-[45px w-[80%'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">My Groups</h4>
                {/* <BsThreeDotsVertical size={19} className="" /> */}
                {
                    groupRequestBtn ?
                        <Button onClick={handlegroupRequest} className='px-5 py-2 bg-red-500 hover:bg-red-800'>
                            Back
                        </Button>
                        :
                        <Button onClick={handlegroupRequest} className='px-5 py-2'>
                            Group Requests
                        </Button>
                }
            </Flex>
            {
                groupRequestBtn ?
                    <div className="pr-[10px] mt-1.5 mr-0.5 h-[90%] overflow-y-auto">
                        {
                            groupRequests.map((request, index) =>
                                <Flex className={`pt-4 ${index === myGroups.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                                    <Flex className='gap-[11px]'>
                                        <div>
                                            <img src={friend3} alt="" />
                                        </div>
                                        <div>
                                            <h6 className="font-primary text-sm font-semibold">{request.memberName}</h6>
                                            <p className="font-primary text-xs font-medium text-[rgba(77,77,77,0.75)]">{request.groupName}</p>
                                        </div>
                                    </Flex>
                                    <Button onClick={() => handleReject(request)} className="px-[22px] py-0.5 bg-red-500 hover:bg-red-700 active:bg-red-800">Reject</Button>
                                </Flex>)
                        }
                    </div>
                    :
                    <div className="pr-[10px] mt-1.5 mr-0.5 h-[90%] overflow-y-auto">
                        {
                            myGroups.map((group, index) =>
                                <Flex className={`pt-4 ${index === myGroups.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                                    <Flex className='gap-[11px]'>
                                        <div>
                                            <img src={groupImg} alt="" />
                                        </div>
                                        <div>
                                            <h6 className="font-primary text-sm font-semibold">{group.groupName}</h6>
                                            <p className="font-primary text-xs font-medium text-[rgba(77,77,77,0.75)]">{group.groupTag}</p>
                                        </div>
                                    </Flex>
                                    <Button onClick={() => handleLeave(group)} className="px-[22px] py-0.5 bg-red-500 hover:bg-red-700 active:bg-red-800">Leave</Button>
                                </Flex>)
                        }
                    </div>
            }
        </div>
    );
};

export default MyGroups;