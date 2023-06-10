import { FC, memo } from 'react'
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
} from '@material'

interface ButtonProps {
  variant: MaterialButtonProps['variant']
  size?: MaterialButtonProps['size']
  className?: MaterialButtonProps['className']
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = memo((props) => {
  const { className, ...buttonProps } = props

  return (
    <MaterialButton
      className={`${
        className ?? ''
      } normal-case text-sm text-[color:var(--text-color)]`}
      {...buttonProps}
    />
  )
})
