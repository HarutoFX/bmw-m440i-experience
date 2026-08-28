import Navbar from '@/components/layout/Navbar'
import HeroContent from '@/components/ui/HeroContent'
import SpecsBar from '@/components/ui/SpecsBar'
import DynamicHeroScene from '@/components/canvas/DynamicHeroScene'
import PerformanceSection from '@/components/ui/PerformanceSection'
import DesignSection from '@/components/ui/DesignSection'
import TechnologySection from '@/components/ui/TechnologySection'
import ConfigureSection from '@/components/ui/ConfigureSection'
import FinalCtaSection from '@/components/ui/FinalCtaSection'

/**
 * Home — The main landing page of the BMW M440i 3D experience.
 *
 * This is a Server Component. It renders the static shell and layout,
 * while delegating interactive WebGL content to DynamicHeroScene —
 * a Client Component that handles the dynamic() + ssr:false pattern.
 *
 * In Next.js 16, dynamic() with ssr:false is restricted to Client Components only.
 * The DynamicHeroScene wrapper satisfies this constraint.
 *
 * Page structure:
 * ┌────────────────────────────────────────────────────────┐
 * │ <Navbar />            — fixed, glass morphism          │
 * │ <section id="overview"> — 100dvh hero                  │
 * │   <DynamicHeroScene /> — Client CC → WebGL canvas     │
 * │   <HeroContent />      — overlaid text + CTAs          │
 * │   <SpecsBar />         — bottom performance strip      │
 * │ </section>                                              │
 * └────────────────────────────────────────────────────────┘
 */
export default function Home() {
  return (
    <main>
      <Navbar />

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section
        id="overview"
        className="relative w-full h-[100dvh] overflow-hidden"
        aria-label="BMW M440i 3D Showcase"
      >
        {/* Radial gradient background fallback */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 60% 40%, #1a0505 0%, #050505 60%, #000000 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── WebGL 3D Canvas ─────────────────────────────────── */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <DynamicHeroScene />
        </div>

        {/* ── Subtle noise grain overlay ──────────────────────── */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
          aria-hidden="true"
        />

        {/* ── Text overlay ────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex items-stretch">
          <HeroContent />
        </div>

        {/* ── Bottom specs strip ──────────────────────────────── */}
        <SpecsBar />
      </section>

      {/* ── Performance Section ─────────────────────────────────── */}
      <PerformanceSection />

      {/* ── Design Section ──────────────────────────────────────── */}
      <DesignSection />

      {/* ── Technology Section ──────────────────────────────────────── */}
      <TechnologySection />

      {/* ── Configure Section ───────────────────────────────────────── */}
      <ConfigureSection />

      <FinalCtaSection />
    </main>
  )
}
