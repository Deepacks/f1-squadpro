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
        className="!w-[calc(100vw-40px)] !max-w-[500px] !min-w-0 focus-visible:outline-none bg-[color:var(--background-color)]"
        open={isOpen}
        handler={onClose}
        dismiss={{ enabled: false }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        {header && <DialogHeader className="pb-0">{header}</DialogHeader>}

        <DialogBody>{children}</DialogBody>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </MaterialDialog>
    )
  },
)
