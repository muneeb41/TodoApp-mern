import axios from 'axios';
import React, { useState  } from 'react';
import { useDispatch } from 'react-redux';
import { UserAuthAction } from '../../store/userStore/userAuth';
import { useNavigate } from 'react-router-dom';



const Signin = () => {
    const url = 'http://localhost:8000'

    const dispatch = useDispatch()
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make the API request to the backend
      const response = await axios.post(`${url}/user/signin`, formData);
  
      // Check the response data
      if (response.data.message === "User already signed in") {
        alert("User already signed in");
      } else {
        // Destructure the response data (name, email, token)
        const { name, email, token } = response.data;
  
        // Create a payload for the Redux action
        const payload = {
          name,
          email,
          token,
        };
  
        // Dispatch the signin action with the payload
        dispatch(UserAuthAction.signin(payload));
        
        navigate('/'); // or any other route you want to redirect to

        
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("Sign in failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
