// components/HowItWorks.jsx
import React from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Image",
      description:
        "Simply drag and drop your base image or choose from our stock library. Our AI will analyze the content and context automatically.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
      highlight: "Instant Analysis",
    },
    {
      number: "02",
      title: "AI Magic Happens",
      description:
        "Our advanced AI generates multiple thumbnail variations, optimizing text placement, colors, and visual hierarchy for maximum click-through rates.",
      icon: (
        <svg
          className="w-8 h-8 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      highlight: "Smart Optimization",
    },
    {
      number: "03",
      title: "Download & Share",
      description:
        "Choose your favorite design, make final tweaks if needed, and export in the perfect format for your platform. Ready to boost your engagement!",
      icon: (
        <svg
          className="w-8 h-8 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      highlight: "Multiple Formats",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Works
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Transform your content into scroll-stopping thumbnails in just three
            simple steps. No design experience required – our AI does the heavy
            lifting.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <Card className="bg-neutral-800/50 border-neutral-700 backdrop-blur-sm h-full hover:bg-neutral-800/70 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:border-neutral-600">
                <CardContent className="p-8 text-center relative">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon container */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
                      {step.highlight}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-neutral-300 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>

              {/* Connecting Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-6 xl:-right-8 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.3 }}
                >
                  <div className="relative">
                    <svg
                      className="w-12 h-8 text-neutral-600 group-hover:text-blue-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 12"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 6H6m12 0l-4-4m4 4l-4 4"
                      />
                    </svg>
                    {/* Animated dot */}
                    <motion.div
                      className="absolute top-1/2 left-2 w-2 h-2 bg-blue-400 rounded-full transform -translate-y-1/2"
                      animate={{
                        x: [0, 32, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-neutral-400 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Average generation time: 15 seconds
            </span>
          </motion.div>

          <p className="text-lg text-neutral-300">
            Ready to create thumbnails that convert?{" "}
            <motion.span
              className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Get started for free
            </motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
