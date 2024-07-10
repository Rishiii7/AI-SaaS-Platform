import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export const BotAvatar = () => {
  return (
    <>
        <Avatar className='h-10 w-10 bg-black/10 '>
            <AvatarImage src='/logo.png' className='p-1'/>
        </Avatar>
    </>
  )
}
