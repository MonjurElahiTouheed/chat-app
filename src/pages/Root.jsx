import { Outlet, useNavigate } from "react-router";
import Menubar from "../components/Menubar/Menubar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PacmanLoader } from 'react-spinners';

const Root = () => {
    const auth = getAuth();
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const data = useSelector(state => state.userInfo.user);

    useEffect(() => {
        if (!data) {
            navigate('/login');
        }
    }, [])

    onAuthStateChanged(auth, (user) => {
        console.log(user)
        console.log(user.auth)
        if (user.emailVerified) {
            setVerify(true);
        }
        setLoading(false);
    });

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <PacmanLoader size={80} color='#1e1e1e' />
            </div>
        );
    }

    return (
        <>

            {
                verify ?
                    <div className="pl-8 pr-[23px pt-[26px] flex justify-between">
                        <Menubar></Menubar>
                        <Outlet></Outlet>
                    </div>
                    :
                    <div className="h-screen flex justify-center items-center">
                        <p className="text-7xl font-bold font-primary">Please verify your email first ! 😕</p>
                    </div>
            }
        </>
    );
};

export default Root;