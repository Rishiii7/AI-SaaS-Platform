import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

export default function LandingPage() {
  return (
    <>
      <div className="">
        <LandingNavbar />
        <LandingHero />
      </div>
    </>
  );
}
