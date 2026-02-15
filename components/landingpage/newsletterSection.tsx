import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const NewsletterSection = () => (
    <Section id="newsletter" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Subscribe to our newsletter for the latest articles and updates.
            </p>
        </div>

        <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    placeholder="Your email address"
                    className="grow px-4 py-3 rounded-lg bg-white/10 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="default" className="px-6">
                    Subscribe
                </Button>
            </div>
        </div>
    </Section>
);