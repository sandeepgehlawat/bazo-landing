"use client";

import FAQSection from "@/components/common/FaqSection";
import BenefitsSection from "@/views/home/BenefitSection";
import CTASection from "@/views/home/CtaSection";
import HeroSection from "@/views/home/HeroSection";
import HowItWorksSection from "@/views/home/HowitworksSection";
import ProblemSection from "@/views/home/ProblemSection";
import ShiftSection from "@/views/home/ShiftSection";
import SolutionSection from "@/views/home/SolutionSection";
import { ReactLenis } from "lenis/react";

export default function Home() {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.2,
                smoothWheel: true,
            }}
        >
            <main className="bg-white">
                <HeroSection />
                <ShiftSection />
                <ProblemSection />
                <SolutionSection />
                <BenefitsSection />
                <HowItWorksSection />
                <FAQSection type="user"/>
                <CTASection/>
            </main>
        </ReactLenis>
    );
}
