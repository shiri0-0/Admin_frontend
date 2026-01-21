'use client';

import { useState } from 'react';

export default function AuthForm() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1a1c]">
      <div className={`relative w-[750px] h-[450px] border-2 border-[#ee612a] shadow-[0_0_25px_#ee612a] overflow-hidden transition-all duration-1000 ${isActive ? 'active' : ''}`}>
        
        {/* Curved Shape 1 */}
        <div className={`absolute right-0 -top-[5px] h-[600px] w-[850px] bg-gradient-to-br from-[#25252b] to-[#ee612a] origin-bottom-right transition-all duration-[1500ms] ${
          isActive 
            ? 'rotate-0 skew-y-0 delay-500' 
            : 'rotate-[10deg] skew-y-[40deg] delay-[1600ms]'
        }`} />

        {/* Curved Shape 2 */}
        <div className={`absolute left-[250px] top-full h-[700px] w-[850px] bg-[#25252b] border-t-[3px] border-[#ee612a] origin-bottom-left transition-all duration-[1500ms] ${
          isActive 
            ? '-rotate-[11deg] -skew-y-[41deg] delay-[1200ms]' 
            : 'rotate-0 skew-y-0 delay-500'
        }`} />

        {/* Login Form */}
        <div className="absolute top-0 left-0 w-1/2 h-full flex justify-center flex-col px-10">
          <h2 className={`text-[32px] text-center text-white mb-6 transition-all duration-700 ${
            isActive 
              ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*0)]' 
              : 'translate-x-0 opacity-100 delay-[calc(0.1s*21)]'
          }`}>
            Login
          </h2>
          
          <form action="#" className="space-y-6">
            {/* Username Input */}
            <div className={`relative w-full h-[50px] transition-all duration-700 ${
              isActive 
                ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*1)]' 
                : 'translate-x-0 opacity-100 delay-[calc(0.1s*22)]'
            }`}>
              <input
                type="text"
                required
                className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                Username
              </label>
              <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">👤</i>
            </div>

            {/* Password Input */}
            <div className={`relative w-full h-[50px] transition-all duration-700 ${
              isActive 
                ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*2)]' 
                : 'translate-x-0 opacity-100 delay-[calc(0.1s*23)]'
            }`}>
              <input
                type="password"
                required
                className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                Password
              </label>
              <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔒</i>
            </div>

            {/* Login Button */}
            <div className={`relative w-full transition-all duration-700 ${
              isActive 
                ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*3)]' 
                : 'translate-x-0 opacity-100 delay-[calc(0.1s*24)]'
            }`}>
              <button
                type="submit"
                className="relative w-full h-[45px] bg-transparent rounded-[40px] cursor-pointer text-base font-semibold border-2 border-[#ee612a] overflow-hidden z-10 text-white before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#ee612a] before:to-[#25252b] before:-top-full before:left-0 before:-z-10 before:transition-all before:duration-500 hover:before:top-0"
              >
                Login
              </button>
            </div>

            {/* Register Link */}
            <div className={`text-sm text-center mt-5 transition-all duration-700 ${
              isActive 
                ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*4)]' 
                : 'translate-x-0 opacity-100 delay-[calc(0.1s*25)]'
            }`}>
              <p className="text-white">
                Don't have an account? <br />
                <button
                  type="button"
                  onClick={() => setIsActive(true)}
                  className="text-[#ee612a] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Login Info Content */}
        <div className="absolute top-0 right-0 h-full w-1/2 flex justify-center flex-col text-right px-10 pb-[60px] pl-[150px]">
          <h2 className={`uppercase text-[36px] leading-[1.3] text-white transition-all duration-700 ${
            isActive 
              ? 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*0)]' 
              : 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*20)]'
          }`}>
            WELCOME BACK!
          </h2>
          <p className={`text-base text-white mt-4 transition-all duration-700 ${
            isActive 
              ? 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*1)]' 
              : 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*21)]'
          }`}>
            We are happy to have you with us again. If you need anything, we are here to help.
          </p>
        </div>

        {/* Register Form */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex justify-center flex-col px-[60px]">
          <h2 className={`text-[32px] text-center text-white mb-6 transition-all duration-700 ease-out ${
            isActive 
              ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*17)]' 
              : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*0)]'
          }`}>
            Register
          </h2>
          
          <form action="#" className="space-y-6">
            {/* Username Input */}
            <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*18)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*1)]'
            }`}>
              <input
                type="text"
                required
                className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                Username
              </label>
              <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">👤</i>
            </div>

            {/* Email Input */}
            <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*19)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*2)]'
            }`}>
              <input
                type="email"
                required
                className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                Email
              </label>
              <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">✉️</i>
            </div>

            {/* Password Input */}
            <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*20)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*3)]'
            }`}>
              <input
                type="password"
                required
                className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                Password
              </label>
              <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔒</i>
            </div>

            {/* Register Button */}
            <div className={`relative w-full transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*21)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*4)]'
            }`}>
              <button
                type="submit"
                className="relative w-full h-[45px] bg-transparent rounded-[40px] cursor-pointer text-base font-semibold border-2 border-[#ee612a] overflow-hidden z-10 text-white before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#ee612a] before:to-[#25252b] before:-top-full before:left-0 before:-z-10 before:transition-all before:duration-500 hover:before:top-0"
              >
                Register
              </button>
            </div>

            {/* Login Link */}
            <div className={`text-sm text-center mt-5 transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*22)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*5)]'
            }`}>
              <p className="text-white">
                I have an account.<br />
                <button
                  type="button"
                  onClick={() => setIsActive(false)}
                  className="text-[#ee612a] font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Register Info Content */}
        <div className="absolute top-0 left-0 h-full w-1/2 flex justify-center flex-col text-left pr-[150px] pb-[60px] pl-10 pointer-events-none">
          <h2 className={`uppercase text-[36px] leading-[1.3] text-white transition-all duration-700 ease-out ${
            isActive 
              ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*17)]' 
              : '-translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*0)]'
          }`}>
            WELCOME!
          </h2>
          <p className={`text-base text-white mt-4 transition-all duration-700 ease-out ${
            isActive 
              ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*18)]' 
              : '-translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*1)]'
          }`}>
            We're delighted to have you here. If you need any assistance, feel free to reach out.
          </p>
        </div>
      </div>
    </div>
  );
}