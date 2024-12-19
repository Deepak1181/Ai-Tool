// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "../firebase-config";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent page refresh on form submission
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast.success("Login successful!");
//     } catch (error) {
//       console.error("Error:", error.message);
//       toast.error("Login failed! Please check your credentials.");
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* ToastContainer must be included to display the toast */}
//       <ToastContainer />

//       <form onSubmit={handleLogin} className="login-form">
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="form-input"
//           />
//         </div>
//         <button type="submit" className="login-button">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase-config";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import SignupGoogle from "./SignupGoogle";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        try {
          await signInWithEmailAndPassword(auth, email, password);
          toast.success("Login successful!",{
            position:"top-center"
        });
          setTimeout(() => {
            navigate("/ai");
          }, 2000); 
        } catch (error) {
          console.error("Error:", error.message);
          toast.error("Login failed! Please check your credentials.");
        }
      };
  return (
<>
<ToastContainer />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          {/* <h1 className="text-2xl font-bold">LOGO</h1> */}
        </div>
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to continue</p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-start">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-start text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-500">or</span>
        </div>
        <div className="space-y-2 mt-4">
          <SignupGoogle/>
         
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
</>
  );
};

export default Login