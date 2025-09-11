// components/Testimonials.jsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

function Testimonials() {
  const testimonials = [
    {
      quote:
        "ThumbnailAI has completely transformed my YouTube workflow. My click-through rates increased by 300% in just two months!",
      author: "Sarah Chen",
      role: "Tech YouTuber",
      subscribers: "2.5M subscribers",
      avatar: "bg-gradient-to-br from-pink-400 to-red-600",
    },
    {
      quote:
        "As a designer, I was skeptical about AI tools. But this actually creates thumbnails that match my brand perfectly. It's like having a design team at my fingertips.",
      author: "Marcus Rodriguez",
      role: "Content Creator",
      subscribers: "850K subscribers",
      avatar: "bg-gradient-to-br from-blue-400 to-purple-600",
    },
    {
      quote:
        "The time savings are incredible. What used to take me hours now takes minutes. I can focus on creating content instead of spending all day on thumbnails.",
      author: "Emily Park",
      role: "Education Channel",
      subscribers: "1.2M subscribers",
      avatar: "bg-gradient-to-br from-green-400 to-blue-600",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Creators
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Join thousands of content creators who are already creating amazing
            thumbnails with AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="bg-neutral-800/50 border-neutral-700 backdrop-blur-sm h-full hover:bg-neutral-800/70 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <svg
                      className="w-8 h-8 text-blue-400 mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <blockquote className="text-neutral-200 text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center mr-4`}
                    >
                      <span className="text-white font-semibold text-lg">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-neutral-400">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-blue-400">
                        {testimonial.subscribers}
                      </div>
                    </div>
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
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm text-neutral-500">
              Trusted by creators from:
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 rounded"></div>
              <span className="text-neutral-400 font-semibold">YouTube</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded"></div>
              <span className="text-neutral-400 font-semibold">Instagram</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <span className="text-neutral-400 font-semibold">LinkedIn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded"></div>
              <span className="text-neutral-400 font-semibold">TikTok</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
