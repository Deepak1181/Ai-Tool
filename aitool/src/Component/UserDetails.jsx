// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase-config";
// import { doc, getDoc } from "firebase/firestore";

// const UserDetails = () => {
//   const [userDetails, setUserDetails] = useState(null);

//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         console.log("Authenticated User UID:", user.uid);

//         try {
//           // Fetch user document from Firestore
//           const docRef = doc(db, "user", user.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             console.log("User Data from Firestore:", docSnap.data());
//             setUserDetails(docSnap.data()); // Store user data in state
//           } else {
//             console.log("No such user document in Firestore!");
//           }
//         } catch (error) {
//           console.error("Error fetching user document:", error);
//         }
//       } else {
//         console.log("No user is logged in.");
//       }
//     });
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <div>
//       {userDetails ? (
//         <>
//           <h1>Welcome, {userDetails.firstName}!</h1>
//           <p>Your email: {userDetails.email}</p>
//         </>
//       ) : (
//         <h1>Loading user details...</h1>
//       )}
//     </div>
//   );
// };

// export default UserDetails;





// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase-config";
// import { doc, getDoc } from "firebase/firestore";

// const UserDetails = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         console.log("Authenticated User UID:", user.uid);

//         try {
//           const docRef = doc(db, "user", user.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             setUserDetails(docSnap.data());
//           } else {
//             setError("No user document found.");
//           }
//         } catch (err) {
//           setError("Failed to fetch user data.");
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setError("User not logged in.");
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <h1>Error: {error}</h1>
//       ) : loading ? (
//         <h1>Loading user details...</h1>
//       ) : userDetails ? (
//         <>
//           <h1>Welcome, {userDetails.firstName}!</h1>
//           <p>Your email: {userDetails.email}</p>
//         </>
//       ) : (
//         <h1>No user details available.</h1>
//       )}
//     </div>
//   );
// };

// export default UserDetails;



















import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Logout from "./Logout";
import { FiLogOut } from "react-icons/fi";
const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);


const fetchuserDetails=async()=>{
    auth.onAuthStateChanged(async(user)=>{
        // setUserDetails(user)
        console.log(user)
        const docRef=doc(db,"user",user.uid)
        console.log(db)
        const docSnap= await getDoc(docRef)
        console.log(docRef)
        if(docSnap.exists()){
            setUserDetails(docSnap.data())
            console.log(docSnap.data())
        }else{
            console.log("user is nott logged")
        }
    })
}
useEffect(()=>{
    fetchuserDetails()
},[])
  return (
    // <div>
    //   { userDetails ? (
    //     <>
    //       <h1>Welcome, {userDetails.displayName} {userDetails.firstName}!</h1>
    //       <img src={userDetails.photoURL} alt="" srcset="" />
    //       <p>Your email: {userDetails.email}</p>
    //     </>
    //   ) : (
    //     <h1>No user details available.</h1>
    //   )}
    //   <div>
    //   <Logout/>
    //   </div>
    // </div>
    <nav className=" bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
     {/* <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full shadow-md z-50"> */}
    <div className="text-xl font-bold">AI</div>

   
    <div className="flex items-center space-x-4">
      {userDetails ? (
        <>
        
          <div className="flex items-center space-x-2">
            {userDetails.photoURL && (
              <img
                src={userDetails.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{userDetails.firstName || userDetails.displayName}</span>
          </div>

        
          <Logout />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  </nav>
  );
};

export default UserDetails;
