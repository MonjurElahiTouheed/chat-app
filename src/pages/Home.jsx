import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Groups from "../components/Groups/Groups";
import Friends from "../components/Friends/Friends";
import Users from "../components/Users/Users";
import FriendRequest from "../components/FriendRequest/FriendRequest";
import MyGroups from "../components/MyGroups/MyGroups";
import BlockedUsers from "../components/BlockedUsers/BlockedUsers";
import SearchBar from "../components/SearchBar/SearchBar";


const Home = () => {
    return (
        // flex way below
        /*  <div className="flex justify-between w-[88%] flex-wrap gap-y-6">
             <div>
                 <div className="relative">
                     <input className="rounded-[20px] pl-[78px] w-[427px] pr-[17px] py-5 relative shadow-[0_4px_4px_rgba(0,0,0,0.25)]" placeholder="Search" />
                     <LuSearch size={19} className="absolute top-1/2 -translate-y-[50%] left-[23px]" />
                     <BsThreeDotsVertical size={19} className="absolute top-1/2 -translate-y-[50%] right-[22px]" />
                 </div>
                 <Groups></Groups>
             </div>
             <Friends></Friends>
             <MyGroups></MyGroups>
             <FriendRequest></FriendRequest>
             <Users></Users>
             <BlockedUsers></BlockedUsers>
         </div> */

        // grid way below
        <div className="w-[88%] grid grid-cols-[36%_28%_28%] grid-rows-[461px_391px] gap-x-10 gap-y-6">
            <div>
                {/* <div className="relative">
                    <input className="rounded-[20px] pl-[78px] w-[427px w-full pr-[17px] py-5 relative shadow-[0_4px_4px_rgba(0,0,0,0.25)]" placeholder="Search" />
                    <LuSearch size={19} className="absolute top-1/2 -translate-y-[50%] left-[23px]" />
                    <BsThreeDotsVertical size={19} className="absolute top-1/2 -translate-y-[50%] right-[22px]" />
                </div> */}
                <SearchBar />
                <Groups></Groups>
            </div>
            <Friends height_value='h-[90%]'></Friends>
            <Users></Users>
            <FriendRequest></FriendRequest>
            <MyGroups></MyGroups>
            <BlockedUsers></BlockedUsers>
        </div>
    );
};

export default Home;