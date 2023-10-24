'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

const Page = () => {
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
      console.log(response) // TODO: Ta bort senare!!!
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            E-postadress
            <input
              name="email"
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            Lösenord
            <input
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <button type="submit">Logga in</button>
        </form>
      </div>
    </main>
  )
}

export default Page
