/* eslint-disable react-hooks/exhaustive-deps */
import { getBase64 } from '@/helpers/files';
import auth from '@/helpers/getAuth';
import { AxiosClient } from '@/services/clients/axiosClient';
import { HTTP } from '@/services/http';
import { EventData } from '@/types/Events';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useEvents() {
  const user = auth.getAuthenticatedUser()
  const [events, setEvents] = useState<EventData[]>([])
  const [event, setEvent] = useState<EventData|null>(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const client = new HTTP(new AxiosClient())


  async function loadMyEvents() {
    setLoading(true)
    try {
      const {data, status} = await client.get<AxiosResponse<{list: EventData[]}>>(`/api/events/${user.uuid}`)
      
      if (status === 200) {
        setEvents(data.list)
      }
    } catch {
      toast('iiiii deu erro! Tenta mais tarde', {
        icon: '🤡'
      })
    } finally {
      setLoading(false)
    }
  }

  const loadEventByUUID = async (eventUUID: string) => {
    setLoading(true)
    try {
      const {data, status} = await client.get<AxiosResponse<{event: EventData}>>(`/api/events/${user.uuid}/${eventUUID}`)
      
      console.log(data)
      if (status === 200) {
        setEvent(data.event)
      }
    } catch {
      toast('iiiii deu erro! Tenta mais tarde', {
        icon: '🤡'
      })
    } finally {
      setLoading(false)
    }
  }

  const postEvent = async (data: any) => {
    setLoading(true)
    try {
      const {status} = await client.post(`/api/events/${user.uuid}`, data)
      if (status === 201) {
        router.push('/')
      }
    } catch {
      toast('iiiii deu erro! Tenta mais tarde', {
        icon: '🤡'
      })
    } finally {
      setLoading(false)
    }
  }

  const updatePayment = async (eventUUID: string, eventData: EventData, paymentReciept: File) => {
    setLoading(true)
    
    const fileReader = getBase64(paymentReciept);

    fileReader.onload = async () => {
      try {

        const eventBody: EventData = {
          ...eventData,
          guests: eventData.guests.map(guest => {
            if(guest.uuid === user.uuid) {
              return {
                ...guest,
                paid: true,
                receiptImage: fileReader.result as string
              }
            }
            return guest
          })
        }
        const { status } = await client.put(`/api/events/${user.uuid}/${eventUUID}`, eventBody)
  
        if (status === 200) {
          toast('Pagamento atualizado!', {
            icon: '🤑',
            position: 'bottom-left'
          })
          setTimeout(() => {
            router.push('/events/')
          }, 1500)
        }
      } catch {
        toast('iiiii deu erro! Tenta mais tarde', {
          icon: '🤡'
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const deleteEvent = async (eventUUID: string) => {
    setLoading(true)
    try {
      await client.delete(`/api/events/${user.uuid}/${eventUUID}`)       
    } finally {
      loadMyEvents()
    }
  }

  const updateEvent = async (eventUUID: string, eventData: EventData) => {
    setLoading(true)
    try {
      const { status } = await client.put(`/api/events/${user.uuid}/${eventUUID}`, eventData)
  
      if (status === 200) {
        toast('Churras atualizado!', {
          icon: '✅',
          position: 'bottom-left'
        })
        setTimeout(() => {
          router.push('/events/')
        }, 1500)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loadMyEvents,
    loadEventByUUID,
    postEvent,
    updatePayment,
    deleteEvent,
    updateEvent,
    loading,
    events,
    event,
    actualUser: user
  }
}