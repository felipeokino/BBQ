import auth from '@/helpers/getAuth';
import { AxiosClient } from '@/services/clients/axiosClient';
import { HTTP } from '@/services/http';
import { EventData, Guest } from '@/types/Events';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useGuests() {
  const user = auth.getAuthenticatedUser()
  const [guests, setGuests] = useState<Guest[]>([])
  const [event, setEvent] = useState<EventData|null>(null)
  const [loading, setLoading] = useState(false);
  const client = new HTTP(new AxiosClient());

  const loadGuests = async () => {
    setLoading(true)
    try {
      const {data, status} = await client.get<AxiosResponse<{list: Guest[]}>>(`/api/users/${user.uuid}`)
      
      if (status === 200) {
        setGuests(data.list.filter(item => item.uuid !== user.uuid))
      }
    } catch {
      toast('iiiii deu erro! Tenta mais tarde', {
        icon: '🤡'
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loadGuests,
    loading,
    guests,
    event
  }
}