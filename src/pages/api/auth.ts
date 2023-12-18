import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'node:fs';

const basePath = 'src/pages/api/users/users.json'


type UserData = {
  name: string
  email: string
  password: string
  uuid: string
}

type Data = {
  user?: Partial<UserData>;
  error?: string
};

const loadFile = () => {
  try {
    const file = fs.readFileSync(`${basePath}`);
    return JSON.parse(file.toString()) as UserData[]
  } catch(err) {
    console.error(err)
  }
}

const userIsValid = (email: string, password: string): Partial<UserData> | undefined => {
  const file = loadFile();

  const user: Partial<UserData> | undefined = file?.find(user => {
    return user.email === email && user.password === password
  })

  if (user)
    delete user.password
  return user
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
  
    const userExists = userIsValid(email, password)

    if (!userExists) 
      return res.status(401).json({ error: "User not exists." });

    return res.status(200).json({ user: userExists })
  }
}
