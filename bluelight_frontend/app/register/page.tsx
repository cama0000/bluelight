'use client'

import { Box, TextField, Typography } from '@mui/material';
import React from 'react'
import { auth, googleProvider } from "../../firebase"
import { signInWithPopup } from "firebase/auth";
import { login } from '@/services/user';
import { useRouter } from 'next/navigation';
import { User } from "@/types/user";
import { useAuth } from '@/context/AuthContext';

// import GoogleIcon from '@mui/icons-material/Google';

const page = () => {
    const router = useRouter();
    const {authLogin} = useAuth();

    async function handleLogin() {
      try{
        await authLogin();

        router.push("/home");
      }
      catch(error){
        console.log(error)
      }


        

//         const auth = getAuth();
//           const googleProvider = new GoogleAuthProvider();

// signInWithPopup(auth, googleProvider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);

//     if(credential){
//       const token = credential.accessToken;
//     }
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
      }
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-purple-50'>

      <Box
        component="form" 
        sx={{
          width: '100%',
          maxWidth: '550px',
          margin: 'auto',
          padding: '3rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(107, 33, 168, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          border: '1px solid rgba(107, 33, 168, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 25px 60px rgba(107, 33, 168, 0.15)',
          }
        }}
      >
        <Typography 
          component="h1" 
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900"
          sx={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}
          onClick={handleLogin}
        >
          Sign in with Google
        </Typography>



     
      </Box>
    </div>
  );
}

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(107, 33, 168, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(107, 33, 168, 0.3)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(107, 33, 168, 0.5)',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgba(107, 33, 168, 0.8)',
    },
  };

export default page
