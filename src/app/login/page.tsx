'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Button from '@/components/Button/Button'
import { genericButton } from '@/components/Button/assortedButtons'

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
    <main>
      <div>
        <form className={styles.loginWrapper} onSubmit={handleSubmit}>
          <div>
            <label>E-postadress</label>
            <input
              className={styles.loginInput}
              name="email"
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Lösenord</label>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button text="Logga in" styling={genericButton} type="submit" />
        </form>
      </div>
    </main>
  )
}

export default Page
