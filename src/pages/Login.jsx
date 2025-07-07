import { useState } from 'react';
import login from '../assets/login.jpg';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import google from '../assets/google.png';
import { Link, useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import { PacmanLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slice/userSlice';

const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmail = e => {
        setEmail(e.target.value);
        setEmailErr('');
    }

    const handlePassword = e => {
        setPassword(e.target.value);
        setPasswordErr('')
    }

    const handleLogin = () => {

        // console.log(email, password);

        // console.log(email);
        // console.log(password);

        if (!email) {
            setEmailErr('bhai tui email de');
        }
        else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('Please provide correct email');
            }
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
       if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log(user);
                    dispatch(userLoginInfo(user));
                    localStorage.setItem('userLoginInfo', JSON.stringify(user));
                    console.log('login done');
                    setEmail('');
                    setPassword('');
                    toast.success('Login successfully done.');
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // const errorMessage = error.message;
                    // console.log(error)
                    console.log(errorCode)
                    // console.log(errorMessage)
                    if (errorCode.includes('auth/invalid-credential')) {
                        toast.error('please provide correct email & password')
                    }
                    setLoading(false);
                });

        }
    }

    const handleGoogleAuth = () => {
        const auth = getAuth();
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((user) => {
                console.log(user);
                console.log('google auth success')
                // ...
                setLoading(false);
                setTimeout(() => {
                    navigate('/home');
                }, 2000)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode)
                // ...
            });
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

                <div onClick={handleGoogleAuth} className='flex gap-2.5 pl-[29px] pt-6 pb-[22px] border-1 border-[rgb(3,1,76)] rounded-[9px] mt-[29px] w-[221px]'>
                    <img src={google} alt="" />
                    <p className='font-sans text-[#03014C] font-semibold text-sm'>Login with Google</p>
                </div>

                <div className="mt-[60px]">
                    <div className='relative w-[368px]'>
                        <input
                            onChange={handleEmail}
                            value={email}
                            type="email" className='py-[20px] pl-[45px] border-b-2 border-black/30 rounded-[8.6px] focus:outline-0 w-full'
                            placeholder='Enter your email address'
                        />
                        <p className='bg-red-500 text-white font-semibold rounded px-4 mt-1'>{emailErr}</p>
                        <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                            Email Address
                        </label>
                    </div>
                    <div className='relative w-[368px] mt-[60px]'>
                        <input
                            onChange={handlePassword}
                            value={password}
                            type={show ? "text" : 'password'} className='py-[20px] px-[50px] border-b-2 border-black/30 rounded-[8.6px] focus:outline-0 w-full'
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
                            <button onClick={handleLogin} className="w-full font-secondary text-white py-5 bg-primary rounded-[86px]">
                                Login to Continue
                            </button>
                    }

                    <p className="text-center text-primary text-[13px] mt-[30px] font-sans">Don't have an account ? {" "}
                        <Link to='/registration' className='text-[#EA6C00]'>Sign up</Link>
                    </p>
                    <div className="text-center mt-[18px]">

                        <Link to='/forgottenpassword' className="text-center text-[13px] text-red-400 font-sans font-bold">Forgotten password ?</Link>
                    </div>
                </div>
            </div>
            <div className='w-[40%]'>
                <img className='w-full h-screen object-cover' src={login} alt="" />
            </div>
        </div>
    );
};

export default Login;