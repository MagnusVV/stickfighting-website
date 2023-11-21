'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'

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
      <Button
        text="Logga ut"
        styling={genericButton}
        onClickEvent={handleClick}
      />
    </>
  )
}

export default LogoutBtn
