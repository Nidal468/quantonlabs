import { motion } from "framer-motion";
import { Section } from "./sectionProvider";

 const integrations = [
    {
      name: "Google Workspace",
      icon: <img src="/images/assets/landingpage/google.png" className="w-10 h-10 rounded-md" />
    },
    {
      name: "Slack",
      icon: <img src="/images/assets/landingpage/slack.png" className="w-10 h-10 rounded-md" />
    },
    {
      name: "Zapier",
      icon: <img src="/images/assets/landingpage/zapier.png" className="w-10 h-10 rounded-md" />
    },
    {
      name: "N8N",
      icon: <img src="/images/assets/landingpage/n8n.png" className="w-10 h-10 rounded-md" />
    }
  ];


export const Integrations = () => (
    <Section id="integrations" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrations</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Seamlessly connect with your existing tools and platforms.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {integrations.map((integration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              {integration.icon}
            </div>
            <p className="text-slate-300 text-sm font-medium">
              {integration.name}
            </p>
          </motion.div>
        ))}
      </div>

    </Section>
  );