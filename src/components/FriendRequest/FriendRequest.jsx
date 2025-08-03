import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend3 from '../../assets/home/kiren.png';
import Button from "../../Layout/Button";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const FriendRequest = () => {
    const [friendReqList, setfriendReqList] = useState([]);
    const db = getDatabase();
    const data = useSelector(state => state.userInfo.user.user)

    useEffect(() => {
        const starCountRef = ref(db, 'friendRequests/');
        onValue(starCountRef, (snapshot) => {
            const arr = [];
            console.log(snapshot)
            snapshot.forEach(item => {
                console.log(item.key, 'item_keys')
                console.log(data.uid, 'current-id')
                console.log(item.key);
                console.log(item.val());
                if (data.uid === item.val().receiverId) {
                    arr.push({ ...item.val(), userId: item.key })
                }
            })
            setfriendReqList(arr)
        });
        console.log(friendReqList);
    }, [])

    const handleAcceptFriendReq = (user) => {
        console.log(user)
        set(push(ref(db, 'friends/')), {
            ...user
        }).then(() => {

            remove(ref(db, `friendRequests/` + user.userId))
                .then(() => {
                    console.log(friendReqList)
                    toast.success(`ওই, ${user.senderName} এখন তোমার দোস্ত 😐`);
                })
        })
            ;
        console.log(user.receiverId)
        console.log(friendReqList)
    }

    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px'>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Friend  Request</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div className="pr-[30px] mt-1.5 mr-0.5 h-[292px] overflow-y-auto">
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
                                <Button onClick={() => handleAcceptFriendReq(user)} className='px-2 py-0.5'>Accept</Button>
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default FriendRequest;