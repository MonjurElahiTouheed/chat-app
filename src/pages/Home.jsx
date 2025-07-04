import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Groups from "../components/Groups/Groups";
import Friends from "../components/Friends/Friends";
import Users from "../components/Users/Users";
import FriendRequest from "../components/FriendRequest/FriendRequest";
import MyGroups from "../components/MyGroups/MyGroups";
import BlockedUsers from "../components/BlockedUsers/BlockedUsers";

const groups = [
    {
        image: '../assets/home/group_2.png',
        group_name: 'Friends Reunion',
        group_message: 'Hi Guys, Wassup!',
    },
    {
        image: '../assets/home/group_3.png',
        group_name: 'Friends Forever',
        group_message: 'Good to see you.',
    },
    {
        image: '../assets/home/group_4.png',
        group_name: 'Crazy Cousins',
        group_message: 'What plans today?',
    }
];

const Home = () => {
    return (
        <div className="flex justify-between w-[88%] flex-wrap">
            {/* <div className="pl-8 pr-[23px] py-[35px]">
                <Menubar></Menubar>
                <Outlet></Outlet>
            </div> */}
            <div>
                <div className="relative">
                    <input className="rounded-[20px] pl-[78px] w-[427px] pr-[17px] py-5 relative shadow-[0_4px_4px_rgba(0,0,0,0.25)]" placeholder="Search" />
                    <LuSearch size={19} className="absolute top-1/2 -translate-y-[50%] left-[23px]" />
                    <BsThreeDotsVertical size={19} className="absolute top-1/2 -translate-y-[50%] right-[22px]" />
                </div>
                <Groups></Groups>
            </div>
            <Friends></Friends>
            <Users></Users>
            <FriendRequest></FriendRequest>
            <MyGroups></MyGroups>
            <BlockedUsers></BlockedUsers>
        </div>
    );
};

export default Home;