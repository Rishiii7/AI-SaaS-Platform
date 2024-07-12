import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from "@/components/ui/progress"
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModel } from '@/hooks/use-pro-model';


export const FreeCounter = ({
    apiLimitCount
}: {
    apiLimitCount: number
}) => {
    const [mounted, setMounted] = useState(false);

    const proModel = useProModel();

    useEffect( () => {
        setMounted(true);
    },[]);

    if( !mounted) {
        return null;
    }

  return (
    <>
        <div className='text-white px-3 mb-3'>
            <Card className='bg-white/10 border-0'>
                <CardContent className='py-6'>
                    <div className='text-center text-sm text-white mb-4 space-y-2'>
                        <p>
                            { apiLimitCount } / { MAX_FREE_COUNTS } Free generations
                        </p>
                        <Progress 
                            value={apiLimitCount * 20 }
                            className='[&>*]:bg-gradient-to-r from-[#FF4500] to-[#6666FF] h-3'
                        />
                    </div>
                    <Button 
                        className='w-full bg-gradient-to-r from-[#FF4500] to-[#6666FF] border-0'
                        onClick={proModel.onOpen}
                    >
                        Upgrade to Pro
                        <Zap className=' h-4 w-4 ml-4'/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>
  )
}
