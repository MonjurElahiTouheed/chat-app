import { useState } from 'react';
import registration from '../assets/registration.png';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import { PacmanLoader } from 'react-spinners';
import { getDatabase, ref, set } from "firebase/database";


const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [fullNameErr, setFullNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmail = e => {
        setEmail(e.target.value);
        setEmailErr('');
    }
    const handleFullName = e => {
        setFullName(e.target.value);
        setFullNameErr('');
    }

    const handlePassword = e => {
        setPassword(e.target.value);
        setPasswordErr('')
    }

    const handleRegistration = () => {

        console.log(email, fullName, password);

        // console.log(email);
        // console.log(fullName);
        // console.log(password);

        if (!email) {
            setEmailErr('bhai tui email de');
        }
        else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('আরে ভাই ইমেইল টা ঠিক কইরা লেখ')
            }
        }
        if (!fullName) {
            setFullNameErr('bhai tui fullName de');
        }
        if (!password) {
            setPasswordErr('bhai tui password de')
        }
        /* else if(!/(?=.*[a-z])/.test(password)){
          setPasswordErr('Enter at least one small character')
        }
        else if(!/(?=.*[A-Z])/.test(password)){
          setPasswordErr('Enter at least one big character')
        }
        else if(!/(?=.*[0-9])/.test(password)){
          setPasswordErr('Enter at least one number')
        }
        else if(!/(?=.*[!@#$%^&*])/.test(password)){
          setPasswordErr('Enter at least one special character')
        }
        else if(!/(?=.{8,})/.test(password)){
          setPasswordErr('Your password must be eight characters long')
        } */
        if (email && fullName && password &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
            /* console.log('Registration done');
            setEmail('');
            setFullName('');
            setPassword(''); */
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    updateProfile(auth.currentUser, {
                        displayName: fullName
                    }).then(() => {
                        sendEmailVerification(auth.currentUser);
                        console.log('user', user.user.displayName);
                        console.log('user', user);
                        toast.success('Registration successfully done, Please verify your email');

                        setLoading(false);
                        set(ref(db, 'users/' + user.user.uid), {
                            username: user.user.displayName,
                            email: user.user.email
                        });
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000)
                        setEmail('');
                        setFullName('');
                        setPassword('');
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });

                })
                .catch((error) => {
                    console.log(error);
                    const err = error.message;
                    if (err.includes('auth/email-already-in-use')) {
                        setEmailErr('This Email already in exists');
                    }
                    if (err.includes('auth/weak-password')) {
                        setPasswordErr('Password should be at least 6 characters');
                    }
                    setLoading(false);
                })
        }
    }
    return (
        <div className="flex">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="w-[60%] pt-[225px] pl-[190px]">
                <h2 className="font-secondary font-bold text-secondary text-[34px]">
                    Get started with easily register
                </h2>
                <p className='font-secondary text-[20px] text-black/50 mt-[13px]'>Free register and you can enjoy it</p>

                <div className="mt-[60px]">
                    <div className='relative  w-[368px]'>
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
                    <div className='relative my-[30px] w-[368px]'>
                        <input
                            onChange={handleFullName}
                            value={fullName}
                            type="text" className='py-[20px] pl-[45px] border-2 border-black/30 rounded-[8.6px] focus:outline-0 w-full'
                            placeholder='Enter your Full Name'
                        />
                        <p className='bg-red-500 text-white font-semibold rounded px-4 mt-1'>{fullNameErr}</p>
                        <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                            Full name
                        </label>
                    </div>
                    <div className='relative w-[368px]'>
                        <input
                            onChange={handlePassword}
                            value={password}
                            type={show ? "text" : 'password'} className='py-[20px] px-[50px] border-2 border-black/30 rounded-[8.6px] focus:outline-0 w-full'
                            placeholder='Password'
                        />
                        {
                            show ? <FaEye size={18} onClick={() => setShow(!show)} className='absolute top-5.5 right-6 cursor-pointer' /> :
                                <FaEyeSlash size={18} onClick={() => setShow(!show)} className='absolute top-5.5 right-6 cursor-pointer' />
                        }

                        <p className='bg-red-500 text-white font-semibold rounded px-4 mt-1'>{passwordErr}</p>
                        <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                            Password
                        </label>
                    </div>
                </div>
                <div className='w-[368px] mt-[30px]'>
                    {
                        loading
                            ?
                            <div className="flex justify-center">
                                <PacmanLoader color='#1e1e1e' />
                            </div>
                            :
                            <button onClick={handleRegistration} className="w-full font-secondary text-white py-5 bg-primary rounded-[86px]">
                                Sign Up
                            </button>
                    }
                    {/* <button onClick={handleRegistration} className="w-full font-secondary text-white py-5 bg-primary rounded-[86px]">
                        Sign Up
                    </button> */}

                    <p className="text-center text-primary text-[13px] mt-[30px]">Already have an account ? {" "}
                        <Link to='/login' className='text-[#EA6C00]'>Sign In</Link>
                    </p>
                </div>
            </div>
            <div className='w-[40%]'>
                <img className='w-full h-screen object-cover' src={registration} alt="" />
            </div>
        </div>
    );
};

export default Registration;