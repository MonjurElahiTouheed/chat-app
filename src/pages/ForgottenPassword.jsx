import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router";

const ForgottenPassword = () => {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const handleEmail = e => {
        setEmail(e.target.value);
        setEmailErr('');
    }

    const handleResetPassword = () => {
        if (!email) {
            setEmailErr('bhai tui email de');
        }
        else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('আরে ভাই ইমেইল টা ঠিক কইরা লেখ')
            }
        }
        if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
            console.log('reset password');
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                    setEmail('');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });

        }
    }
        return (
            <div className="bg-radial-[at_50%_340%] from-primary to-white flex justify-center items-center h-screen">
                <div className="w-[700px] p-5 rounded-lg mx-auto bg-white">
                    <h2 className="mt-5 font-bold text-2xl font-primary text-primary">Forgotton password ?</h2>
                    <div className='relative w-[368px] mt-10'>
                        <input
                            onChange={handleEmail}
                            value={email}
                            type="email" className='py-[20px] pl-[45px] border-2 border-black/30 rounded-[8.6px] focus:outline-0 w-full'
                            placeholder='Enter your email address'
                        />
                        <p className='bg-red-500 text-white font-semibold rounded px-4 mt-1'>{emailErr}</p>
                        <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                            Email Address
                        </label>
                    </div>
                    <div className="mt-5">
                        <Link to='/login' className="font-secondary text-white p-5 bg-primary rounded-xl">
                            Back to login
                        </Link>
                        <button onClick={handleResetPassword} className="font-secondary text-white p-5 bg-primary rounded-xl ml-6">
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    export default ForgottenPassword;