'use client'

import { FC, PropsWithChildren, memo } from 'react'

import {
  Dialog as MaterialDialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  header?: JSX.Element
  footer?: JSX.Element
}

export const Dialog: FC<PropsWithChildren<DialogProps>> = memo(
  ({ isOpen, onClose, header, footer, children }) => {
    return (
      <MaterialDialog
        className="focus-visible:outline-none bg-[color:var(--background-color)]"
        open={isOpen}
        handler={onClose}
        dismiss={{ enabled: false }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {header && <DialogHeader>{header}</DialogHeader>}

        <DialogBody>{children}</DialogBody>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </MaterialDialog>
    )
  },
)
