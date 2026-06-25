'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import ProtectedRoutes from '../components/other/ProtectedRoutes';
import { MoonLoader } from 'react-spinners';
import Loader from '../components/other/Loader';

const page = () => {
    const router = useRouter();
    const {authLogin, user} = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      if(user){
        router.push("/questions");
      }
    }, [user])

    async function handleLogin() {
      try{
        await authLogin();

        router.push("/questions");
      }
      catch(error){
        console.log(error)
      }

      if(loading){
        return(
          <Loader/>
        )
    }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-950 to-zinc-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-zinc-900 border border-zinc-800 text-white shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-blue-300">Welcome.</CardTitle>
            <CardDescription className="text-zinc-400">
              Sign in to your account to start solving problems.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:cursor-pointer hover:text-white text-zinc-200 py-5 transition-all duration-200"
              onClick={handleLogin}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col items-center text-sm text-zinc-500 space-y-1">
            <p>By continuing, you agree to our Terms of Service.</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default page;
