"use client";

import Footer from "@/components/common/Footer";
import BenefitsSection from "@/views/home/BenefitSection";
import FAQSection from "@/views/home/FaqSection";
import HeroSection from "@/views/home/HeroSection";
import HowItWorksSection from "@/views/home/HowitworksSection";
import ProblemSection from "@/views/home/ProblemSection";
import ShiftSection from "@/views/home/ShiftSection";
import SolutionSection from "@/views/home/SolutionSection";

export default function Home() {
    return (
        <main className="bg-white">
            <HeroSection />
            <ShiftSection />
            <ProblemSection />
            <SolutionSection />
            <BenefitsSection />
            <HowItWorksSection />
            <FAQSection />
            <Footer />
        </main>
    );
}
