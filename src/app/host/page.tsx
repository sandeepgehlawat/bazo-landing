import FAQSection from "@/components/common/FaqSection";
import BenefitsSection from "@/views/host/BenefitSection";
import CategoriesSection from "@/views/host/CategoriesSection";
import CTASection from "@/views/host/CtaSection";
import EligibleSection from "@/views/host/EligibleSection";
import HeroSection from "@/views/host/HeroSection";
import HowBezoWorksSection from "@/views/host/HowBezoWorksSection";
import ProblemSection from "@/views/host/ProblemSection";
import ShiftSection from "@/views/host/ShiftSection";
import SolutionSection from "@/views/host/SolutionSection";
import ReactLenis from "lenis/react";

export default function HostPage() {
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
                <EligibleSection />
                <CategoriesSection />
                <HowBezoWorksSection />
                <FAQSection type="host" />
                <CTASection />
            </main>
        </ReactLenis>
    )
}