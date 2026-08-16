'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import ProtectedRoutes from '../components/other/ProtectedRoutes';
import { useAppSelector } from '@/store/store';
import { selectCurrentUser } from '@/store/user/userSelectors';

const home = () => {

  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  
  return (
    <div>
      <h1>Home</h1>

      <div>
        Welcome, {user?.username}
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