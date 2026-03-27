"use client";

import GetAppButton from "@/components/common/GetAppButton";
import { H3, P, PSm, Sh0 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { hostWorkItems } from "@/utils/constants";

export default function HowBezoWorksSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/pot.svg" alt="pot-icon" height={140} width={76} className="hidden md:block absolute top-25 left-8 deco-float-4" />
                <Image src="/images/cup.svg" alt="cut-icon" height={98} width={56} className="hidden md:block absolute top-100 right-8 deco-float-2" />

                <div className="max-w-220 mx-auto relative">
                    {/* Tag centered */}
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <Badge>How Bazo Works</Badge>
                        <H3 className="text-center text-grad mt-4 w-full md:w-142.25 mx-auto">How Selling on Bazo Works</H3>
                    </motion.div>

                    {/* Steps */}
                    <div className="mt-8 md:mt-14 space-y-4 md:space-y-6 max-w-115.5 mx-auto">
                        {hostWorkItems.map((item, i) => (
                            <StepCard key={i} item={item} index={i} />
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


function StepCard({
    item,
    index,
}: {
    item: { image: string; title: string; description: string };
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.97 }
            }
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="bg-background rounded-[20px] overflow-hidden p-3 flex flex-col md:flex-row gap-4"
        >
            <div className="w-fit mx-auto">
                <Image
                    src={item.image}
                    alt={`work-${index}`}
                    height={150}
                    width={150}
                    className="h-37.5 w-37.5"
                />
            </div>
            <div className="flex-1 space-y-2">
                <div className="border bg-accent rounded-full p-1.5 h-8 w-8 text-center">
                    <PSm className="leading-3.5">{index + 1}</PSm>
                </div>
                <Sh0>{item.title}</Sh0>
                <P>{item.description}</P>
            </div>
        </motion.div>
    );
}