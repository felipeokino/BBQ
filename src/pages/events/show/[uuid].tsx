import Button from '@/components/button';
import Input from '@/components/input';
import Loading from '@/components/loading';
import Modal from '@/components/modal';
import useEvents from '@/hooks/useEvents';
import { User } from '@/types/Users';
import { Download } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  description: '',
  date: '',
  observations: '',
  amountValue: 0,
  beverageIncluded: false,
  guests: [] as User[],
  valuePerGuest: 0
}

const ShowDetails = () => {
  const router = useRouter()
  const {loadEventByUUID, event, actualUser, updatePayment, loading} = useEvents()
  const {uuid} = router.query as {uuid: string}
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues});
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const amIGuest = event?.guests?.find(guest => guest.uuid === actualUser.uuid);

  useEffect(() => {
    loadEventByUUID(uuid)
  }, [uuid])

  useEffect(() => {
    if (event)
    (Object.keys(defaultValues) as Array<keyof typeof defaultValues>).forEach(key => setValue(key, event[key]))
  
  }, [event, setValue])

  const handleConfirm = () => {
    const target = inputRef.current as HTMLInputElement & {
      files: FileList
    }
    const file = target.files.item(0)

    if (event && file)
      updatePayment(uuid, event, file).then(() => {
        setModalIsOpen(false)
      })
  }

  const handleDownloadReceipt = (guestName: string, imageData: string) => {
    const a = document.createElement('a')
    a.href = imageData
    a.download = 'comprovante_de_pagamento_'+guestName+'.jpg'
    a.click()
  }

  if (loading) {
    return <Loading  />
  }

  return (
    <form className='flex flex-col gap-3 w-1/2 mx-auto bg-white p-4' >
      <Input disabled register={register} required={true} name='description' label='Descrição' type='text' errors={errors.description}/>
      <Input disabled register={register} required={true}  name='date' label='Data do churras' type='date' errors={errors.date}/>
      <Input disabled register={register} required={true} name='observations' label='Observações' type='text' errors={errors.observations}/>
      <Input disabled register={register} required={true} name='valuePerGuest' label='Contribuição (R$)' type='number' errors={errors.valuePerGuest}/>
      <Input register={register} required={false}  name='beverageIncluded' label='Bebida inclusa?' type='checkbox' checked className=''/>

      <section className='flex flex-col'>
        <span className='text-lg'>Quem já pagou?</span>
        {
          event?.guests.filter(guest => guest.paid).map(guest => (
            <div key={guest.email} className='flex justify-start items-center'>
              <span>{guest.name}</span>
              {(amIGuest?.uuid === guest.uuid || event.amIOwner) &&
              <Button.Container type='button' color='transparent' onClick={() => handleDownloadReceipt(guest.name, guest.receiptImage)}>
                <Button.Text title='Baixar Comprovante' />
                <Button.Icon><Download size={16} /></Button.Icon>
              </Button.Container>}
            </div>
          ))
        }
      </section>

      {!event?.amIOwner && !amIGuest?.paid && 
        <Button.Container className='mx-auto' color='primary' type='button' onClick={() => setModalIsOpen(true)}>
          <Button.Text title='Confirmar pagamento' />
        </Button.Container>
      }
      <Button.Container color='primary' type='button' onClick={() => router.push('/events/')} className='mx-auto'>
        <Button.Text title='Voltar' />
      </Button.Container>
      {modalIsOpen && <Modal handleClose={() => setModalIsOpen(false)} handleCancel={() => setModalIsOpen(false)} handleConfirm={handleConfirm}>
        <span>
          Chave PIX: <span className='cursor-copy hover:text-yellow-600' onClick={(e) => {
            navigator.clipboard.writeText(e.currentTarget.innerText)
          }}>{event?.pixKey}</span>
        </span>
        <input ref={inputRef} type="file" name="comprovante" id="comprovante" />
      </Modal>}
    </form>
  )
}

export default ShowDetails