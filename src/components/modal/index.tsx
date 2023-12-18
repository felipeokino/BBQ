import { X } from 'lucide-react';
import { ComponentProps } from 'react';
import Button from '../button';

type ModalProps = ComponentProps<'div'>&{
  handleClose: () => void
  handleConfirm?: () => void
  handleCancel?: () => void
  confirmTitle?: string
  cancelTitle?: string
}
const Modal = ({handleClose, handleConfirm, handleCancel, children, confirmTitle = 'OK', cancelTitle = 'Cancelar'}: ModalProps) => {

  return (
    <div className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center bg-zinc-800/75'>
        <div className='w-[500px] h-[500px] bg-white flex flex-col items-center rounded-md relative p-4'>
          <span className='text-black text-2xl mb-6'>
            Selecionar convidados
          </span>
          <Button.Icon className='absolute top-1 right-1 z-10' onClick={handleClose}>
            <X color='red'size={20} />
          </Button.Icon>
          <section  className='h-[350px] overflow-auto w-full p-4 flex flex-col gap-2'>
            {children}
          </section>

          {handleCancel && <Button.Container color='primary' onClick={handleConfirm}>
            <Button.Text title={cancelTitle} className='text-black' />
          </Button.Container>}
          {handleConfirm && <Button.Container color='primary' onClick={handleConfirm} type='button'>
            <Button.Text title={confirmTitle} className='text-black' />
          </Button.Container>}
        </div>
      </div>
  )
}

export default Modal