"use client";

import GetAppButton from "@/components/common/GetAppButton";
import { H3, P, PSm, Sh0 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import { Backpack01Icon, NewReleasesIcon, PaintBoardIcon, TShirtIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function CategoriesSection() {
    const stepCards = [
        {
            icon: TShirtIcon,
            title: "Fashion & Apparel",
            description: "Clothing, outfits, and fashion products you can showcase live",
        },
        {
            icon: PaintBoardIcon,
            title: "Beauty & Skincare",
            description: "Makeup, skincare, and grooming products you can demonstrate.",
        },
        {
            icon: Backpack01Icon,
            title: "Accessories",
            description: "Watches, Bags, sunglasses, and everyday style accessories.",
        },
        {
            icon: NewReleasesIcon,
            title: "Small Brand Products",
            description: "Products from small businesses, independent brands & Handmade products.",
        },
    ];

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/media/host/packages.svg" alt="pot-icon" height={140} width={80} className="hidden md:block absolute top-28 left-6 deco-float-3" />
                <Image src="/media/host/shoes.svg" alt="" height={66} width={174} className="hidden md:block absolute top-50 lg:top-85 right-5 lg:right-9 deco-float-4" />
                <Image src="/media/host/Group 34.svg" alt="" height={55} width={204} className="hidden md:block absolute bottom-2 left-0 deco-float-4" />

                <div className="max-w-220 mx-auto relative">
                    {/* Tag centered */}
                    <Badge>Categories to sell</Badge>
                    <H3 className="text-center text-grad mt-4 w-full md:w-142.25 mx-auto">What Can You Sell On Bazo</H3>

                    {/* Steps */}
                    <div className="mt-8 lg:mt-14 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-0 2xl:px-22">
                        {stepCards.map((item, i) => (
                            <div key={i} className="bg-background rounded-[20px] overflow-hidden p-3">
                                <div className="flex-1 space-y-2">
                                    <div className="border bg-accent rounded-full p-1.5 h-8 w-8 text-center">
                                        <HugeiconsIcon icon={item.icon} size={18} />
                                    </div>
                                    <Sh0>{item.title}</Sh0>
                                    <P className="font-normal">{item.description}</P>
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