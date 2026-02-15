import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const EventsWebinars = () => (
    <Section id="events-webinars" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Events & Webinars</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Join our upcoming events to learn more about Quanton OS.
            </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                {
                    title: "AI in Business Operations",
                    date: "June 20, 2025",
                    time: "10:00 AM PST",
                    description: "Learn how AI is transforming day-to-day business operations."
                },
                {
                    title: "Implementing Quanton OS",
                    date: "July 5, 2025",
                    time: "2:00 PM EST",
                    description: "A hands-on workshop for implementing Quanton OS in your organization."
                }
            ].map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
                >
                    <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="font-semibold">{event.title}</h3>
                    </div>
                    <p className="text-slate-300 mb-2 flex items-center">
                        <span className="mr-2">📅</span> {event.date}
                    </p>
                    <p className="text-slate-300 mb-4 flex items-center">
                        <span className="mr-2">⏰</span> {event.time}
                    </p>
                    <p className="text-slate-300">{event.description}</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                        Register
                    </Button>
                </motion.div>
            ))}
        </div>
    </Section>
);