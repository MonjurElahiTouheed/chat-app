import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';

const Friends = () => {
    const users = [
        {
            image: friend1,
            user_name: 'Raghav',
            last_message: 'Dinner?',
            last_replay_time: 'Today, 8:56pm'
        },
        {
            image: friend2,
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
            image: friend4,
            user_name: 'Tejeshwini C',
            last_message: 'I will call him today.',
            last_replay_time: 'Today, 12:22pm'
        }
    ];
    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]  w-[30%]'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Friends</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div>
                {
                    users.map((user, index) =>
                        <Flex className={`pt-4 ${index === users.length-1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={user.image} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-lg font-semibold">{user.user_name}</h6>
                                    <p className="font-primary text-sm font-medium text-[rgba(77,77,77,0.75)]">{user.last_message}</p>
                                </div>
                            </Flex>
                            <p className="font-primary text-[10px] font-medium text-[rgba(77,77,77,0.50)]">{user.last_replay_time}</p>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default Friends;