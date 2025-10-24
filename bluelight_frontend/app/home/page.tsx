'use client'

import { useAuth } from '@/context/AuthContext';
import { Typography } from '@mui/material'
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

      <Typography>
        Welcome, {user?.username}
      </Typography>

      <Typography 
          component="h1" 
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900"
          sx={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}
          onClick={handleLogout}
        >
          Sign out
        </Typography>
    </div>
  )
}

export default ProtectedRoutes(home);