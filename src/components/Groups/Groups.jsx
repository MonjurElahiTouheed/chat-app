import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import Button from "../../Layout/Button";
import groupImage1 from '../../assets/home/group_2.png';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovingComponent from 'react-moving-text';
import { IoIosCheckmark } from "react-icons/io";

const Groups = () => {
    const [isGroupCreated, setIsGroupCreated] = useState(false);
    const [joinRequest, setJoinRequest] = useState(false);
    // group input field states below:
    const [groupNameInput, setGroupName] = useState('');
    const [groupNameErr, setGroupNameErr] = useState('');
    const [groupTagNameInput, setGroupTagName] = useState('');
    const [groupTagNameErr, setGroupTagNameErr] = useState('');
    // firebase database groups array states:
    const [groupList, setGroupList] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupRequests, setGroupRequests] = useState([]);
    // const [myGroups, setMyGroups] = useState([]);
    const data = useSelector(state => state.userInfo.user.user)
    const db = getDatabase();
    const handleCreateGroup = () => {
        setIsGroupCreated(!isGroupCreated);
    }

    // these handlers are for taking values from the input fields
    const handleGroupName = (e) => {
        setGroupName(e.target.value);
        setGroupNameErr('')
    }
    const handleGroupTagName = (e) => {
        setGroupTagName(e.target.value);
        setGroupTagNameErr('')
    }

    // this handler below is for creating groups.
    const handleCreateBtn = (e) => {
        if (!groupNameInput) {
            setGroupNameErr('Please provide some characters to set your group name')
        }
        if (!groupTagNameInput) {
            setGroupTagNameErr('Please provide some characters to set your group tag name')
        }
        if (groupNameInput && groupTagNameInput) {
            set(push(ref(db, 'groupList/')), {
                groupName: groupNameInput,
                groupTag: groupTagNameInput,
                groupCreatorId: data.uid
            }).then(() => {
                toast.success('Group created succesfully.')
                setIsGroupCreated(false)
            })
        }

    }

    // const handleCreateBtnEnter = e => {
    //     if (!groupNameInput) {
    //         setGroupNameErr('Please provide some characters to set your group name')
    //     }
    //     if (!groupTagNameInput) {
    //         setGroupTagNameErr('Please provide some characters to set your group tag name')
    //     }
    //     if(e.key === 'Enter'){
    //         handleCreateBtn();
    //     }
    // }

    useEffect(() => {
        const groupListRef = ref(db, 'groupList/');
        onValue(groupListRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                const groupItem = item.val();
                if (data.uid !== groupItem.groupCreatorId)
                    arr.push({ ...groupItem, groupId: item.key })
            })
            setGroupList(arr);
            console.log(groupList)
        });
    }, []);

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
    
    useEffect(() => {
        const groupRequestsRef = ref(db, 'groupRequests/');
        onValue(groupRequestsRef, (snapshot) => {
            const arr = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                arr.push(item.val().memberId + item.val().groupId)
                console.log(item.val())
            })
            setGroupRequests(arr);
            console.log(groupRequests)
        });
    }, []);

    const handleJoin = (group) => {
        set(push(ref(db, 'groupRequests/')), {
            memberId: data.uid,
            memberName: data.displayName,
            groupId: group.groupId,
            groupName: group.groupName,
            groupRequestReceiverId: group.groupCreatorId
        }).then(() => {
            setJoinRequest(true);
            toast.success('You succesfully sent the join request to the group✔');
        })
    }

    const handleCancelGroupReq = () => {
        remove(ref(db, 'groupRequests/'))
        console.log('cancel')
    }

    console.log(groupList)
    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[10px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
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
                            <p className="mt-3 text-red-500 font-semibold font-primary">{groupNameErr}</p>
                        </div>
                        <div>
                            <label className="font-primary text-primary text-xl font-medium">Your Group Tag</label>
                            <input onChange={handleGroupTagName} className="block py-5 pl-3 border-1 border-black/30 rounded-xl w-[75%] mt-2.5" type="text" placeholder="Write your group tag name" />
                            <p className="mt-3 text-red-500 font-semibold font-primary">{groupTagNameErr}</p>
                        </div>
                        <div className="mt-1.5">
                            <Button onClick={() => handleCreateBtn()} className='px-[22px] py-2'>Create</Button>
                        </div>
                    </div>
                    :
                    <div className="pr-[30px] mt-1.5 mr-0.5 h-[292px] overflow-y-auto">
                        {
                        groupList
                        .filter(group => !groupMembers.includes(group.groupId))
                                .map((group, index) =>
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