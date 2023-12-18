import { getBase64 } from '@/helpers/files';
import auth from '@/helpers/getAuth';
import { EventData } from '@/types/Events';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function useEvents() {
  const user = auth.getAuthenticatedUser()
  const [events, setEvents] = useState<EventData[]>([])
  const [event, setEvent] = useState<EventData|null>(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function loadMyEvents() {
    setLoading(true)
    try {
      const {data, status} = await axios.get<{list: EventData[]}>(`/api/events/${user.uuid}`)
      
      if (status === 200) {
        setEvents(data.list)
      }
    } finally {
      setLoading(false)
    }
  }

  const loadEventByUUID = useCallback(async (eventUUID: string) => {
    setLoading(true)
    try {
      const {data, status} = await axios.get<{event: EventData}>(`/api/events/${user.uuid}/${eventUUID}`)
      
      console.log(data)
      if (status === 200) {
        setEvent(data.event)
      }
    } finally {
      setLoading(false)
    }
  }, [user])

  async function postEvent(data: any) {
    setLoading(true)
    try {
      const {status} = await axios.post(`/api/events/${user.uuid}`, data)
      if (status === 201) {
        router.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const updatePayment = useCallback(async (eventUUID: string, eventData: EventData, paymentReciept: File) => {
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
        const { status } = await axios.put(`/api/events/${user.uuid}/${eventUUID}`, eventBody)
  
        if (status === 200) {
          router.push('/events/')
        }
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const deleteEvent = useCallback(async (eventUUID: string) => {
    setLoading(true)
    try {
      const {status} = await axios.delete(`/api/events/${user.uuid}/${eventUUID}`)       
    } finally {
      loadMyEvents()
    }
  }, [])

  const updateEvent = useCallback(async (eventUUID: string, eventData: EventData) => {
    setLoading(true)
    try {
      const { status } = await axios.put(`/api/events/${user.uuid}/${eventUUID}`, eventData)
  
      if (status === 200) {
        router.push('/events/')
      }
    } finally {
      setLoading(false)
    }
  }, [])

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