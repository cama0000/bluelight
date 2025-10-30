'use client'

import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { useRouter } from 'next/navigation';
import ProtectedRoutes from '../components/ProtectedRoutes';

const home = () => {

  const router = useRouter();
  const {authLogout, user} = useAuth();
  
  async function handleLogout(){

    try{
      await authLogout();

      router.push("/");
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Home</h1>

      <div>
        Welcome, {user?.username}
      </div>

      <div 
          onClick={handleLogout}
        >
          Sign out
        </div>

        <div 
          onClick={() => {router.push("/questions")}}
        >
        Questions
        </div>
    </div>
  )
}

export default ProtectedRoutes(home);