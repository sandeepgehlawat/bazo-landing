import GetAppButton from "@/components/common/GetAppButton";
import { H3, Sh1 } from "@/components/typography";
import Accordion from "@/components/ui/Accordion";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function FAQSection() {
    const faqs = [
        {
            title: "Are sellers verified?",
            content: "yes"
        },
        {
            title: "Is Bazo just another shopping app?",
            content: "yes"
        },
        {
            title: "Can I return products?",
            content: "yes"
        },
        {
            title: "Do I need to follow creators to shop?",
            content: "yes"
        },
        {
            title: "Do I need to follow creators to shop?",
            content: "yes"
        }
    ];

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto py-10 md:py-26.5 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/pot.svg" alt="pot-icon" height={140} width={76} className="hidden md:block absolute top-25 left-8" />
                <Image src="/images/cup.svg" alt="cut-icon" height={98} width={56} className="hidden md:block absolute top-100 right-8" />

                <div className="max-w-220 mx-auto relative z-10">
                    <div className="space-y-4 text-center">
                        <Badge>FAQs</Badge>
                        <H3 className="text-grad w-full md:w-[65%] mx-auto">Things You Might Want to Know</H3>
                        <Sh1>Short, simple answers about Bazo</Sh1>
                    </div>

                    {/* FAQ  */}
                    <div className="mt-14 max-w-105 mx-auto">
                        <Accordion items={faqs} />
                    </div>
                </div>

                {/* Get App Button */}
                <div className="hidden md:block absolute bottom-5 right-5">
                    <GetAppButton />
                </div>
            </div>
        </section>
    );
}