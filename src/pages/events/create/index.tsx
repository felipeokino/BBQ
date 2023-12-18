import Button from '@/components/button';
import Input from '@/components/input';
import isAuth from '@/components/isAuth';
import Modal from '@/components/modal';
import useEvents from '@/hooks/useEvents';
import useGuests from '@/hooks/useGuests';
import { User } from '@/types/Users';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  description: '',
  date: '',
  observations: '',
  pixKey: '',
  amountValue: 0,
  beverageIncluded: false,
  guests: [] as User[]
}

const CreateEvent = () => {
  const { postEvent } = useEvents()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues});
  const [isOpen, setIsOpen] = useState(false)
  const [tempGuest, setTempGuest] = useState<string[]>([])
  const {guests, loadGuests} = useGuests();
  const router = useRouter();

  useEffect(() => {
    loadGuests()
  }, [])

  const handleAdd = () => {
    setValue('guests', guests.filter(guest => tempGuest.includes(guest.uuid)))
    setIsOpen(false)
  }

  const onSubmit = (dataParams: any) => {
    postEvent(dataParams)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className='flex flec-col gap-8 p-4 bg-white h-[calc(100vh-6rem)] w-full'>
      
      <div className='flex flex-col justify-start items-center p-4 text-black w-1/2 min-w-[600px] h-1/2 min-h-[600px]  mx-auto'>
        
        <span className='text-2xl'>Como vai ser o churras?</span>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} required={true} name='description' label='Descrição' type='text' errors={errors.description}/>
          <Input register={register} required={true}  name='date' label='Data do churras' type='date' errors={errors.date}/>
          <Input register={register} required={true} name='observations' label='Observações' type='text' errors={errors.observations}/>
          <Input register={register} required={true} name='pixKey' label='Chave PIX' type='text' errors={errors.pixKey}/>
          <Input register={register} required={true} name='amountValue' label='Total' type='number' errors={errors.amountValue}/>
          <Input register={register} required={false}  name='beverageIncluded' label='Bebida inclusa?' type='checkbox' />

          <Button.Container color='primary' type='button' onClick={handleCancel}>
            <Button.Text title='Cancelar' />
          </Button.Container>
          <Button.Container color='primary' type='button' onClick={() => {
            setIsOpen(true)
          }}>
            <Button.Text title='Add convidado' />
          </Button.Container>
          <Button.Container color='primary' type='submit'>
            <Button.Text title='Finalizar' />
          </Button.Container>
          
        </form>
      </div>
      {isOpen && 
        <AddGuestModal 
          handleAdd={handleAdd}
          setIsOpen={setIsOpen}
          setTempGuest={setTempGuest}
          tempGuest={tempGuest}
          guests={guests}
        />
      }
    </div>
  )
}
type AddGuestModalProps = {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
  tempGuest: string[]
  setTempGuest: React.Dispatch<SetStateAction<string[]>>
  handleAdd: () => void
  guests: User[]
}
const AddGuestModal = ({setIsOpen, setTempGuest, tempGuest, handleAdd, guests}: AddGuestModalProps) => {

  const addGuest = (newGuest: User) => {
    if (!tempGuest.includes(newGuest.uuid)) {  
      setTempGuest(state => [...state, newGuest.uuid])
    } else {
      removeGuest(newGuest.uuid)
    }
  }

  const removeGuest = (guestUUID: string) => {
    setTempGuest([...tempGuest.filter(guest => guest !== guestUUID)])
  }

 

  return (
    <Modal handleClose={() => setIsOpen(false)} handleConfirm={handleAdd} confirmTitle='Adicionar'>
      <section  className='h-[350px] overflow-auto w-full p-4 flex flex-col gap-2'>
        {guests.map((guest, idx) => (
          <div onClick={(e) => {
            e.preventDefault()
            addGuest(guest)  
          }} key={guest.name} className='input-wrapper text-black flex gap-4 items-center rounded-md shadow-sm shadow-zinc-600 hover:shadow-zinc-400 w-full p-0 '>
            <input className='w-8 h-8 hidden' name={guest.name} type='checkbox' id={`guest-check-${idx}`} checked={tempGuest.includes(guest.uuid)}/>
            <label htmlFor={`guest-check-${idx}`} className='text-xl font-light  px-2 py-3 w-full h-full cursor-pointer'>{guest.name}</label>
          </div>
        ))}
      </section>
    </Modal>
  )
}

export default isAuth(CreateEvent)