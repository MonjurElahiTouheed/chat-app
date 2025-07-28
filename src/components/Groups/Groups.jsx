import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import Button from "../../Layout/Button";
import groupImage1 from '../../assets/home/group_2.png';
import groupImage2 from '../../assets/home/group_3.png';
import groupImage3 from '../../assets/home/group_4.png';
import friend5 from '../../assets/home/marvin.png';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovingComponent from 'react-moving-text';
import { IoIosCheckmark } from "react-icons/io";

const Groups = () => {
    const [isGroupCreated, setIsGroupCreated] = useState(false);
    const [joinRequest, setJoinRequest] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupTagName, setGroupTagName] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [groupRequests, setGroupRequests] = useState([]);
    // const [myGroups, setMyGroups] = useState([]);
    const data = useSelector(state => state.userInfo.user.user)
    const db = getDatabase();
    const groups = [
        {
            image: groupImage1,
            group_name: 'Friends Reunion',
            group_last_message: 'Hi Guys, Wassup!',
        },
        {
            image: groupImage1,
            group_name: 'Friends Forever',
            group_last_message: 'Good to see you.',
        },
        {
            image: groupImage1,
            group_name: 'Crazy Cousins',
            group_last_message: 'What plans today?'
        },
        {
            image: groupImage1,
            group_name: 'Crazy Cousins',
            group_last_message: 'What plans today?'
        },
        {
            image: groupImage1,
            group_name: 'Crazy Cousins',
            group_last_message: 'What plans today?'
        }
    ];
    const handleCreateGroup = () => {
        setIsGroupCreated(!isGroupCreated);
    }
    const handleCreateBtn = () => {
        set(push(ref(db, 'groupList/')), {
            groupName: groupName,
            groupTag: groupTagName,
            groupCreatorId: data.uid
        }).then(() => {
            toast.success('Group created succesfully.')
            setIsGroupCreated(false)
            // set(push(ref(db, 'myGroups/')), {
            //     groupName: groupName,
            //     groupTag: groupTagName,
            //     groupCreatorId: data.uid
            // })
        })

        // .then(() => {
        //     toast.success('Group created succesfully.')
        //     setIsGroupCreated(false)
        // })
    }

    const handleGroupName = (e) => {
        setGroupName(e.target.value);
    }
    const handleGroupTagName = (e) => {
        setGroupTagName(e.target.value);
    }

    useEffect(() => {
        const groupListRef = ref(db, 'groupList/');
        onValue(groupListRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                if (data.uid !== item.val().groupCreatorId)
                    arr.push({ ...item.val(), groupId: item.key })
            })
            setGroupList(arr);
            console.log(groupList)
        });
    }, []);
    useEffect(() => {
        const groupRequestsRef = ref(db, 'groupRequests/');
        onValue(groupRequestsRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                
                    arr.push(item.val().memberId+item.val().groupId)
                    console.log(item.val())
            })
            setGroupRequests(arr);
            console.log(groupRequests)
        });
    }, []);

    const handleJoin = (group) => {
        set(ref(db, 'groupRequests/' + data.uid+group.groupId), {
            memberId: data.uid,
            memberName: data.displayName,
            groupId: group.groupId,
            groupName: group.groupName,
            groupCreatorId: group.groupCreatorId
        }).then(() => {
            setJoinRequest(true);
            toast.success('You are added to the group')
        })
    }
    const handleCancelGroupReq = (group) => {
        remove(ref(db, 'groupRequests/' + data.uid+group.groupId))
        console.log('cancel')
    }

    // useEffect(() => {
    //     const myGroupRef = ref(db, 'myGroups/');
    //     onValue(myGroupRef, (snapshot) => {
    //         const arr = [];
    //         console.log(snapshot.val())
    //         snapshot.forEach(item => {
    //             if (data.uid !== item.val().groupCreatorId)
    //                 arr.push({ ...item.val(), userId: item.key })
    //         })
    //         setMyGroups(arr);
    //         console.log(myGroups)
    //     });
    // }, [])

    console.log(groupList)
    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[10px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-[43px]'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Groups List</h4>
                {/* <BsThreeDotsVertical size={19} className="" /> */}
                {
                    isGroupCreated ?
                        <Button onClick={() => handleCreateGroup()} className='px-5 py-2 bg-red-500 hover:bg-red-800'>
                            Back
                        </Button>
                        :
                        <Button onClick={() => handleCreateGroup()} className='px-5 py-2'>
                            Create Group
                        </Button>
                }
            </Flex>
            {
                isGroupCreated ?
                    <div className="space-y-2 pt- pb-3.5">
                        <div>
                            <label className="font-primary text-primary text-xl font-medium">Your Group Name</label>
                            <input onChange={handleGroupName} className="block py-5 pl-3 border-1 border-black/30 rounded-xl w-[75%] mt-2.5" type="text" placeholder="Write your group name" />
                        </div>
                        <div>
                            <label className="font-primary text-primary text-xl font-medium">Your Group Tag</label>
                            <input onChange={handleGroupTagName} className="block py-5 pl-3 border-1 border-black/30 rounded-xl w-[75%] mt-2.5" type="text" placeholder="Write your group tag name" />
                        </div>
                        <div className="mt-1.5">
                            <Button onClick={() => handleCreateBtn()} className='px-[22px] py-2'>Create</Button>
                        </div>
                    </div>
                    :
                    <div className="pr-[30px] mt-1.5 mr-0.5 h-[292px h-[276px] overflow-y-auto">
                        {
                            groupList.map((group, index) =>
                                <Flex className={`pt-4 ${index === groupList.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                                    <Flex className='gap-3.5'>
                                        <div>
                                            <img src={groupImage1} alt="" />
                                        </div>
                                        <div>
                                            <h6 className="font-primary text-lg font-semibold">{group.groupName}</h6>
                                            <p className="font-primary text-sm font-medium text-[rgba(77,77,77,0.75)]">{group.groupTag}</p>
                                        </div>
                                    </Flex>
                                    <div>
                                        {
                                            groupRequests.includes(data.uid + group.groupId) ?
                                                <Button onClick={() => handleCancelGroupReq(group)} className='px-5 py-2 bg-red-500 hover:bg-red-800'>
                                                    Cancel request
                                                </Button>
                                                :
                                                <Button onClick={() => handleJoin(group)} className='px-[22px] py-0.5'>Join</Button>
                                        }
                                    </div>
                                </Flex>)
                        }
                    </div>
            }
        </div>
    );
};

export default Groups;