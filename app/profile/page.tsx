"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const Profile = () => {
  const { data: session } = authClient.useSession();

  if(!session){
    return
  }

  const name = session?.user.name;
  const initial = name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
  return (
    <div className='w-full h-screen'>
      <div className='max-w-[70%] p-10 my-10 rounded-2xl h-[30%] bg-gray-950 m-auto'>
          <Avatar className='w-20 h-20 cursor-pointer'>
            <AvatarImage src={""}/>

            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
      </div>
    </div>
  )
}

export default Profile
