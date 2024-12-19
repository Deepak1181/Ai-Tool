import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import React from 'react'
import { auth ,db} from "../firebase-config";
import {setDoc,doc} from "firebase/firestore";
// import { auth } from '../firebase-config';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const SignupGoogle = () => {
    const navigate = useNavigate();
    function googleLogin(){
        const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then((async(result)=>{
        const user = auth.currentUser;
        // console.log(result)
        if(result.user){
            await setDoc(doc(db, "user", user.uid), {
                email: user.email,
                firstName:user.displayName,
                lastName:"",
              });
          toast.success("Login successful!",{
              position:"top-center"
          });
            setTimeout(() => {
                navigate("/ai");
              }, 2000); 
        }
    }))
    }
  return (
    <div>
        <ToastContainer/>
          <button onClick={googleLogin}  className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Sign In with Google
          </button>
    </div>
  )
}

export default SignupGoogle