"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Users, TrendingUp, Award } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "VP of Operations",
    company: "TechFlow Inc.",
    content: "Quanton OS has completely transformed how we manage our operations. The agent orchestration is seamless and the ROI was visible within the first month.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "ScaleScale",
    content: "The AI-powered automation has reduced our operational costs by 40%. The governing agent is particularly impressive in handling complex workflows.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Director of Customer Success",
    company: "SupportFlow",
    content: "Our customer satisfaction scores have increased by 35% since implementing Quanton OS. The CX agents are incredibly intelligent and responsive.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=ec4899&color=fff",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Founder & CEO",
    company: "GrowthLabs",
    content: "Building our own automation infrastructure would have taken years. Quanton OS delivered enterprise-grade capabilities in just weeks.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=David+Kim&background=10b981&color=fff",
  },
  {
    id: "5",
    name: "Jessica Williams",
    role: "COO",
    company: "Enterprise Solutions",
    content: "The most impressive part is how the system learns and adapts over time. It's like having an entire team of experts working 24/7.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Jessica+Williams&background=f59e0b&color=fff",
  },
  {
    id: "6",
    name: "Robert Taylor",
    role: "Head of Innovation",
    company: "FutureTech",
    content: "We've integrated Quanton OS with our existing stack and the results have been remarkable. Highly recommended for any scaling business.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Robert+Taylor&background=3b82f6&color=fff",
  },
];

const stats = [
  { icon: Users, label: "Active Customers", value: "500+" },
  { icon: TrendingUp, label: "Automation Rate", value: "95%" },
  { icon: Award, label: "Customer Satisfaction", value: "4.9/5" },
];

export default function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Innovative Companies</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Join hundreds of businesses that have transformed their operations with Quanton OS.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center hover:border-blue-300 transition-all"
            >
              <div className="mx-auto w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-lg shadow-gray-100/50">
                  <Quote className="w-12 h-12 text-blue-100 mb-6" />
                  
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
                    "{reviews[currentReview].content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={reviews[currentReview].avatar}
                      alt={reviews[currentReview].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{reviews[currentReview].name}</div>
                      <div className="text-sm text-gray-500">
                        {reviews[currentReview].role} at {reviews[currentReview].company}
                      </div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < reviews[currentReview].rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Review Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentReview ? 1 : -1);
                  setCurrentReview(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentReview ? "w-8 bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-400 font-mono tracking-wider uppercase">
            // 500+ companies · 95% retention rate · 4.9/5 average rating
          </p>
        </motion.div>
      </div>
    </section>
  );
}