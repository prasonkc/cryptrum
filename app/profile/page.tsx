import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit2 } from 'lucide-react'

const Profile = () => {
  return (
    <div className='w-full h-screen'>
      <div className='max-w-[70%] p-10 my-10 rounded-2xl h-[30%] bg-gray-950 m-auto'>
          <Avatar className='w-20 h-20 bg-black cursor-pointer'>
            <AvatarImage src={""}/>

            <AvatarFallback></AvatarFallback>
          </Avatar>
      </div>
    </div>
  )
}

export default Profile
