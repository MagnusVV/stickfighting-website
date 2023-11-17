'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const LogoutBtn = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleClick = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    }

    router.push('/')
  }
  return (
    <>
      <button onClick={handleClick}>Logga ut</button>
    </>
  )
}

export default LogoutBtn
