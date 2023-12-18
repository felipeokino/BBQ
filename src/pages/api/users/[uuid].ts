import { User } from '@/types/Users';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';

const basePath = 'src/pages/api/users/'

const initFile = () => {
  try {
    if (!fs.existsSync(`${basePath}users.json`))
      fs.writeFileSync(`${basePath}users.json`, JSON.stringify([]))
  } catch(err) {
    console.log(err)
  }
}

const readUsers = (userUUID: string) => {
  try {
    const users = fs.readFileSync(`${basePath}users.json`)
    return (JSON.parse(users.toString()) as Array<User>).filter(user => user.uuid !== userUUID)
  } catch(err) {
    console.error(err)
  }
}

const createUser = (dataParams: User) => {
  try {
    const file = fs.readFileSync(`${basePath}users.json`)
    const parsedFile = JSON.parse(file.toString()) as User[]

    parsedFile.push(dataParams)
    fs.writeFileSync(`${basePath}user.json`, JSON.stringify(parsedFile))
    
  } catch(err) {
    console.error(err)
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  initFile()
  if (req.method === 'GET') {
    const {uuid} = req.query 
    const list = readUsers(uuid as string)
    

    return res.status(200).json({ list })
  }

  if (req.method === 'POST') {
    const data = req.body
    createUser({...data, uuid: randomUUID()})
  }
}