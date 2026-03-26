'use client'
import GetAppButton from "@/components/common/GetAppButton";
import { H3, P, PSm, Sh0, Sh1 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Slider, { SliderItem } from "@/components/ui/Slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Agreement02Icon, CheckmarkBadge01Icon, IdVerifiedIcon, LiveStreaming02Icon, RunningShoesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const stepCards = [
    {
        icon: CheckmarkBadge01Icon,
        title: "Content Creators",
        description: "You already create content and have an audience that watches you regularly.",
    },
    {
        icon: RunningShoesIcon,
        title: "Product Creators",
        description: "You make or curate products and want to showcase them live.",
    },
    {
        icon: Agreement02Icon,
        title: "Community Builders",
        description: "People trust your recommendations and enjoy interacting with you.",
    },
    {
        icon: LiveStreaming02Icon,
        title: "Live Stream Ready",
        description: "You are comfortable going live and presenting products in real time.",
    },
    {
        icon: IdVerifiedIcon,
        title: "Trusted & Authentic",
        description: "Creators on Bazo are verified to ensure buyers trust what they see.",
    },
];
export default function EligibleSection() {
    const isMobile = useIsMobile()
    const isTablet = useIsMobile(1024)

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto bg-background rounded-3xl md:rounded-[36px] py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/media/host/packages.svg" alt="pot-icon" height={140} width={80} className="hidden md:block absolute top-28 left-6 deco-float-3" />
                <Image src="/media/host/skate boards.svg" alt="" height={112} width={63} className="hidden md:block absolute bottom-2 left-0 deco-float-4" />
                <Image src="/media/host/shoes.svg" alt="" height={66} width={174} className="hidden md:block absolute top-50 lg:top-85 right-2 lg:right-2 deco-float-4" />

                <div className="max-w-220 mx-auto relative">
                    {/* Tag centered */}
                    <Badge>Eligible</Badge>
                    <H3 className="text-center text-grad mt-4">Who Can Sell On Bazo</H3>
                    <Sh1 className="text-center w-full md:w-[60%] mx-auto mt-4">Bazo is built for creators who can influence and engage an audience.</Sh1>

                    {/* Slider */}
                    <Slider gap={24} arrows dots={false} autoPlay={5000} itemsToShow={isMobile ? 1 : 3.5} step={1} className="mt-8 md:mt-14">
                        {stepCards.map((item, i) => (
                            <div key={i} className="bg-white rounded-[20px] overflow-hidden p-3">
                                <div className="flex-1 space-y-2">
                                    <div className="border bg-accent rounded-full p-1.5 h-8 w-8 text-center">
                                        <HugeiconsIcon icon={item.icon} size={18} />
                                    </div>
                                    <Sh0>{item.title}</Sh0>
                                    <P className="font-normal">{item.description}</P>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Get App Button */}
                <div className="hidden md:block absolute bottom-5 right-5">
                    <GetAppButton />
                </div>
            </div>
        </section>
    );
}