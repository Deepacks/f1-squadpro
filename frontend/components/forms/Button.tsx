import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
} from '@material'

interface ButtonProps {
  variant: MaterialButtonProps['variant']
  size: MaterialButtonProps['size']
  className: MaterialButtonProps['className']
  children: React.ReactNode
}

export function Button(props: ButtonProps) {
  const { className, ...buttonProps } = props

  return (
    <MaterialButton
      className={`${className} normal-case text-sm text-[color:var(--text-color)]`}
      {...buttonProps}
    />
  )
}
