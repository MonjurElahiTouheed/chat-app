import register from './assets/login-image.png';
function App() {

  return (
    <>
      <div className="flex">
            <div className="w-[60%] pt-[225px] pl-[0px]">
              <h2 className="font-secondary font-bold text-secondary text-[34px]">
                Get started with easily register
              </h2>
              <p className='font-secondary text-[20px] text-black/50 mt-[13px]'>Free register and you can enjoy it</p>
        </div>
        <div className='w-[40%]'>
            <img src={register} alt="" />
        </div>
      </div>
    </>
  )
}

export default App
