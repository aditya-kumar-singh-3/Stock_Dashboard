import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className='fixed top-0 left-0 right-0 bg-blue-950 font- text-white flex h-20 items-center justify-center md:gap-14 gap-5  md:text-xl text-lg font-bold z-50'>
        <div className='hover:underline cursor-pointer'>Home</div>
        <div className='hover:underline cursor-pointer'>About</div>
        <div className='hover:underline cursor-pointer'>Dashboard</div>
        <div className='hover:underline cursor-pointer'>Account</div>
      </div>
    </>
  );
}

export default Navbar;
