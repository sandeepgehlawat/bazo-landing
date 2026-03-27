"use client";

import GetAppButton from "@/components/common/GetAppButton";
import { H2, H3, H6, P, Sh0, Sh1 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { hostSolutionItems } from "@/utils/constants";
import { useIsMobile } from "@/hooks/use-mobile";


// Extra scroll height per item (in vh units)
const SCROLL_PER_ITEM = 60;

export default function SolutionSection() {
    const isMobile = useIsMobile()
    return (
        <>
            {
                isMobile ? <MobileLayout /> : <DesktopLayout />
            }
        </>
    )
}


export const DesktopLayout = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = hostSolutionItems[activeIndex];
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const itemProgress = Math.min(progress / 0.95, 1);
        const index = Math.min(
            Math.floor(itemProgress * hostSolutionItems.length),
            hostSolutionItems.length - 1
        );
        setActiveIndex(index);
    });

    // Total height = viewport + extra scroll for each item transition
    const totalScrollHeight = `${100 + hostSolutionItems.length * SCROLL_PER_ITEM}vh`;
    return (
        <section
            ref={sectionRef}
            className="relative px-4 md:px-6"
            style={{ height: totalScrollHeight }}
        >
            {/* Sticky inner content — stays pinned while user scrolls through the tall wrapper */}
            <div className="sticky top-0 min-h-screen flex items-center">
                <div className="w-full max-w-325 mx-auto rounded-3xl md:rounded-[36px] py-10 2xl:py-20.5 md:px-6 relative overflow-hidden">
                    <div className="max-w-220 mx-auto">
                        <div className="space-y-4">
                            <div className="w-fit mx-auto"><Badge>Solution</Badge></div>
                            <H3 className="text-center w-full md:w-142.25 mx-auto">Turn Your Audience Into Customers. Live.</H3>
                            <Sh1 className="text-center">Real products. Real creators. In real time.</Sh1>
                        </div>

                        {/* Two columns */}
                        <div className="sticky-2 mt-8 2xl:mt-14 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
                            {/* Left - Accordion list */}
                            <div className="lg:w-[50%]">
                                {hostSolutionItems.map((item, i) => {
                                    const isActive = i === activeIndex;
                                    return (
                                        <div key={i}>
                                            <div onClick={() => setActiveIndex(i)} className="w-full text-left cursor-pointer">
                                                <motion.div
                                                    className="rounded-2xl p-3"
                                                    animate={{
                                                        backgroundColor: isActive ? item.background : "rgba(0,0,0,0)",
                                                        borderColor: isActive ? item.border : "transparent",
                                                        borderWidth: isActive ? "1.5px" : "1.5px",
                                                    }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    style={{
                                                        borderStyle: "solid",
                                                        borderColor: isActive ? item.border : "transparent",
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={item.icon}
                                                            alt=""
                                                            height={32}
                                                            width={32}
                                                            className="shrink-0 mt-0.5 h-8 w-8"
                                                        />
                                                        <div className="space-y-1.5">
                                                            <Sh0>{item.title}</Sh0>
                                                            <AnimatePresence initial={false}>
                                                                {isActive && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <P className="font-bold">{item.description}</P>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                                {i < hostSolutionItems.length - 1 && (
                                                    <div className="border-b border-dashed border-[#d9dbd5] my-1 2xl:my-3" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right - Phone image */}
                            <motion.div className="lg:w-[50%] flex items-center justify-end rounded-2xl">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 12 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        animate={{
                                            opacity: 1, y: 0,
                                        }}
                                        style={{
                                            backgroundColor: active.background,
                                            borderColor: active.border,
                                        }}
                                        className="w-fit h-60 md:h-80 lg:h-100 flex items-end justify-center border-[1.5px] rounded-4xl overflow-hidden"
                                    >
                                        <Image
                                            src={active.image}
                                            alt={active.title}
                                            height={400}
                                            width={408}
                                            className={`${activeIndex === 2 && ' py-4 h-100'}`}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>

                    {/* Get App Button */}
                    <div className="hidden md:block absolute bottom-4 right-4">
                        <GetAppButton />
                    </div>
                </div>
            </div>
        </section>
    )
}


export const MobileLayout = () => {
    return (
        <section className="relative px-4 md:px-6" >
            {/* Sticky inner content — stays pinned while user scrolls through the tall wrapper */}
            <div className="sticky top-0 min-h-screen flex items-center">
                <div className="w-full max-w-325 mx-auto rounded-3xl md:rounded-[36px] py-10 2xl:py-20.5 md:px-6 relative overflow-hidden">
                    <div className="max-w-220 mx-auto">
                        <div className="space-y-2 lg:space-y-4">
                            <div className="w-fit mx-auto"><Badge>Solution</Badge></div>
                            <H3 className="text-center w-full md:w-142.25 mx-auto">Turn Your Audience Into Customers. Live.</H3>
                            <Sh1 className="text-center">Real products. Real creators. In real time.</Sh1>
                        </div>
                        <div className="mt-8 2xl:mt-14 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
                            <div className="lg:w-[50%]">
                                {hostSolutionItems.map((item, i) => {
                                    return (
                                        <div key={i}>

                                            <div className="rounded-2xl p-3 space-y-2">
                                                <Image src={item.icon} alt="" height={32} width={32} className="shrink-0 h-8 w-8" />
                                                <Sh0>{item.title}</Sh0>
                                                <P className="font-medium">{item.description}</P>
                                                <div
                                                    className="mt-3 w-full flex items-end justify-center border-[1.5px] rounded-4xl overflow-hidden"
                                                    style={{
                                                        backgroundColor: item.background,
                                                        borderColor: item.border
                                                    }}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        height={200}
                                                        width={208}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            {
                                                i !== hostSolutionItems.length - 1 &&
                                                <div className="border-t border-dashed border-[#d9dbd5]" />
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Get App Button */}
                    <div className="hidden md:block absolute bottom-4 right-4">
                        <GetAppButton />
                    </div>
                </div>
            </div>
        </section>
    )
}