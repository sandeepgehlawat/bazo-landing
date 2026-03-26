"use client";

import GetAppButton from "@/components/common/GetAppButton";
import { H3, H5 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
    "...likes that never turn into revenue.",
    "...24 hours of posting for zero sales.",
    "...buyers leaving before checkout.",
    "...DMs instead of real orders.",
    "...people asking “price?” in every comment.",
    // "...depending on brand deals instead of your own store.",
];

const INTERVAL = 2500;
const VISIBLE_COUNT = 5;

function getOpacity(distance: number): number {
    if (distance === 0) return 1;
    if (distance === 1) return 0.4;
    return 0.15;
}

// Get the circular distance for opacity (always based on position within original items)
function getCircularDistance(index: number, activeIndex: number, total: number): number {
    const a = ((index % total) + total) % total;
    const b = ((activeIndex % total) + total) % total;
    const diff = Math.abs(a - b);
    return Math.min(diff, total - diff);
}

export default function ProblemSection() {
    const isMobile = useIsMobile()
    const [activeIndex, setActiveIndex] = useState(0);
    const [skipTransition, setSkipTransition] = useState(false);
    const stripRef = useRef<HTMLDivElement>(null);

    const advance = useCallback(() => {
        setActiveIndex((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const timer = setInterval(advance, INTERVAL);
        return () => clearInterval(timer);
    }, [advance]);

    // When we've gone far enough, silently reset without animation
    useEffect(() => {
        if (activeIndex > 0 && activeIndex % items.length === 0) {
            // Wait for current animation to finish, then snap back
            const timeout = setTimeout(() => {
                setSkipTransition(true);
                setActiveIndex(0);
                // Re-enable transitions on next frame
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setSkipTransition(false);
                    });
                });
            }, 550);
            return () => clearTimeout(timeout);
        }
    }, [activeIndex]);

    // Build strip: items repeated 3x for seamless wrap
    const extendedItems = [...items, ...items, ...items];
    // Offset so activeIndex=0 starts centered in the middle copy
    const baseOffset = items.length;
    const centerOffset = Math.floor(VISIBLE_COUNT / 2);
    const SLOT_HEIGHT = isMobile ? 66 : 86;
    const translateY = -(activeIndex + baseOffset - centerOffset) * SLOT_HEIGHT;

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto bg-[#F2F2F2] rounded-3xl md:rounded-[36px] py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/cactus.svg" alt="" height={140} width={76} className="hidden md:block absolute top-10 left-8 deco-float-5" />
                <Image src="/images/hot-cup.svg" alt="" height={98} width={56} className="hidden md:block absolute top-80 right-8 deco-float-6" />

                <div className="max-w-220 mx-auto relative z-10">
                    <Badge>Problem</Badge>
                    <H3 className="text-grad mt-4 lg:mt-8">Selling online should feel direct.</H3>
                    <div className="flex flex-col md:flex-row items-center mt-2">
                        <div className="w-full md:w-[55%] mt-4 md:mt-0">
                            <H5 className="">But most platforms give you -</H5>
                        </div>
                        {/* Wheel */}
                        <div className="w-full md:w-[45%] mt-4 md:mt-0">
                            <div
                                className="relative overflow-hidden"
                                style={{ height: `${SLOT_HEIGHT * VISIBLE_COUNT}px` }}
                            >
                                {/* Fade masks top & bottom */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 z-10 bg-linear-to-b from-[#F2F2F2] to-transparent" />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 z-10 bg-linear-to-t from-[#F2F2F2] to-transparent" />

                                <motion.div
                                    ref={stripRef}
                                    className="flex flex-col"
                                    animate={{ y: translateY }}
                                    transition={
                                        skipTransition
                                            ? { duration: 0 }
                                            : {
                                                duration: 0.5,
                                                ease: [0.25, 0.1, 0.25, 1],
                                            }
                                    }
                                >
                                    {extendedItems.map((text, i) => {
                                        const isActive = i === activeIndex + baseOffset;
                                        const distance = getCircularDistance(i, activeIndex + baseOffset, items.length);
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center"
                                                style={{ height: `${SLOT_HEIGHT}px` }}
                                            >
                                                <motion.div
                                                    animate={{ opacity: getOpacity(distance) }}
                                                    transition={
                                                        skipTransition
                                                            ? { duration: 0 }
                                                            : { duration: 0.5, ease: "easeOut" }
                                                    }
                                                >
                                                    <H5 className={isActive ? "wheel-active" : ""}>{text}</H5>
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>
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

// ------------------------------------------------
// Do not delete this
// ------------------------------------------------
// import GetAppButton from "@/components/common/GetAppButton";
// import { H2, H3, H5 } from "@/components/typography";
// import Badge from "@/components/ui/Badge";
// import Image from "next/image";

// export default function ProblemSection() {
//     return (
//         <section className="px-4 md:px-6">
//             <div className="w-full max-w-325 mx-auto bg-[#F2F2F2] rounded-3xl md:rounded-[36px] py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
//                 {/* Decorations */}
//                 <Image src="/images/cactus.svg" alt="" height={140} width={76} className="hidden md:block absolute top-10 left-8" />
//                 <Image src="/images/hot-cup.svg" alt="" height={98} width={56} className="hidden md:block absolute top-80 right-8" />

//                 <div className="max-w-220 mx-auto relative z-10">
//                     <div className="text-center mb-8">
//                         <Badge>Problem</Badge>
//                     </div>
//                     <H3 className="text-grad">Shopping online should feel transparent.</H3>
//                     <div className="flex flex-col md:flex-row items-center mt-2">
//                         <div className="w-full md:w-[55%] mt-4 md:mt-0">
//                             <H5 className="">But online shopping gives you - </H5>
//                         </div>
//                         {/* wheel */}
//                         <div className="w-full md:w-[45%] space-y-2 mt-4 md:mt-0">
//                             <H5 className="text-[#668D1B] opacity-50">...scripted recommendations.</H5>
//                             <H5 className="text-[#668D1B] opacity-50">...paid opinions disguised as advice.</H5>
//                             <H5 className="mt-4 mb-4 text-[#668D1B]">...manufactured trust.</H5>
//                             <H5 className="text-[#668D1B] opacity-50">...pressure instead of proof.</H5>
//                             <H5 className="text-[#668D1B] opacity-50">...algorithms instead of people.</H5>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Get App Button */}
//                 <div className="hidden md:block absolute bottom-5 right-5">
//                     <GetAppButton />
//                 </div>
//             </div>
//         </section>
//     );
// }