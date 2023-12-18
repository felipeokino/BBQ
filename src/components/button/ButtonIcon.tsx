import { ComponentProps } from 'react';

type ButtonIcon = ComponentProps<'button'>
const ButtonIcon = ({ children, ...props }: ButtonIcon) => {
  return (
    <button {...props}>
      {children}
    </button>
  )
}

export default ButtonIcon