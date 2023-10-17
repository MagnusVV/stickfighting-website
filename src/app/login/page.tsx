'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    if (response.ok) {
      router.push('./admin')
    } else {
      console.log(response)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default page
