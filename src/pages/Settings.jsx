import AccountSettings from "../components/AccountSettings/AccountSettings";
import ProfileSettings from "../components/ProfileSettings/ProfileSettings";
import SearchBar from "../components/SearchBar/SearchBar";

const Settings = () => {
    return (
        <div className="w-[88%] grid grid-cols-[738px_759px] grid-rows-[95px] gap-x-10 pr-[46px] pb-1.5">
            {/* <div className="pr-20"> */}
                <div className="col-span-2">
                    <SearchBar />
                </div>
                {/* <div className="mt-9"> */}
                    <ProfileSettings></ProfileSettings>
                    <AccountSettings></AccountSettings>
                {/* </div> */}
            {/* </div> */}
        </div>
    );
};

export default Settings;