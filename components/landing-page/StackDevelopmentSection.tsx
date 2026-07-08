"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Network, 
  Cloud, 
  Zap, 
  Shield,
  Layers,
  Terminal,
  Globe,
  Lock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Activity,
  TrendingUp,
  Clock,
  Users,
  Zap as ZapIcon
} from "lucide-react";

const stacks = [
  {
    icon: Code2,
    title: "Next.js",
    description: "Modern React framework with server-side rendering and static site generation for blazing-fast performance.",
    customerBenefit: "Your customers experience instant page loads and seamless navigation, reducing bounce rates and increasing conversions. Google rewards your fast site with better search rankings.",
    useCases: ["SEO-optimized landing pages", "Dynamic product catalogs", "Real-time content updates"],
    tags: ["App Router", "Server Components", "SSR", "Static Generation"],
    color: "from-white to-gray-200",
  },
  {
    icon: Server,
    title: "Node.js",
    description: "Scalable backend infrastructure with Express.js for high-performance API development and microservices.",
    customerBenefit: "Handle 10x more customer requests without infrastructure upgrades. Your sales team can access real-time data during critical moments, never missing a closing opportunity.",
    useCases: ["High-volume API endpoints", "Microservices architecture", "Real-time data processing"],
    tags: ["REST APIs", "Microservices", "WebSocket", "Cluster Mode"],
    color: "from-green-400 to-green-600",
  },
  {
    icon: Database,
    title: "MongoDB",
    description: "Flexible NoSQL database for storing unstructured data with powerful aggregation pipelines.",
    customerBenefit: "Store any customer data—structured or unstructured—without database redesigns. Your marketing team gets instant access to customer behavior insights for hyper-personalized campaigns.",
    useCases: ["Customer behavior tracking", "Real-time analytics", "Flexible schema evolution"],
    tags: ["Document Store", "Atlas", "Change Streams", "Full-Text Search"],
    color: "from-green-500 to-emerald-700",
  },
  {
    icon: Cpu,
    title: "AI & ML",
    description: "Advanced artificial intelligence with OpenRouter integration for intelligent agent orchestration.",
    customerBenefit: "Your business operates 24/7 with intelligent agents that learn from every interaction. Customer service costs drop 60% while satisfaction scores climb—agents handle complex issues while AI manages routine queries.",
    useCases: ["Predictive analytics", "Customer sentiment analysis", "Automated decision-making"],
    tags: ["LLM Integration", "Agent Orchestration", "Prompt Engineering", "RAG"],
    color: "from-purple-500 to-indigo-700",
  },
  {
    icon: Network,
    title: "API Integration",
    description: "Seamless connectivity with 200+ platforms via robust REST APIs and webhooks.",
    customerBenefit: "Connect your existing tools—CRM, ERP, email, and more—in hours, not weeks. Your operations team stops manual data entry, reducing errors and freeing up 15+ hours weekly.",
    useCases: ["Salesforce sync", "Shopify integration", "Slack notifications", "Email automation"],
    tags: ["REST", "Webhooks", "OAuth2", "Real-time Sync"],
    color: "from-blue-500 to-cyan-700",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable deployment on modern cloud platforms with automatic scaling and high availability.",
    customerBenefit: "Handle 10x traffic spikes during product launches or viral moments without downtime. Your IT team stops managing servers and focuses on innovation instead.",
    useCases: ["Auto-scaling during peak hours", "Global CDN delivery", "Disaster recovery"],
    tags: ["Vercel", "AWS", "Docker", "Kubernetes"],
    color: "from-orange-400 to-red-600",
  },
  {
    icon: Layers,
    title: "Agent OS",
    description: "Custom-built orchestration layer coordinating multiple AI agents into unified intelligence.",
    customerBenefit: "Eight specialized agents work together like a executive team—governing, sales, marketing, operations—making decisions and taking actions without human intervention.",
    useCases: ["Cross-agent workflow coordination", "Governance and compliance", "Real-time decision making"],
    tags: ["Multi-Agent", "Coordination", "Governance", "Real-time"],
    color: "from-pink-500 to-rose-700",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Enterprise-grade security with authentication, authorization, and data protection.",
    customerBenefit: "Sleep soundly knowing customer data is encrypted end-to-end. Pass audits with ease and maintain compliance with GDPR, HIPAA, and industry standards—no additional effort required.",
    useCases: ["SSO integration", "Role-based access control", "Audit logging", "Data encryption"],
    tags: ["NextAuth", "JWT", "Rate Limiting", "Audit Logs"],
    color: "from-gray-600 to-gray-800",
  },
];

const developmentProcess = [
  {
    step: 1,
    title: "Discovery & Analysis",
    description: "We analyze your business processes and identify automation opportunities.",
    outcome: "Clear roadmap with 3-6 month ROI projections and specific automation targets",
    duration: "2-3 weeks",
    icon: Activity,
  },
  {
    step: 2,
    title: "Architecture Design",
    description: "We design the agent orchestration system and integration architecture.",
    outcome: "Complete technical blueprint with integration maps and agent workflow diagrams",
    duration: "1-2 weeks",
    icon: Layers,
  },
  {
    step: 3,
    title: "Development & Integration",
    description: "Our team builds and integrates the Quanton OS with your existing stack.",
    outcome: "Fully functional system with 200+ integrations and custom agent configurations",
    duration: "4-8 weeks",
    icon: Code2,
  },
  {
    step: 4,
    title: "Deployment & Training",
    description: "We deploy the system and train your team on using and managing it.",
    outcome: "Live system with 99.9% uptime and your team certified to manage the platform",
    duration: "1-2 weeks",
    icon: Zap,
  },
];

const integrationLogos = [
  { name: "Salesforce", category: "CRM" },
  { name: "Shopify", category: "E-commerce" },
  { name: "Slack", category: "Communication" },
  { name: "HubSpot", category: "Marketing" },
  { name: "Zapier", category: "Automation" },
  { name: "Google Workspace", category: "Productivity" },
  { name: "Microsoft 365", category: "Productivity" },
  { name: "Stripe", category: "Payments" },
  { name: "Twilio", category: "Communications" },
  { name: "Zoom", category: "Video" },
  { name: "Notion", category: "Documentation" },
  { name: "Jira", category: "Project Management" },
];

const performanceMetrics = [
  { label: "99.9%", sublabel: "System Uptime", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "200+", sublabel: "Integrations", icon: Network, color: "text-blue-500" },
  { label: "60%", sublabel: "Support Cost Reduction", icon: Users, color: "text-purple-500" },
  { label: "15+ hrs", sublabel: "Weekly Time Saved", icon: Clock, color: "text-amber-500" },
  { label: "4.9/5", sublabel: "Customer Satisfaction", icon: TrendingUp, color: "text-pink-500" },
  { label: "24/7", sublabel: "AI Agent Availability", icon: ZapIcon, color: "text-orange-500" },
];

export default function StackDevelopmentSection() {
  const [expandedStack, setExpandedStack] = useState<string | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<number | null>(null);

  const toggleStack = (title: string) => {
    setExpandedStack(expandedStack === title ? null : title);
  };

  const toggleProcess = (step: number) => {
    setExpandedProcess(expandedProcess === step ? null : step);
  };

  return (
    <section id="stacks" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Animated connection lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" 
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase">Our Stack</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Intelligence</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A modern technology stack designed for scale, performance, and AI-powered automation.
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-24"
        >
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className={`flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-lg bg-white/5`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.label}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{metric.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {stacks.map((stack, index) => {
            const IconComponent = stack.icon;
            const isExpanded = expandedStack === stack.title;
            
            return (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stack.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                
                <div className="relative z-10">
                  <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors w-fit">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{stack.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                    {stack.description}
                  </p>
                  
                  {/* Customer Benefit */}
                  <div className="mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      <span className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider">Customer Benefit</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {stack.customerBenefit}
                    </p>
                  </div>
                  
                  {/* Use Cases */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                      <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider">Use Cases</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.useCases.slice(0, 2).map((useCase) => (
                        <span
                          key={useCase}
                          className="px-2 py-1 rounded-md text-[9px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {useCase}
                        </span>
                      ))}
                      {stack.useCases.length > 2 && (
                        <button
                          onClick={() => toggleStack(stack.title)}
                          className="px-2 py-1 rounded-md text-[9px] font-medium bg-white/5 text-gray-400 hover:bg-white/10 transition-colors"
                        >
                          {isExpanded ? "Show less" : `+${stack.useCases.length - 2} more`}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Use Cases */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 mt-2">
                        {stack.useCases.slice(2).map((useCase) => (
                          <div key={useCase} className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-1 h-1 rounded-full bg-purple-500" />
                            {useCase}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/5">
                    {stack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-[9px] font-medium bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Integration Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-3">Seamlessly Connects With</h3>
            <p className="text-gray-400">Over 200 platforms integrated and ready to use</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {integrationLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              >
                <div className="text-xs font-semibold text-gray-300 mb-1">{logo.name}</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-wider">{logo.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How We <span className="text-blue-400">Develop</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our proven process ensures successful implementation and long-term success.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30 hidden sm:block" />
            
            <div className="space-y-8">
              {developmentProcess.map((item, index) => {
                const ProcessIcon = item.icon;
                const isExpanded = expandedProcess === item.step;
                
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
                  >
                    {/* Content */}
                    <div className="flex-1 pl-12 sm:pl-0 sm:px-8">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                            {item.step}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                              Step {item.step}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                          <ProcessIcon className="w-5 h-5 text-purple-400 mt-0.5" />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                        </div>
                        
                        {/* Outcome */}
                        <div className="rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-3 mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">What You Get</span>
                          </div>
                          <p className="text-xs text-gray-300">{item.outcome}</p>
                        </div>
                        
                        <button
                          onClick={() => toggleProcess(item.step)}
                          className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3 h-3" />
                              Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" />
                              View details
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Center dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-blue-500 z-10 hidden sm:block" />
                    
                    {/* Empty space for other side */}
                    <div className="flex-1 hidden sm:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-sm text-gray-500 font-mono tracking-wider uppercase">
            // Modern Stack · Enterprise Grade · AI Powered
          </p>
        </motion.div>
      </div>
    </section>
  );
}