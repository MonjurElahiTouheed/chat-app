import Friends from "../components/Friends/Friends";
import SearchBar from "../components/SearchBar/SearchBar";

const Chat = () => {
    return (
        <div className="grid grid-cols-2 w-[88%]">
            <div>
                <SearchBar />
                <Friends  className='mt-[43px] pb-[10px]' height_value='h-[462px]'/>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Chat;