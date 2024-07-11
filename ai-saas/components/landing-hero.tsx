"use client";
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from './ui/button';


export const LandingHero = () => {

    const {isSignedIn} = useAuth();
  return (
    <div className='text-white font-bold py-36 text-center space-y-4'>
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
            <h1>
                Unleash the Power of AI to Your Business for
            </h1>
            <div className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#6666FF]'>
                <TypewriterComponent
                    options={{
                        strings: [
                            "Chatbot.",
                            "Music Generation.",
                            "Image Generation.",
                            "Code Generation.",
                            "Video Generation.",
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
        </div>
        <div className='text-sm md:text-xl text-zinc-400 font-light'>
            Our AI SaaS platform offers a comprehensive suite of tools and features to help you harness the power of AI for your business. 
        </div>
        <div>
            <Link
                href={ isSignedIn ? "/dashboard" : "/sign-up" }
                >
                <Button 
                    variant={"destructive"}
                    className='md:text-lg p-4 md:p-6 rounded-full font-semibold  bg-gradient-to-r from-[#FF4500] to-[#6666FF]'
                    >
                    Start Generating for free
                </Button>
            
            </Link>
        </div>
    </div>
  )
}
