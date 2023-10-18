import React from 'react'
import LogoutBtn from '@/components/LogoutBtn'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const page = () => {
  // const cookie = cookies()

  // if (!cookie) {
  //   console.log('NO COOKIE!!')
  //   NextResponse.redirect('/')
  // }
  // if (cookie) {
  //   console.log('cookie: ' + cookie)
  // }
  return (
    <div>
      <h1>Welcome Admin</h1>
      <LogoutBtn />
    </div>
  )
}

export default page
