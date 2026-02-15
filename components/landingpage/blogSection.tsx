import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const BlogSection = () => (
    <Section id="blog" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Explore our latest articles on business architecture and AI integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Building Scalable Business Systems",
            excerpt: "How to create architectures that grow with your company instead of constraining it.",
            date: "May 15, 2025"
          },
          {
            title: "The Future of AI in Operations",
            excerpt: "Exploring how intelligent agents are transforming day-to-day business operations.",
            date: "June 2, 2025"
          }
        ].map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
            <p className="text-slate-300 mb-3">{article.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">{article.date}</span>
              <Button variant="link" size="sm" className="px-0 text-white">
                Read more
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );