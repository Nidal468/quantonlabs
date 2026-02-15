import { Section } from "./sectionProvider";

export const RoadmapSection = () => (
    <Section id="roadmap" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Roadmap</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Discover upcoming features and improvements.
            </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-8">
                {[
                    {
                        title: "Q2 2026",
                        description: "Advanced AI agent training and deployment tools"
                    },
                    {
                        title: "Q3 2026",
                        description: "Integration with more third-party platforms"
                    },
                    {
                        title: "Q4 2026",
                        description: "Enhanced performance analytics dashboard"
                    }
                ].map((item, index) => (
                    <div key={index} className="relative flex">
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-slate-300 mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);