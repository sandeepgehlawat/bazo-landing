import GetAppButton from "@/components/common/GetAppButton";
import { H2, H3, P, Sh0 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function BenefitsSection() {
    const benefitCards = [
        {
            image: "/media/benifit-1.svg",
            title: "Live = Real",
            description: "If it looks bad, it shows. Nothing is hidden.",
        },
        {
            image: "/media/benifits-2.svg",
            title: "Buy From People You Trust",
            description: "Creators you follow. Not faceless brands.",
        },
        {
            image: "/media/benifits-3.svg",
            title: "Shop While You Scroll",
            description: "Entertainment and shopping in one flow.",
        },
        {
            image: "/media/benifits-4.svg",
            title: "Interactive Buying",
            description: "React. Comment. Influence what gets shown next.",
        },
        {
            image: "/media/benifits-5.svg",
            title: "100s of Live Stores at Once",
            description: "Jump between creators instantly.",
        },
        {
            image: "/media/benifits-6.svg",
            title: "Limited Drops & Real-Time Hype",
            description: "See products sell out live.",
        }
    ];

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto rounded-3xl md:rounded-[36px] py-10 md:py-19 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/pot.svg" alt="pot-icon" height={140} width={76} className="hidden md:block absolute top-25 left-8" />
                <Image src="/images/cup.svg" alt="cut-icon" height={98} width={56} className="hidden md:block absolute top-100 right-8" />

                <div className="max-w-220 mx-auto relative">
                    <div className="w-fit mx-auto"><Badge>Benefits</Badge></div>
                    <H3 className="text-center text-grad mt-4 w-full md:w-[60%] mx-auto">A Better Way To Discover. Decide. Buy.</H3>
                    {/* Benefits Grid */}
                    <div className="mt-8 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {benefitCards.map((item, i) => (
                            <div key={i} className="rounded-xl overflow-hidden bg-background p-3">
                                <Image src={item.image} alt={`benefits-${i}`} height={260} width={250} />
                                <div className="mt-4 gap-1">
                                    <Sh0>{item.title}</Sh0>
                                    <P className="font-medium">{item.description}</P>
                                </div>
                            </div>
                        ))}
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
