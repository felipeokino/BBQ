import AddNewEvent from '@/components/addEventButton';
import EventCard from '@/components/eventCard';
import isAuth from '@/components/isAuth';
import Loading from '@/components/loading';
import useEvents from '@/hooks/useEvents';
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

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
    <section className={`p-4 w-screen h-full flex gap-2 flex-col items-center justify-start relative ${inter.className}`}>
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