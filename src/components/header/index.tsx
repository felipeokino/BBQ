import { LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import Button from '../button';
const Header = () => {
  const router = useRouter()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    router.push('/login')
  }
  return (
    <header className='w-full min-h-32 bg-yellow-400 text-black py-8 flex justify-center items-center text-3xl fixed top-0 left-0 px-4 bg-bbq-pattern'>
      <div 
        className='fixed top-0 lef-0 w-full bg-bbq-pattern'
      />
      <span className='text-center flex-1'>Agenda de Churrascos</span>
      <Button.Icon className='flex-0' onClick={handleLogout}>
        <LogOut className='ml-auto' />
      </Button.Icon>
    </header>
  )
}

export default Header