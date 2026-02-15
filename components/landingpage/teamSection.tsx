import { motion } from "framer-motion";
import { Section } from "./sectionProvider";

export const TeamSection = () => (
    <Section id="team" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          The people behind Quanton OS - experts in business architecture and AI integration.
        </p>
      </div>

      <div className="flex items-center justify-center max-w-6xl mx-auto gap-20">
        {[
          {
            "name": "Abu Saleh",
            "role": "Lead Software Engineer",
            "bio": "AI systems architect with experience in enterprise automation platforms and software development."
          },
          {
            "name": "Abu Saeed",
            "role": "Graphics Designer",
            "bio": "Creative designer specializing in digital graphics, branding, and visual storytelling."
          }
        ]
          .map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-purple-600 mb-4 overflow-hidden">
                <img src={'/images/space.png'} className="w-full h-full object-cover object-center" alt={member.name}/>
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-blue-400 text-sm">{member.role}</p>
              <p className="text-slate-400 text-sm mt-2 max-w-[250px]">{member.bio}</p>
            </motion.div>
          ))}
      </div>
    </Section>
  );