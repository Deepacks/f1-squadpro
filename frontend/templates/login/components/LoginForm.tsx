'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FC, FormEvent, memo, useCallback, useState } from 'react'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { httpClient } from '@/clients/httpClient'

import { Card, Input, Button } from '@material'

export const LoginForm: FC = memo(() => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLoginSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setIsUnauthorized(false)
      setIsSubmitting(true)

      const loginRequest = httpClient.post('/auth/login', { email, password })

      try {
        await loginRequest
        router.replace('/drivers')
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          setIsUnauthorized(true)
        } else {
          toast.error('Oops, this is on us. Please try again later.')
        }

        setIsSubmitting(false)
      }
    },
    [email, password, router],
  )

  return (
    <Card className="p-8 w-[400px] max-w-[95%]">
      <h3 className="text-2xl leading-6 text-[color:var(--text-color)] font-bold">
        Sign In
      </h3>
      <p className="mt-1 font-normal text-gray-700">
        Enter your details to login.
      </p>

      <form
        onSubmit={handleLoginSubmit}
        className="mt-6 w-full max-w-screen-lg"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            error={isUnauthorized}
            required
            size="lg"
            label="Email"
            autoComplete="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value.toLowerCase())}
          />

          <div>
            <Input
              error={isUnauthorized}
              required
              type="password"
              size="lg"
              label="Password"
              autoComplete="current-password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            {isUnauthorized && (
              <p className="mt-1 text-[color:var(--accent-color)]">
                Wrong credentials
              </p>
            )}
          </div>
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          color="red"
          className="mt-6"
          fullWidth
        >
          Login
        </Button>
        <p className="mt-4 text-center font-normal text-gray-700">
          You don't have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Card>
  )
})
