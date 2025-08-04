import Chatbox from "../components/Chatbox/Chatbox";
import Friends from "../components/Friends/Friends";
import SearchBar from "../components/SearchBar/SearchBar";

const Chat = () => {
    return (
        <div className="grid grid-cols-[30%_61%] gap-16 w-[88%]">
            <div>
                <SearchBar />
                <Friends className='mt-[43px] pb-[10px]' height_value='h-[462px]' />
            </div>
            <Chatbox></Chatbox>
        </div>
    );
};

export default Chat;