'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FC, FormEvent, memo, useCallback, useState } from 'react'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { httpClient } from '@/clients/httpClient'

import { Card, Input, Button } from '@material'

export const RegisterForm: FC = memo(() => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [isAlreadyExisting, setIsAlreadyExisting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegisterSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setIsAlreadyExisting(false)
      setIsSubmitting(true)

      const registerRequest = httpClient.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      })

      try {
        await registerRequest
        router.replace('/drivers')
      } catch (error) {
        if ((error as AxiosError).response?.status === 403) {
          setIsAlreadyExisting(true)
        } else {
          toast.error('Oops, this is on us. Please try again later.')
        }

        setIsSubmitting(false)
      }
    },
    [email, password, firstName, lastName, router],
  )

  return (
    <Card className="p-8 w-[400px] max-w-[95%]">
      <h3 className="text-2xl leading-6 text-[color:var(--text-color)] font-bold">
        Sign Up
      </h3>
      <p className="mt-1 font-normal text-gray-700">
        Enter your details to create an account.
      </p>

      <form
        onSubmit={handleRegisterSubmit}
        className="mt-6 w-full max-w-screen-lg"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            required
            size="lg"
            label="First Name"
            autoComplete="given-name"
            value={firstName}
            onChange={({ target: { value } }) => setFirstName(value)}
          />
          <Input
            required
            size="lg"
            label="Last Name"
            autoComplete="family-name"
            value={firstName}
            onChange={({ target: { value } }) => setLastName(value)}
          />

          <div>
            <Input
              error={isAlreadyExisting}
              required
              size="lg"
              label="Email"
              autoComplete="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
            {isAlreadyExisting && (
              <p className="mt-1 text-[color:var(--accent-color)]">
                Email already registered
              </p>
            )}
          </div>

          <Input
            required
            type="password"
            size="lg"
            label="Password"
            autoComplete="new-password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          color="red"
          className="mt-6"
          fullWidth
        >
          Register
        </Button>
        <p className="mt-4 text-center font-normal text-gray-700">
          You already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>
      </form>
    </Card>
  )
})
