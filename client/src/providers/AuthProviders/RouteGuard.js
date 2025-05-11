'use client'
import { useEffect, useRef } from 'react';
import { useUser } from '@/app/components/providers/UserProvider';
import { useRouter,usePathname } from 'next/navigation';

const guestOnlyRoutes = ['/auth/login', '/auth/register','/','/contact','/about'];

function RouteGuard({ children }) {
  const router = useRouter();
  const path = usePathname();
  const isAuth = useRef(false);

  const { loading, user } = useUser();
  const shouldExcludeNavbar = guestOnlyRoutes.some(route => path === route);

  useEffect(() => {
    if (loading) return;


    if (shouldExcludeNavbar && user) {
      isAuth.current = true;
      router.push('/');
    }

    if (!shouldExcludeNavbar && !user) {
        isAuth.current = true;
      router.push('/auth/login');
    }
    
  }, [path, user, loading, isAuth.current, shouldExcludeNavbar]);

  return <>{children}</>;
}

export default RouteGuard;