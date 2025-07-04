import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../resuablecomp/Header';
import Footer from '../resuablecomp/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted:', { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='bg-[#1c261a]'>
        <Header />
      </div>
      <div className="min-h-screen bg-[#1c261a] flex flex-col justify-center md:pb-10 sm:px-6 lg:px-8">
        <header className="bg-[#1e2619] py-6 px-5 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white/75">Welcome Back</h1>
            <p className="mt-2 text-sm text-[#cbcdca]">
              Sign in to your Planto. account
            </p>
          </div>
        </header>

        <main className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#2c352b] border border-[#c7c9c6] rounded-[30px] py-8 px-6 shadow-md sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#cbcdca]">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#cbcdca]">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#cbcdca] hover:text-white"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4" />
                    ) : (
                      <FaEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-300 focus:ring-green-300 border-[#c7c9c6] rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#cbcdca]">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-green-300 hover:text-green-200">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#1c261a] bg-green-300 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 transition-all duration-300"
                >
                  Sign in
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#c7c9c6]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#2c352b] text-[#cbcdca]">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center py-2 px-4 border border-[#c7c9c6] rounded-md shadow-sm bg-[#2c352b] text-sm font-medium text-white hover:bg-[#1e2619] transition-all duration-300"
                    >
                      <FcGoogle className="h-5 w-5 mr-2" />
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#cbcdca]">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-green-300 hover:text-green-200">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Login;