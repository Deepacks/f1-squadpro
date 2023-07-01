import { FC, memo, useCallback } from 'react'

import { Select as MaterialSelect, Option } from '@material'

interface SelectProps {
  tabIndex?: number
  label: string
  options: string[]
  value: string
  emptyLabel?: string
  menuClassName?: string
  onChange: (value: string) => void
}

export const Select: FC<SelectProps> = memo(
  ({
    tabIndex,
    label,
    options,
    value,
    emptyLabel = 'No option available',
    menuClassName,
    onChange,
  }) => {
    const handleChange = useCallback(
      (value?: string) => onChange(value ?? ''),
      [onChange],
    )
    console.log(menuClassName)

    return !options.length ? (
      <MaterialSelect
        tabIndex={tabIndex}
        key={`${label}-0`}
        label={label}
        size="lg"
        className="text-[color:var(--text-color)]"
        menuProps={{
          className: menuClassName,
        }}
      >
        <Option disabled value="">
          {emptyLabel}
        </Option>
      </MaterialSelect>
    ) : (
      <MaterialSelect
        key={`${label}-1`}
        label={label}
        size="lg"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        className="text-[color:var(--text-color)]"
        menuProps={{
          className: menuClassName,
        }}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </MaterialSelect>
    )
  },
)
