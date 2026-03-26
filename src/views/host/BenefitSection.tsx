"use client";

import GetAppButton from "@/components/common/GetAppButton";
import { H3, P, Sh0 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { hostBenefitItems } from "@/utils/constants";

export default function BenefitsSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto rounded-3xl md:rounded-[36px] py-10 md:py-19 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/media/host/packages.svg" alt="pot-icon" height={140} width={80} className="hidden md:block absolute top-28 left-6 deco-float-3" />
                <Image src="/media/host/skate boards.svg" alt="" height={112} width={63} className="hidden md:block absolute bottom-2 left-0 deco-float-4" />
                <Image src="/media/host/shoes.svg" alt="" height={66} width={174} className="hidden md:block absolute top-50 lg:top-85 right-5 lg:right-9 deco-float-4" />

                <div className="max-w-220 mx-auto relative">
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <Badge>Benefits</Badge>
                        <H3 className="text-center text-grad mt-4 w-full md:w-142.25 mx-auto">A Better Way To Sell. Grow. Earn.</H3>
                    </motion.div>
                    {/* Benefits Grid */}
                    <div className="mt-8 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {hostBenefitItems.map((item, i) => (
                            <BenefitCard key={i} item={item} index={i} />
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


function BenefitCard({ item, index, }: {
    item: { image: string; title: string; description: string };
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    // Stagger by grid position: row delay + column delay
    const col = index % 3;
    const row = Math.floor(index / 3);
    const delay = row * 0.15 + col * 0.1;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="rounded-xl overflow-hidden bg-background p-3"
        >
            <Image src={item.image} alt={`benefits-${index}`} height={260} width={250} className="mx-auto"/>
            <div className="mt-4 space-y-1">
                <Sh0>{item.title}</Sh0>
                <P className="font-medium">{item.description}</P>
            </div>
        </motion.div>
    );
}