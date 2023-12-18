import AddNewEvent from '@/components/addEventButton';
import EventCard from '@/components/eventCard';
import isAuth from '@/components/isAuth';
import useEvents from '@/hooks/useEvents';
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });
const Loading = () => (
  <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center gap-3 [&>div]:w-8 [&>div]:h-8 [&>div]:rounded-full'>
    <div className='animate-[bounce_1s_infinite_50ms] bg-yellow-400'/>
    <div className='animate-[bounce_1s_infinite_150ms] bg-yellow-500'/>
    <div className='animate-[bounce_1s_infinite_250ms] bg-yellow-600'/>
  </div>
)
const Events = () => {  
  const { loadMyEvents, events, loading, deleteEvent } = useEvents()
  
  const router = useRouter();

  useEffect(() => {
    loadMyEvents()
  }, [])

  const handleClickAddNewEvent = () => {
    router.push('/events/create')
  }

  return (
    <section className={`p-4 w-screen h-full border border-red-400 flex gap-2 flex-col items-center justify-start relative ${inter.className}`}>
      {
        loading && <Loading  />
      }

      {!loading && 
        <>
          <div className='flex gap-6'>
            <AddNewEvent  />
            {
              events.map((event, idx) => (
                <EventCard event={event} key={event.description+idx} handleDelete={deleteEvent} />
              ))
            }
          </div>
        
          
        </>
      }
    </section>
  );
}


export default isAuth(Events)