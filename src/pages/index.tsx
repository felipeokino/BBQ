import isAuth from '@/components/isAuth';
import useEvents from '@/hooks/useEvents';
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

const Home = () => {  
  const { loadMyEvents, events, loading } = useEvents()
  
  const router = useRouter();

  useEffect(() => {
    router.push('/events/')
  }, [])

  return null;
}


export default isAuth(Home)