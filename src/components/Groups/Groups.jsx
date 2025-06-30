import { BsThreeDotsVertical } from "react-icons/bs";
import Flex from "../../Layout/Flex";
import Button from "../../Layout/Button";
import groupImage1 from '../../assets/home/group_2.png';
import groupImage2 from '../../assets/home/group_3.png';
import groupImage3 from '../../assets/home/group_4.png';
const Groups = () => {
    const groups = [
        {
            image: groupImage1,
            group_name: 'Friends Reunion',
            group_last_message: 'Hi Guys, Wassup!',
        },
        {
            image: groupImage2,
            group_name: 'Friends Forever',
            group_last_message: 'Good to see you.',
        },
        {
            image: groupImage3,
            group_name: 'Crazy Cousins',
            group_last_message: 'What plans today?',
        }
    ];
    return (
        <div className='pl-5 pr-[22px] pt-[17px] pb-[21px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-[43px] '>
            <Flex>
                <h4 className="font-primary font-semibold text-xl">Groups List</h4>
                <BsThreeDotsVertical size={19} className="" />

            </Flex>
            <div>
                {
                    groups.map((group, index) =>
                        <Flex className={`pt-4 ${index === 2 ? '' : 'border-b-2 border-black/25 pb-[13px]'}`}>
                            <Flex className='gap-3.5'>

                                <div>
                                    <img src={group.image} alt="" />
                                </div>
                                <div>
                                    <h6 className="font-primary text-lg font-semibold">{group.group_name}</h6>
                                    <p className="font-primary text-sm font-medium text-[rgba(77,77,77,0.75)]">{group.group_last_message}</p>
                                </div>
                            </Flex>
                            <div>
                                <Button className='px-[22px] py-0.5'>Join</Button>
                            </div>
                        </Flex>)
                }
            </div>
        </div>
    );
};

export default Groups;