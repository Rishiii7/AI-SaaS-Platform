import { Navbar } from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import React from 'react'

const DashboardLayout =  async ({
    children,
} : {
    children: React.ReactNode
}) => {

  const apiLimitCount = await getApiLimitCount();

  return (
    <>
        <div className=' h-full relative'>
            <div className='hidden h-full md:flex md:min-w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900 '>
                    <Sidebar 
                      apiLimitCount={apiLimitCount}
                    />
            </div>
             <main className=' md:pl-72'>
                <Navbar 
                  apiLimitCount={apiLimitCount}
                />
                {children}
             </main>
        </div>
    </>
  )
}

export default DashboardLayout