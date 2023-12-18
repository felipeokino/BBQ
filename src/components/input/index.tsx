import { ComponentProps, Ref, forwardRef } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type InputProps = ComponentProps<'input'> & {
  name: string
  label: string
  type: string,
  register?: UseFormRegister<any>
  errors?: FieldError | undefined
}
const Input = ({name, label, register, required, errors, ...props}: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={`input-${name}`} className='block w-full mr-auto text-black text-lg'>{label}</label>
      {
        register ? 
        <input {...register(name, {required})} id={`input-${name}`} {...props} className='w-full h-8 mx-auto text-black pl-2 rounded-md border border-zinc-600 outline-none  checked:accent-yellow-500' />:
        <input id={`input-${name}`} {...props} className='w-full h-8 mx-auto text-black pl-2 rounded-md border border-zinc-600 outline-none' />
      }
      {errors && <p className='text-red-600'>{label} é obrigatório.</p>}
    </div>
  )
}


export default forwardRef<HTMLInputElement, InputProps>(Input)