import React from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const button = tv({
  base: 'border border-zinc-700 rounded-lg bg-zinc-900 hover:scale-[103%] transition-all active:scale-[95%] flex justify-center items-center gap-1',
  variants: {
    size: {
      default: 'w-[300px] h-10 px-4',
      xs: 'h-6 px-2 text-xs',
      sm: 'h-8 px-3',
    },
    color: {
      default: 'bg-white text-black',
      success: 'bg-emerald-500',
      primary: 'bg-yellow-400',
      transparent: 'bg-transparent border-none hover:scale-[100%] active:scale-100 hover:text-yellow-500'
    }
  },
  defaultVariants: {
    size: 'default',
    color: 'default'
  }
})

type ButtonContainerProps = React.ComponentProps<'button'> & VariantProps<typeof button>

const ButtonContainer = ({ children, size, color, className,...props }: ButtonContainerProps) => {
  return (
    <button className={button({ size, color, className })} {...props}>
      {children}
    </button>
  )
}

export default ButtonContainer