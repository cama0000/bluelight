'use client'

import { selectLoadingState } from '@/store/loading/loadingSelectors';
import { useAppSelector } from '@/store/store';
import { selectCurrentUser } from '@/store/user/userSelectors';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

function ProtectedRoutes<P extends object>(WrappedComponent: ComponentType<P>) {
const HOC = (props: P) => {
    const router = useRouter();
    const user = useAppSelector(selectCurrentUser);
    const isLoading = useAppSelector(selectLoadingState);

    useEffect(() => {
        if(!isLoading && !user){
            router.push("/");
        }

    }, [user, router, isLoading]);

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
