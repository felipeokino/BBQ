import { User } from '@/types/Users';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';

const basePath = 'src/pages/api/users/'


const readUsers = (): User[] => {
  try {
    const users = fs.readFileSync(`${basePath}users.json`)
    return (JSON.parse(users.toString()) as Array<User>).map(user => delete user.password && user) as Array<User>
  } catch(err) {
    console.error(err)
  }
  return []
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') { 
    const list = readUsers()
    return res.status(200).json({ list })
  }
}