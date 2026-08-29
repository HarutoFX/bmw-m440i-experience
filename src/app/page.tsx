import Navbar from '@/components/layout/Navbar'
import HeroContent from '@/components/ui/HeroContent'
import SpecsBar from '@/components/ui/SpecsBar'
import DynamicHeroScene from '@/components/canvas/DynamicHeroScene'
import PerformanceSection from '@/components/ui/PerformanceSection'
import DesignSection from '@/components/ui/DesignSection'
import TechnologySection from '@/components/ui/TechnologySection'
import ConfigureSection from '@/components/ui/ConfigureSection'
import FinalCtaSection from '@/components/ui/FinalCtaSection'

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section
          id="overview"
          className="relative w-full min-h-screen h-[100dvh] overflow-hidden"
          aria-label="BMW M440i 3D Showcase"
        >
          {/* Background fallback */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 60% 40%, #1a0505 0%, #050505 60%, #000000 100%)',
            }}
            aria-hidden="true"
          />

          {/* WebGL Canvas */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <DynamicHeroScene />
          </div>

          {/* Noise Overlay */}
          <div
            className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
            aria-hidden="true"
          />

          {/* Hero Content */}
          <div className="absolute inset-0 z-10 flex items-stretch">
            <HeroContent />
          </div>

          {/* Specs */}
          <SpecsBar />
        </section>

        <PerformanceSection />
        <DesignSection />
        <TechnologySection />
        <ConfigureSection />
        <FinalCtaSection />
      </main>
    </>
  )
}