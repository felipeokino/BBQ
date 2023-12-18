import Button from '@/components/button';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
const Login = () => {
  const [invalidUser, setInvalidUser] = useState(false);
  const {register, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const router = useRouter()

  const handleLogin = async (dataParams: {email: string, password: string}) => {
    setInvalidUser(false)
    try {
      const { data, status } = await axios.post<{user?: string, error?: string}>('/api/auth', dataParams)

      if (status === 200) {
        localStorage.setItem('loggedUser', JSON.stringify(data.user!))
        router.push('/events')
      }
    } catch(err: any) {
      if (err?.response?.status === 401) {
        setInvalidUser(true)
      }
    }
      
  }
  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center '>
      <div className='border border-yellow-300 w-1/2 h-1/2 bg-yellow-500 flex flex-col justify-start items-center rounded-md shadow-lg shadow-zinc-800 transition-all bg-bbq-pattern max-w-[680px] min-h-[500px] sm:w-[90%]'>
      <span className='text-4xl mt-20'>Agenda de churras</span>
      <span data-hidden={invalidUser} className='my-4 flex gap-2 justify-center items-center text-red-500 w-full text-center data-[hidden=false]:hidden'>Usuário inválido<AlertTriangle size={18} /></span>
      <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-4 w-2/3 justify-center items-center my-auto'>
        <label htmlFor="email" className='block w-full mr-auto text-black text-lg'>E-mail</label>
        <input {...register('email', {
          required: true,
        })} type="email" name="email" id="email" className='w-full h-8 mx-auto text-black pl-2 rounded-md' />

        <label htmlFor="passwd" className='block w-full mr-auto text-black text-lg'>Password</label>
        <input {...register('password', {required: true})} type="password" name="password" id="passwd" className='w-full h-8 mx-auto text-black pl-2 rounded-md' />
      
        <Button.Container type='submit' size='default' className='mt-10' >
          <Button.Text title='SIGN IN' className='text-sm text-black' />
        </Button.Container>
      </form>

    </div>
    </div>
  );
}


export default Login