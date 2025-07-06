import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
const SearchBar = () => {
    return (
        <div className="relative">
            <input className="rounded-[20px] pl-[78px] w-[427px w-full pr-[17px] py-5 relative shadow-[0_4px_4px_rgba(0,0,0,0.25)]" placeholder="Search" />
            <LuSearch size={19} className="absolute top-1/2 -translate-y-[50%] left-[23px]" />
            <BsThreeDotsVertical size={19} className="absolute top-1/2 -translate-y-[50%] right-[22px]" />
        </div>
    )
}

export default SearchBar
