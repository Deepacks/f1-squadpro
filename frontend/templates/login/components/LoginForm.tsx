'use client'

import { FC, memo } from 'react'
import Link from 'next/link'

import { Card, Input, Button } from '@material'

export const LoginForm: FC = memo(() => {
  return (
    <Card className="p-8 w-[400px] max-w-[95%]">
      <h3 className="text-2xl leading-6 text-[color:var(--text-color)] font-bold">
        Sign In
      </h3>
      <p className="mt-1 font-normal text-gray-700">
        Enter your details to login.
      </p>

      <form className="mt-6 w-full max-w-screen-lg">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" />
          <Input type="password" size="lg" label="Password" />
        </div>

        <Button color="red" className="mt-6" fullWidth>
          Register
        </Button>
        <p className="mt-4 text-center font-normal text-gray-700">
          You don't have an account?{' '}
          <Link
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Card>
  )
})
