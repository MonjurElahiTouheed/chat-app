import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend3 from '../../assets/home/kiren.png';
import groupImg from '../../assets/home/group_2.png';
import Button from "../../Layout/Button";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const MyGroups = () => {
    const [myGroups, setMyGroups] = useState([]);
    const data = useSelector(state => state.userInfo.user.user);
    const [groupRequestBtn, setgroupRequestBtn] = useState(false);
    const [groupRequests, setgroupRequests] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
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
                const groupItem = item.val();
                    arr.push({ ...groupItem, myGroupId: item.key })
                // }
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
                const groupRequest = item.val()
                const currentUser = data.uid;
                if (currentUser === groupRequest.groupRequestReceiverId) {
                    arr.push({ ...groupRequest, requestId: item.key })
                }
            })
            setgroupRequests(arr);
            console.log(groupRequests)
        });
    }, [])

    useEffect(() => {
        const groupListRef = ref(db, 'groupMembers/');
        onValue(groupListRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                const groupMemberItem = item.val();
                if(groupMemberItem.memberId === data.uid)
                arr.push(groupMemberItem.groupId)
            })
            setGroupMembers(arr);
            console.log(groupMembers)
            console.log(groupMembers)
        });
    }, []);

    const handleLeave = (group) => {
        remove(ref(db, 'groupList/' + group.groupId))
            .then(() => {
                toast.error('You left the group 😭');
            })
    }

    const handleAccept = (request) => {
        set(push(ref(db, 'groupMembers/')), {
            ...request
        })
            .then(() => {
                remove(ref(db, 'groupRequests/' + request.requestId))
                    .then(() => {
                        toast.error('Accepted 🤩');
                    })
            })
    }
    
    const handleReject = (request) => {
        remove(ref(db, 'groupRequests/' + request.requestId))
            .then(() => {
                toast.error('Rejected 😈');
            })
    }

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
                    <div className="pr-[10px] mt-1.5 mr-0.5 ">
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
                                    <Button onClick={() => handleAccept(request)} className="px-[22px] py-0.5 bg-red-500 hover:bg-red-700 active:bg-red-800">Accept</Button>
                                    <Button onClick={() => handleReject(request)} className="px-[22px] py-0.5 bg-red-500 hover:bg-red-700 active:bg-red-800">Reject</Button>
                                </Flex>)
                        }
                    </div>
                    :
                    <div className="pr-[10px] mt-1.5 mr-0.5 h-[292px] overflow-y-auto">
                        {
                            myGroups
                            .filter(myGroup => myGroup.groupCreatorId === data.uid || groupMembers.includes(myGroup.myGroupId))
                            .map((group, index) =>
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