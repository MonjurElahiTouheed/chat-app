import { useState } from 'react';
import registration from './assets/login-image.png';
function App() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = e => {
    setEmail(e.target.value);
  }
  const handleFullName = e => {
    setFullName(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const handleRegistration = () => {
    console.log(email, fullName, password);

    if(!email) {
      console.log('bhai tui email de');
    }
    if(!fullName) {
      console.log('bhai tui fullName de');
    }
    if(!password){
      console.log('bhai tui password de')
    }
  }
  return (
    <>
      <div className="flex">
        <div className="w-[60%] pt-[225px] pl-[190px]">
          <h2 className="font-secondary font-bold text-secondary text-[34px]">
            Get started with easily register
          </h2>
          <p className='font-secondary text-[20px] text-black/50 mt-[13px]'>Free register and you can enjoy it</p>

          <div className="mt-[60px]">
            <div className='relative'>
              <input onChange={handleEmail} type="text" className='py-[26px] pl-[45px] border-2 border-black/30 rounded-[8.6px] focus:outline-0 w-[368px]' 
              placeholder='Enter your email address'
              />
              <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                Email Address
              </label>
            </div>
            <div className='relative my-[30px]'>
              <input onChange={handleFullName} type="text" className='py-[26px] pl-[45px] border-2 border-black/30 rounded-[8.6px] focus:outline-0 w-[368px]' 
              placeholder='Enter your Full Name'
              />
              <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                Full name
              </label>
            </div>
            <div className='relative'>
              <input onChange={handlePassword} type="text" className='py-[26px] pl-[45px] border-2 border-black/30 rounded-[8.6px] focus:outline-0 w-[368px]'
              placeholder='Password'
              />
              <label className='absolute top-[-12px] left-[34px] bg-white px-[12px] font-secondary font-semibold text-secondary tracking-[4px]'>
                Password
              </label>
            </div>
          </div>
        <div className='w-[368px] mt-[30px]'>
            <button onClick={handleRegistration} className="w-full font-secondary text-white py-5 bg-primary rounded-[86px]">
              Sign Up
            </button>
            <div className="text-center text-primary text-[13px] ">Already have an account ? Sign In</div>
        </div>
        </div>
        <div className='w-[40%]'>
          <img className='w-full h-screen object-cover' src={registration} alt="" />
        </div>
      </div>
    </>
  )
}

export default App
