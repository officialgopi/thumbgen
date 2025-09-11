import Nav from "../components/Nav.tsx";
import Hero from "../components/Hero.tsx";
import Features from "../components/Features.tsx";
import HowItWorks from "../components/HowItWorks.tsx";
import Pricing from "../components/Pricing.tsx";
import Testimonials from "../components/Testimonials.tsx";
import Footer from "../components/Footer.tsx";

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
