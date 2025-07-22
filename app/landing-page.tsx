import React from "react";
import HeroSectionOne from "../components/ui/hero-section-demo-1";
import PricingSection from "../components/ui/pricing-section";
import FaqSection from "../components/ui/faq-section";
import Footer from "../components/ui/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      {/* Hero Section */}
      <section id="hero">
        <HeroSectionOne />
      </section>
      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>
      {/* FAQ Section */}
      <section id="faq">
        <FaqSection />
      </section>
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </main>
  );
} 