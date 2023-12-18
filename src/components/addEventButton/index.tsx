import NextImage from 'next/image';
import { useRouter } from 'next/router';
import BBQImage from '../../assets/icon_bbq.png';

const AddNewEvent = () => {
  const router = useRouter()

  const handleClickAddNewEvent = () => {
    router.push('/events/create')
  }
  return (
    <div  className='bg-white text-black flex flex-col gap-4 text-sm shadow-sm shadow-zinc-700 p-6 rounded-md relative w-[216px] justify-center items-center cursor-pointer' onClick={handleClickAddNewEvent}>
      <div className='bg-yellow-400 w-[100px] h-[100px] rounded-full flex justify-center items-center'>
        <NextImage src={BBQImage} alt='imagem catunizada de uma churrasqueira' className='scale-125'/>
      </div>
      <span className='text-lg'>Marcar churras</span>
    </div>
  )
}

export default AddNewEvent