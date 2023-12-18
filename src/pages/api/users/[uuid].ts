import { User } from '@/types/Users';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';

const basePath = 'src/pages/api/users/'


const readUsers = (userUUID: string) => {
  try {
    const users = fs.readFileSync(`${basePath}users.json`)
    return (JSON.parse(users.toString()) as Array<User>).filter(user => user.uuid !== userUUID)
  } catch(err) {
    console.error(err)
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const {uuid} = req.query 
    const list = readUsers(uuid as string)
    

    return res.status(200).json({ list })
  }
}