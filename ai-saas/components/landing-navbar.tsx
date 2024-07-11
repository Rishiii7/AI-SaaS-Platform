"use client";

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const font = Montserrat({
  weight: '600',
  subsets: ['latin'],
})


export const LandingNavbar = () => {

  const { isSignedIn } = useAuth();

  return (
    <nav className='text-white p-4 bg-transparent flex items-center justify-between'>
        {/* LandingNavbar */}
        <Link href={"/"} className='flex items-center'>
          <div className=' relative h-10 w-10 mr-4 '>
            <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
          </div>
          <h1 className={cn('text-2xl font-bold', font.className)}>
            Inspire AI
          </h1>
        </Link>
        <div className='flex items-center'>
          <Link
            href={ isSignedIn ? "/dashboard" : "/sign-up"}
          >
            <Button
              variant={"outline"}
              className='text-black rounded-full'
            >
              Get Started
            </Button>
          
          </Link>
        </div>

    </nav>
  )
}
