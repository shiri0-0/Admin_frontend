'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
export default function AuthForm() {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
    newPassword: ''
  });
  const [awaitingResetOTP, setAwaitingResetOTP] = useState(false);
  const [awaitingOTP, setAwaitingOTP] = useState(false);

  const API_URL = 'http://localhost:5000/api/auth';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Redirect to main page
      setTimeout(() => {
        router.push('/main');
      }, 800);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordData.email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
      
      setMessage(data.message);
      setAwaitingResetOTP(true);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotPasswordData.email,
          otp: forgotPasswordData.otp,
          newPassword: forgotPasswordData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }
      
      setMessage(data.message + ' Redirecting to login...');
      
      setTimeout(() => {
        setIsForgotPassword(false);
        setAwaitingResetOTP(false);
        setForgotPasswordData({ email: '', otp: '', newPassword: '' });
        setMessage('');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setMessage(data.message);
      setAwaitingOTP(true);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerData.email,
          otp: registerData.otp
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }
      
      setMessage(data.message + ' Switching to login...');
      
      setTimeout(() => {
        setIsActive(false);
        setAwaitingOTP(false);
        setRegisterData({ name: '', email: '', password: '', otp: '' });
        setMessage('');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1a1c]">
      <div className={`relative w-[750px] h-[450px] border-2 border-[#ee612a] shadow-[0_0_25px_#ee612a] overflow-hidden transition-all duration-1000 ${isActive ? 'active' : ''}`}>
        
        {(message || error) && (
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg ${
            error ? 'bg-red-500/90' : 'bg-green-500/90'
          } text-white text-sm font-semibold shadow-lg max-w-[90%]`}>
            {error || message}
          </div>
        )}

        <div className={`absolute right-0 -top-[5px] h-[600px] w-[850px] bg-gradient-to-br from-[#25252b] to-[#ee612a] origin-bottom-right transition-all duration-[1500ms] ${
          isActive 
            ? 'rotate-0 skew-y-0 delay-500' 
            : 'rotate-[10deg] skew-y-[40deg] delay-[1600ms]'
        }`} />

        <div className={`absolute left-[250px] top-full h-[700px] w-[850px] bg-[#25252b] border-t-[3px] border-[#ee612a] origin-bottom-left transition-all duration-[1500ms] ${
          isActive 
            ? '-rotate-[11deg] -skew-y-[41deg] delay-[1200ms]' 
            : 'rotate-0 skew-y-0 delay-500'
        }`} />

        {!isForgotPassword && (
          <form onSubmit={handleLogin} autoComplete="off" className="absolute top-0 left-0 w-1/2 h-full flex justify-center flex-col px-10">
            <h2 className={`text-[32px] text-center text-white mb-6 transition-all duration-700 ${
              isActive 
                ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*0)]' 
                : 'translate-x-0 opacity-100 delay-[calc(0.1s*21)]'
            }`}>
              Login
            </h2>
            
            <div className="space-y-6">
              <div className={`relative w-full h-[50px] transition-all duration-700 ${
                isActive 
                  ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*1)]' 
                  : 'translate-x-0 opacity-100 delay-[calc(0.1s*22)]'
              }`}>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                  Email
                </label>
                <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">✉️</i>
              </div>

              <div className={`relative w-full h-[50px] transition-all duration-700 ${
                isActive 
                  ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*2)]' 
                  : 'translate-x-0 opacity-100 delay-[calc(0.1s*23)]'
              }`}>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                  Password
                </label>
                <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔒</i>
              </div>

              <div className={`text-sm text-right transition-all duration-700 ${
                isActive 
                  ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*3)]' 
                  : 'translate-x-0 opacity-100 delay-[calc(0.1s*24)]'
              }`}>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setError('');
                    setMessage('');
                  }}
                  className="text-[#ee612a] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className={`relative w-full transition-all duration-700 ${
                isActive 
                  ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*4)]' 
                  : 'translate-x-0 opacity-100 delay-[calc(0.1s*25)]'
              }`}>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full h-[45px] bg-transparent rounded-[40px] cursor-pointer text-base font-semibold border-2 border-[#ee612a] overflow-hidden z-10 text-white before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#ee612a] before:to-[#25252b] before:-top-full before:left-0 before:-z-10 before:transition-all before:duration-500 hover:before:top-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </div>

              <div className={`text-sm text-center mt-5 transition-all duration-700 ${
                isActive 
                  ? '-translate-x-[120%] opacity-0 delay-[calc(0.1s*5)]' 
                  : 'translate-x-0 opacity-100 delay-[calc(0.1s*26)]'
              }`}>
                <p className="text-white">
                  Don't have an account? <br />
                  <button
                    type="button"
                    onClick={() => {
                      setIsActive(true);
                      setError('');
                      setMessage('');
                    }}
                    className="text-[#ee612a] font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}

        {isForgotPassword && (
          <form onSubmit={awaitingResetOTP ? handleResetPassword : handleForgotPassword} autoComplete="off" className="absolute top-0 left-0 w-1/2 h-full flex justify-center flex-col px-10">
            <h2 className="text-[32px] text-center text-white mb-6">
              {awaitingResetOTP ? 'Reset Password' : 'Forgot Password'}
            </h2>
            
            <div className="space-y-6">
              {!awaitingResetOTP ? (
                <>
                  <div className="relative w-full h-[50px]">
                    <input
                      type="email"
                      required
                      value={forgotPasswordData.email}
                      onChange={(e) => setForgotPasswordData({...forgotPasswordData, email: e.target.value})}
                      className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                    />
                    <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                      Email
                    </label>
                    <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">✉️</i>
                  </div>

                  <div className="relative w-full">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full h-[45px] bg-transparent rounded-[40px] cursor-pointer text-base font-semibold border-2 border-[#ee612a] overflow-hidden z-10 text-white before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#ee612a] before:to-[#25252b] before:-top-full before:left-0 before:-z-10 before:transition-all before:duration-500 hover:before:top-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Loading...' : 'Send OTP'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative w-full h-[50px]">
                    <input
                      type="text"
                      required
                      value={forgotPasswordData.otp}
                      onChange={(e) => setForgotPasswordData({...forgotPasswordData, otp: e.target.value})}
                      className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                    />
                    <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                      OTP
                    </label>
                    <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔑</i>
                  </div>

                  <div className="relative w-full h-[50px]">
                    <input
                      type="password"
                      required
                      value={forgotPasswordData.newPassword}
                      onChange={(e) => setForgotPasswordData({...forgotPasswordData, newPassword: e.target.value})}
                      className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                    />
                    <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                      New Password
                    </label>
                    <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔒</i>
                  </div>

                  <div className="relative w-full">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full h-[45px] bg-transparent rounded-[40px] cursor-pointer text-base font-semibold border-2 border-[#ee612a] overflow-hidden z-10 text-white before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#ee612a] before:to-[#25252b] before:-top-full before:left-0 before:-z-10 before:transition-all before:duration-500 hover:before:top-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Loading...' : 'Reset Password'}
                    </button>
                  </div>
                </>
              )}

              <div className="text-sm text-center mt-5">
                <p className="text-white">
                  Remember your password? <br />
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setAwaitingResetOTP(false);
                      setForgotPasswordData({ email: '', otp: '', newPassword: '' });
                      setError('');
                      setMessage('');
                    }}
                    className="text-[#ee612a] font-semibold hover:underline"
                  >
                    Back to Login
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}

        <form onSubmit={awaitingOTP ? handleVerifyOTP : handleRegister} autoComplete="off" className="absolute top-0 right-0 w-1/2 h-full flex justify-center flex-col px-[60px]">
          <h2 className={`text-[32px] text-center text-white mb-6 transition-all duration-700 ease-out ${
            isActive 
              ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*17)]' 
              : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*0)]'
          }`}>
            {awaitingOTP ? 'Verify OTP' : 'Register'}
          </h2>
          
          <div className="space-y-6">
            {!awaitingOTP && (
              <>
                <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
                  isActive 
                    ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*18)]' 
                    : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*1)]'
                }`}>
                  <input
                    type="text"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                  />
                  <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                    Username
                  </label>
                  <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">👤</i>
                </div>

                <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
                  isActive 
                    ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*19)]' 
                    : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*2)]'
                }`}>
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                  />
                  <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                    Email
                  </label>
                  <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">✉️</i>
                </div>

                <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
                  isActive 
                    ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*20)]' 
                    : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*3)]'
                }`}>
                  <input
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                  />
                  <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                    Password
                  </label>
                  <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔒</i>
                </div>
              </>
            )}

            {awaitingOTP && (
              <div className={`relative w-full h-[50px] transition-all duration-700 ease-out ${
                isActive 
                  ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*19)]' 
                  : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*2)]'
              }`}>
                <input
                  type="text"
                  required
                  value={registerData.otp}
                  onChange={(e) => setRegisterData({...registerData, otp: e.target.value})}
                  className="peer w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-all duration-500 focus:border-[#ee612a]"
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#ee612a] peer-valid:-top-[5px] peer-valid:text-[#ee612a]">
                  OTP
                </label>
                <i className="absolute top-1/2 right-0 text-lg -translate-y-1/2 text-white peer-focus:text-[#ee612a] peer-valid:text-[#ee612a]">🔑</i>
              </div>
            )}

            <div className={`relative w-full transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*21)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*4)]'
            }`}>
              <button
                type="submit"
                disabled={loading}
                className="relative w-full h-[45px] bg-transparent rounded-[40px] cursor-pointer text-base font-semibold border-2 border-[#ee612a] overflow-hidden z-10 text-white before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#ee612a] before:to-[#25252b] before:-top-full before:left-0 before:-z-10 before:transition-all before:duration-500 hover:before:top-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : awaitingOTP ? 'Verify OTP' : 'Register'}
              </button>
            </div>

            <div className={`text-sm text-center mt-5 transition-all duration-700 ease-out ${
              isActive 
                ? 'translate-x-0 opacity-100 blur-0 delay-[calc(0.1s*22)]' 
                : 'translate-x-[120%] opacity-0 blur-[10px] delay-[calc(0.1s*5)]'
            }`}>
              <p className="text-white">
                I have an account.<br />
                <button
                  type="button"
                  onClick={() => {
                    setIsActive(false);
                    setAwaitingOTP(false);
                    setError('');
                    setMessage('');
                  }}
                  className="text-[#ee612a] font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </form>

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