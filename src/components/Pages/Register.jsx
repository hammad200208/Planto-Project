import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../resuablecomp/Header';
import Footer from '../resuablecomp/Footer';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { name, email, password, confirmPassword } = formData;

    try {
      const response = await fetch('https://eb-project-backend-kappa.vercel.app/api/v0/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });

      const data = await response.json();
      console.log("Full response:", data); // Debugging aid

      if (response.ok) {
        // alert("User registered successfully!");
        console.log("Success:", data);
        navigate('/login');
      } else {
        alert(data.message || "Registration failed!");
        console.error("Error:", data);
      }
    } catch (error) {
      alert("Network error or server not responding.");
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <div className='bg-[#1c261a]'>
        <Header />
      </div>
      <div className="min-h-screen bg-[#1c261a] flex flex-col justify-center md:pb-10 sm:px-6 lg:px-8">
        <header className="bg-[#1e2619] py-6 px-5 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white/75">Create Account</h1>
            <p className="mt-2 text-sm text-[#cbcdca]">Join the Planto. community today</p>
          </div>
        </header>

        <main className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#2c352b] border border-[#c7c9c6] rounded-[30px] py-8 px-6 shadow-md sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                id="name"
                name="name"
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                id="email"
                name="email"
                label="Email address"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <PasswordField
                id="password"
                name="password"
                label="Password"
                show={showPassword}
                toggleShow={togglePasswordVisibility}
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                show={showConfirmPassword}
                toggleShow={toggleConfirmPasswordVisibility}
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-green-300 focus:ring-green-300 border-[#c7c9c6] rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#cbcdca]">
                  I agree to the <Link to="/terms" className="text-green-300 hover:text-green-200">Terms of Service</Link> and <Link to="/privacy" className="text-green-300 hover:text-green-200">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#1c261a] bg-green-300 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 transition-all duration-300"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#cbcdca]">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-green-300 hover:text-green-200">Sign in</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

// 🔹 Reusable InputField
const InputField = ({ id, name, label, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#cbcdca]">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300"
      />
    </div>
  </div>
);

// 🔹 Reusable PasswordField
const PasswordField = ({ id, name, label, value, onChange, show, toggleShow }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#cbcdca]">
      {label}
    </label>
    <div className="mt-1 relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        required
        value={value}
        onChange={onChange}
        className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300 pr-10"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#cbcdca] hover:text-white"
        onClick={toggleShow}
      >
        {show ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
      </button>
    </div>
  </div>
);

export default Register;
