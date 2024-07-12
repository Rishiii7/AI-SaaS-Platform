"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from '@/components/sidebar';
  
import { Menu } from 'lucide-react';

const MobileSidebar = ({
    apiLimitCount=0
} : {
    apiLimitCount : number
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect( () => {
        setIsMounted(true);
    }, []);

    if ( !isMounted ){
        return null;
    }
    
  return (
    <>
    {/* { apiLimitCount } */}
        <Sheet>
            <SheetTrigger asChild>
                <Button 
                    variant={"ghost"}
                    size={"icon"}
                    className=' md:hidden'
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className='p-0'>
                <Sidebar 
                    apiLimitCount={apiLimitCount}
                />
            </SheetContent>
        </Sheet>
    </>
  )
}

export default MobileSidebar;