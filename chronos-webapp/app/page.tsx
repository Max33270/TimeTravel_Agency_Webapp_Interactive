import { Starfield } from "@/components/starfield"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { DestinationsSection } from "@/components/destinations-section"
import { GallerySection } from "@/components/gallery-section"
import { ReservationSection } from "@/components/reservation-section"
import { ChronosGuide } from "@/components/chronos-guide"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <GallerySection />
      <ReservationSection />
      <ChronosGuide />
      <Footer />
    </main>
  )
}
