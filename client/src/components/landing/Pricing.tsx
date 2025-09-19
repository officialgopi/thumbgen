// components/Pricing.jsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "5 thumbnails per month",
        "Basic AI templates",
        "720p exports",
        "Email support",
        "Basic customization",
      ],
      cta: "Start Free",
      popular: false,
      variant: "outline",
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For content creators",
      features: [
        "Unlimited thumbnails",
        "Advanced AI models",
        "4K exports",
        "Priority support",
        "Custom branding",
        "A/B testing",
        "Analytics dashboard",
      ],
      cta: "Start Pro Trial",
      popular: true,
      variant: "default",
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      description: "For agencies and teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Brand guidelines",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "White-label options",
      ],
      cta: "Contact Sales",
      popular: false,
      variant: "outline",
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Simple
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Pricing
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and upgrade as
            you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full ${
                  plan.popular
                    ? "bg-gradient-to-b from-neutral-800 to-neutral-900 border-blue-500 shadow-2xl shadow-blue-500/20"
                    : "bg-neutral-800/50 border-neutral-700"
                } backdrop-blur-sm hover:bg-neutral-800/70 transition-colors duration-300`}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-neutral-400 mb-6">{plan.description}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-neutral-400">{plan.period}</span>
                    </div>

                    <Button
                      className={
                        plan.variant === "default"
                          ? "w-full bg-blue-600 hover:bg-blue-700 text-white"
                          : "w-full border-neutral-600 text-neutral-200 hover:bg-neutral-700"
                      }
                      variant={plan.variant as any}
                    >
                      {plan.cta}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-400">
            All plans include our core AI features and regular updates.{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline">
              View detailed comparison
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
