'use client'

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

function ProtectedRoutes<P extends object>(WrappedComponent: ComponentType<P>) {
const HOC = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !user){
            router.push("/");
        }

    }, [user, router, loading]);

    if(loading){
        return <MoonLoader/>
    }

    return <WrappedComponent {...props} />;
}


    HOC.displayName = `ProtectedRoutes(${getDisplayName(WrappedComponent)})`;
    return HOC;

};

// Helper function to set display name
function getDisplayName<P>(WrappedComponent : ComponentType<P>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

export default ProtectedRoutes;
