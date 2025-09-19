import Nav from "../components/landing/Nav.tsx";
import Hero from "../components/landing/Hero.tsx";
import Features from "../components/landing/Features.tsx";
import HowItWorks from "../components/landing/HowItWorks.tsx";
import Pricing from "../components/landing/Pricing.tsx";
import Testimonials from "../components/landing/Testimonials.tsx";
import Footer from "../components/landing/Footer.tsx";

function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Landing;
