import { EventData } from '@/types/Events';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';

const basePath = 'src/pages/api/events/'

type Data = {
  list?: EventData[];
  event?: EventData
  error?: string
};

const initFile = () => {
  try {
    if (!fs.existsSync(`${basePath}events.json`))
      fs.writeFileSync(`${basePath}events.json`, JSON.stringify([]))
  } catch(err) {
    console.log(err)
  }
}

const writeEvent = (eventData: Partial<EventData>) => {
  try {
    const fileDate = fs.readFileSync(`${basePath}events.json`)

    const parsedFileData = JSON.parse(fileDate.toString()) as Partial<EventData>[]

    parsedFileData.push(eventData)

    fs.writeFileSync(`${basePath}events.json`, JSON.stringify(parsedFileData))
  } catch(error) {
    console.error(error)
  }
}

const readEvents = (uuid: string): EventData[] => {
  try {
    const file = fs.readFileSync(`${basePath}events.json`)
    return JSON.parse(file.toString()).filter((event: EventData) => event.guests.find(guest => guest.uuid === uuid) || event.owner === uuid).map((event: EventData) => ({...event, amIOwner: event.owner === uuid}))
  } catch (err) {
    console.error(err)
  }

  return [] as EventData[]
}

const readEvent = (userUUID: string, eventUUID: string): EventData => {
  try {
    const file = fs.readFileSync(`${basePath}events.json`)
    const event = JSON.parse(file.toString()).find((event: EventData) => event.uuid === eventUUID)
    console.log(event.owner === userUUID)
    return {...event, amIOwner: event.owner === userUUID}
    return event
  } catch (err) {
    console.error(err)
  }

  return {} as EventData
}

const updateEvent = (eventData: EventData, eventUUID: string) => {
  try {
    const fileDate = fs.readFileSync(`${basePath}events.json`)

    let parsedFileData = JSON.parse(fileDate.toString()) as Partial<EventData>[]

    parsedFileData = parsedFileData.map(event => {
      if (event.uuid === eventUUID) {
        return eventData
      }
      return event
    })
    fs.writeFileSync(`${basePath}events.json`, JSON.stringify(parsedFileData))
  } catch (error) {
    console.error(error)
  }
}

const deleteEvent = (eventUUID: string) => {
  try {
    const file = fs.readFileSync(`${basePath}events.json`)
    
    fs.writeFileSync(`${basePath}events.json`, JSON.stringify(JSON.parse(file.toString()).filter((event: EventData) => event.uuid !== eventUUID)))
  } catch (err) {
    console.error(err)
  }

  return {} as EventData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  initFile()
  if (req.method === 'POST') {
    const data = req.body as Partial<EventData>
    const [ userUUID ] = req.query.events as string[]

    const suggestedValueGuest = Math.ceil(data.amountValue!/((data.guests?.length || 1)+1))

    writeEvent({...data, owner: userUUID, uuid: randomUUID(), valuePerGuest: suggestedValueGuest, guests: data.guests?.map(guest => ({...guest, paid: false, receiptImage: ''}))})
    res.status(201).send({})
  }

  if (req.method === 'GET') {
    const [userUUID, eventUUID] = req.query.events as string[]

    if (eventUUID) {
      const event = readEvent(userUUID, eventUUID)
      
      if (!event) {
        res.status(404).send({ event: undefined })
      }
      
      setTimeout(() => {
        res.status(200).send({ event: readEvent(userUUID, eventUUID) })
      }, 3000)

    }
      
    setTimeout(() => {
      res.status(200).send({ list: readEvents(userUUID) })
    }, 3000)
  }

  if (req.method === 'PUT') {
    const [userUUID, eventUUID] = req.query.events as string[]

    const data = req.body

    const suggestedValueGuest = Math.ceil(data.amountValue!/((data.guests?.length || 1)+1))

    updateEvent({...data, valuePerGuest: suggestedValueGuest}, eventUUID)
    res.status(200).send({  })
  }

  if (req.method === 'DELETE') {
    const [ userUUID, eventUUID ] = req.query.events as string[]

    const event = readEvent(userUUID, eventUUID)

    if (event && event?.owner === userUUID)
      deleteEvent(eventUUID)
    res.status(200).send({})
  }
}