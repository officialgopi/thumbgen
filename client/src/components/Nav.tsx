// components/Nav.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { env } from "@/constants/env.constant";
import { useUser } from "@/store/user.store";

function Nav() {
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (method: string) => {
    setShowAuthModal(false);

    if (method === "google") {
      window.location.href = env.server + "/api/v1/auth/google";
    }
  };

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#templates", label: "Templates" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-4 left-4 right-4 z-50 origin-center transition-all duration-700 ease-out mx-auto ${
          scrolled ? "max-w-5xl" : "max-w-full "
        }`}
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={`bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-2xl transition-all duration-700 ${
            scrolled
              ? "shadow-2xl shadow-black/20"
              : "shadow-lg shadow-black/10"
          }`}
          layout
        >
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Brand */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-neutral-950"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-white">
                  ThumbGen
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:flex items-center space-x-4">
                {/* <Button
                  onClick={() => {
                    setShowAuthModal(true);
                  }}
                  variant="ghost"
                  className="text-neutral-400 hover:text-white hover:bg-transparent px-4 py-2 h-auto font-medium transition-colors"
                >
                  Sign in
                </Button> */}
                <Button
                  onClick={() => {
                    if (user) {
                      navigate("/main");
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                  className="bg-white text-neutral-950 hover:bg-neutral-200  px-4 py-2 h-auto rounded-lg font-medium transition-all duration-300"
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden ">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        isMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden border-t border-neutral-800 overflow-y-hidden"
              >
                <div className="px-6 py-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  <div className="pt-4 space-y-2">
                    {/* <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowAuthModal(true);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-800/50 px-4 py-2 h-auto rounded-lg font-medium"
                    >
                      Sign in
                    </Button> */}
                    <Button
                      onClick={() => {
                        if (user) {
                          navigate("/main");
                        } else {
                          setIsMenuOpen(false);
                          setShowAuthModal(true);
                        }
                      }}
                      className="w-full bg-white text-neutral-950 hover:bg-neutral-200 px-4 py-2 h-auto rounded-lg font-medium"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Minimal Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Welcome back
                </h2>
                <p className="text-neutral-400 text-sm">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleLogin("google")}
                  className="w-full bg-white text-neutral-950 hover:bg-neutral-200 py-3 rounded-lg font-medium transition-colors"
                >
                  Continue with Google
                </Button>
                {/* <Button
                  onClick={handleLogin}
                  variant="outline"
                  className="w-full border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800/50 hover:text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Continue with GitHub
                </Button> */}
              </div>

              {/* <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-neutral-800"></div>
                <span className="px-3 text-xs text-neutral-500">OR</span>
                <div className="flex-1 h-px bg-neutral-800"></div>
              </div>

              <Button
                onClick={handleLogin}
                variant="outline"
                className="w-full border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800/50 hover:text-white py-3 rounded-lg font-medium transition-colors"
              >
                Continue with Email
              </Button> */}

              <p className="text-center text-xs text-neutral-500 mt-6">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>

              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
