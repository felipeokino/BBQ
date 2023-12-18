import { formatCurrency } from '@/helpers/number';
import { EventData } from '@/types/Events';
import { CircleDollarSign, Edit, Info, PersonStandingIcon, X } from 'lucide-react';
import { useRouter } from 'next/router';
import Button from '../button';

type EventCardProps = {
  event: EventData,
  handleDelete: (eventUUID: string) => void
}
const EventCard = ({event: {uuid, description, date, amountValue, valuePerGuest, guests, amIOwner}, handleDelete}: EventCardProps) => {

  const router = useRouter()
  const handleDetails = () => {
    router.push(`/events/show/${uuid}`)
  }
  const onDelete = () => {
    if (amIOwner) {
      handleDelete(uuid)
    }
  }
  return (
    <div  className='bg-white text-black flex flex-col gap-1 text-sm shadow-sm shadow-zinc-700 p-6 rounded-md relative'>
      {amIOwner && <Button.Icon type='button' onClick={onDelete} className='absolute top-1 right-1'>
        <X  />
      </Button.Icon>}
      <span className='font-semibold text-xl'>{new Intl.DateTimeFormat('pt-BR', { month: 'short', day: 'numeric' }).format(new Date(date))}</span>
      <span className='font-semibold text-lg'>{description.toUpperCase()}</span>
      <div className='flex gap-4 justify-center items-center mb-3'>
        <span className='flex justify-center items-center text-lg gap-1'>
          <PersonStandingIcon className='stroke-yellow-400' />
          {guests.length}
        </span>
        
        <span className='flex justify-center items-center text-lg gap-1'>
          <CircleDollarSign className='stroke-yellow-400' />
          {formatCurrency(Math.ceil(valuePerGuest))}
        </span>
      </div>
        <Button.Container color='primary' size='sm' onClick={handleDetails}>
          <Button.Text className='flex-1' title={'Detalhes'}  />
          <Button.Icon>
            <Info size={16} />
          </Button.Icon>
        </Button.Container>
        {amIOwner && <Button.Container color='primary' size='sm' onClick={() => null}>
          <Button.Text className='flex-1' title={'Editar'}  />
          <Button.Icon>
            <Edit size={16} />
          </Button.Icon>
        </Button.Container>}
    </div>
  )
}

export default EventCard