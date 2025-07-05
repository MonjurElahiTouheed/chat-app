import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import friend1 from '../../assets/home/raghav.png'
import friend2 from '../../assets/home/swathi.png';
import friend3 from '../../assets/home/kiren.png';
import friend4 from '../../assets/home/tajeshwani.png';
import friend5 from '../../assets/home/marvin.png';
import Button from "../../Layout/Button";

const BlockedUsers = () => {
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
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Blocked Users</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div className="pr-[30px] mt-1.5 mr-0.5 h-[90%] overflow-y-auto">
                {
                    users.map((user, index) =>
                        <Flex className={`pt-4 ${index === users.length - 1 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-[11px]'>
                                <div>
                                    <img src={user.image} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-sm font-semibold">{user.user_name}</h6>
                                    <p className="font-primary text-[10px] font-medium text-[rgba(77,77,77,0.50)] mt-0.5">{user.last_replay_time}</p>
                                </div>
                            </Flex>
                            <div>
                                <Button className='px-2 py-0.5'>unblock</Button>
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default BlockedUsers;