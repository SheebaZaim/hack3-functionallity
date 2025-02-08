
import CardSection from "@/app/components/CardSection";
// import CategoryShowcase from "@/app/components/CategoryShowcase";
import Featured from "@/app/components/Featured";
import FlightEssentials from "@/app/components/FlightEssentials";
import GearUp from "@/app/components/GearUp";
import HelloNikeApp from "@/app/components/HelloNikeApp";
import Hero from "@/app/components/Hero";
import Navigation from "@/app/components/Navigation";

export default function Home() {
  return (
  <>
  <div className="mt-[99px]">
    <HelloNikeApp/>

    <div className="px-[48px]">
      <Hero/>
    </div>

    <CardSection/>

    <div className="px-[48px]">
      <Featured/>
      <GearUp/>
      <FlightEssentials/>
      {/* <CategoryShowcase/> */}
      <Navigation/>
    </div>
  </div>
  </>
  )
}