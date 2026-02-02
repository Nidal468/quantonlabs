import { useState } from 'react';
import { Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="bg-[#041227]/50 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Have questions about Quanton OS? Our team is ready to help.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Email Us",
            description: "We typically respond within 24 hours",
            icon: <Mail className="w-5 h-5" />
          },
          {
            title: "Book a Demo",
            description: "Schedule time with our team to see Quanton OS in action",
            icon: <Calendar className="w-5 h-5" />
          }
        ].map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {contact.icon}
              </div>
              <h3 className="text-xl font-semibold">{contact.title}</h3>
            </div>
            <p className="text-slate-300">{contact.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-md mx-auto mt-8">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Contact Form
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className='text-white'>How would you like to contact us?</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <motion.a
                href="mailto:contact@quantonlabs.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-3 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center gap-2 text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send us an email
              </motion.a>
              <motion.a
                href="https://calendly.com/quantonlabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center gap-2 text-slate-300 hover:bg-slate-700/70 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Book a demo
              </motion.a>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ContactSection;
