
import { UserButton } from '@clerk/nextjs'


import MobileSidebar from '@/components/mobile-sidebar'

export const Navbar = ({
  apiLimitCount=0
} : {
  apiLimitCount : number
}) => {
  return (
    <> 
        <div className=' flex items-center p-4'>
          {/* { apiLimitCount } */}
            <MobileSidebar 
              apiLimitCount={apiLimitCount}
            />
            <div className='flex w-full justify-end'>
                <UserButton 
                    afterSwitchSessionUrl='/'
                />
            </div>
            
        </div>
    </>
  )
}
