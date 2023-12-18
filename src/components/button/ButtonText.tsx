import { ComponentProps } from 'react';

type ButtonTextProps = ComponentProps<'span'> & {
  title: string
}
const ButtonText = ({ title, ...props }: ButtonTextProps) => {
  return (
    <span {...props}>{title}</span>
  )
}

export default ButtonText