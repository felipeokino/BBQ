import auth from '@/helpers/getAuth';
import { EventData } from '@/types/Events';
import { User } from '@/types/Users';
import axios from 'axios';
import { useState } from 'react';

export default function useGuests() {
  const user = auth.getAuthenticatedUser()
  const [guests, setGuests] = useState<User[]>([])
  const [event, setEvent] = useState<EventData|null>(null)
  const [loading, setLoading] = useState(false);

  async function loadGuests() {
    setLoading(true)
    try {
      const {data, status} = await axios.get<{list: User[]}>(`/api/users/${user.uuid}`)
      
      if (status === 200) {
        setGuests(data.list.filter(item => item.uuid !== user.uuid))
      }
    } finally {
      setLoading(false)
    }
  }

  async function loadEventByUUID(eventUUID: string) {
    setLoading(true)
    try {
      const {data, status} = await axios.get<{event: EventData}>(`/api/user/${user.uuid}/${eventUUID}`)
      
      if (status === 200) {
        setEvent(data.event)
      }
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