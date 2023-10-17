'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { log } from 'console'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (session) {
      router.push('admin')
      console.log('hej')
    }

    if (error) {
      console.log(error)
    }
    router.refresh()
  }

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </form>
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  )
}

export default Login
