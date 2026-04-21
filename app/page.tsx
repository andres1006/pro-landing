import { HeroSection } from "@/components/hero-section";
import { ChallengeSection } from "@/components/challenge-section";
import { SolutionSection } from "@/components/solution-section";
import { FeaturesSection } from "@/components/features-section";
import { LocalFocusSection } from "@/components/local-focus-section";
import { RegistrationForm } from "@/components/registration-form";
import { Footer } from "@/components/footer";
import { CountdownBanner } from "@/components/countdown-banner";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <CountdownBanner />
      <HeroSection />
      <div className="section-divider" aria-hidden="true" />
      <ChallengeSection />
      <div className="section-divider" aria-hidden="true" />
      <SolutionSection />
      <div className="section-divider" aria-hidden="true" />
      <FeaturesSection />
      <div className="section-divider" aria-hidden="true" />
      <LocalFocusSection />
      <div className="section-divider" aria-hidden="true" />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
