

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth ,db} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import {setDoc,doc} from "firebase/firestore";
// import {toast } from 'react-toastify';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignupGoogle from "./SignupGoogle";
export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      // if (user) {
      //   console.log("Authenticated user:", user.uid);
      // } else {
      //   console.error("User is not authenticated.");
      // }
      
      // console.log("User Registered:", user);
      // console.log(user.uid, "uid")
      await setDoc(doc(db, "user", user.uid), {
        email: user.email,
        firstName,
        lastName,
      });
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 500); 
      // console.log("First Name:", firstName);
      // console.log("Last Name:", lastName);
    } catch (error) {
      console.error("Error during sign up:", error.message);
      toast.error("Error during sign up: " + error.message);
    }
  };

  return (
    <>
   <ToastContainer/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h1 className="">AI Tool</h1>
          <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900 ">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:mx-auto sm:w-full sm:max-w-sm text-left">
          <form onSubmit={signup} className="space-y-6">
            <div className="text-left">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 py-1.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          {/* <div className="text-right text-green-500 font-medium cursor-pointer"   onClick={() => navigate('/login')}>Go to login</div> */}
          
        <SignupGoogle/>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already account? <a href="/login" className="text-blue-500 hover:underline"> Go to login</a>
        </p>
        </div>
      </div>
    </>
  );
}











// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";
// import { auth, db } from "../firebase-config";
// import { useNavigate } from "react-router-dom";
// import { setDoc, doc } from "firebase/firestore";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function SignupForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const signup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user details in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         firstName,
//         lastName,
//       });

//       toast.success("Registration successful!");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during sign up:", error.message);
//       toast.error("Error during sign up: " + error.message);
//     }
//   };

//   return (
//     <>
//       {/* Toast Container for Notifications */}
//       <ToastContainer />

//       <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <h1 className="">AI Tool</h1>
//           <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
//             Sign up for an account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-left">
//           <form onSubmit={signup} className="space-y-6">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
//                 First Name
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
//                 Last Name
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//                 Email Address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                 Password
//               </label>
//               <div className="mt-2 relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 px-3 py-1.5 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//           <div
//             className="text-right text-green-500 font-medium cursor-pointer"
//             onClick={() => navigate('/login')}
//           >
//             Go to login
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
