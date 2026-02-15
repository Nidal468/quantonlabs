import { Section } from "./sectionProvider";

export const FounderSection = () => (
    <Section id="founder" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Founder & Managing Director</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Ryan Remington
            </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Container */}
            <div className="flex justify-center">
                <div className="relative w-full max-w-md h-[500px] rounded-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-slate-700" />
                    <img
                        src={'/images/founder.png'}
                        alt="Ryan Remington - Founder & Managing Director of Quanton Labs"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                </div>
            </div>

            {/* Bio Content */}
            <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-semibold mb-6 text-white">Ryan Remington</h3>
                <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">
                        Ryan Remington is the founder and Managing Director of Quanton Labs, where he drives the strategic vision and oversees the development of Quanton OS. He identified a recurring challenge in growing small and mid-sized businesses: as organizations expand, leaders struggle with fragmented systems, context switching, time pressures, and information overload. More technology and automation often add complexity rather than clarity.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        Through hands-on operational experience and strategic consulting with service-based and luxury businesses, Ryan realized the core issue was the absence of a structured operating system to align strategy, execution, and intelligence. Quanton Labs addresses this gap by delivering cohesive operating environments that prioritize disciplined execution, decision clarity, and scalable growth.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        Ryan holds an MBA from The Citadel and a BSc in Organizational Leadership and Communication with Honors from Marist College. A dual UK-US citizen and fluent in Spanish, he brings a global perspective to domestic operational challenges.
                    </p>
                </div>
            </div>
        </div>
    </Section>
);