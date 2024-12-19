import React from 'react'
import { auth } from '../firebase-config';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = '/login'; // Redirect to login page
            console.log('User logged out successfully');
        } catch (error) {
            console.log('Error logging out:', error.message);
        }
    }
  return (
    <div>
     <button
             onClick={handleLogout}
             className="flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
           >
             <FiLogOut className="mr-2 text-xl" />
             Logout
           </button>
    </div>
  )
}

export default Logout


