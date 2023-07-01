import { FC, memo } from 'react'
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
} from '@material'

interface ButtonProps {
  tabIndex?: MaterialButtonProps['tabIndex']
  disabled?: MaterialButtonProps['disabled']
  variant?: MaterialButtonProps['variant']
  size?: MaterialButtonProps['size']
  className?: MaterialButtonProps['className']
  fullWidth?: MaterialButtonProps['fullWidth']
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = memo((props) => {
  const { className, ...buttonProps } = props

  return (
    <MaterialButton
      color="red"
      type="submit"
      className={`material-button ${className ?? ''}`}
      {...buttonProps}
    />
  )
})
