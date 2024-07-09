
import Link from "next/link";
import { Button } from '@/components/ui/button'
export default function LandingPage() {
  return (
    <>
      <div className="">
        Home Page
        <Link href={"/sign-in"}>        
          <Button>
            Sign in  
          </Button>
        </Link>
        <Link href={"/sign-up"}>        
          <Button>
            Sign up
          </Button>
        </Link>
      </div>
    </>
  );
}
