'use client'
import GetAppButton from "@/components/common/GetAppButton";
import { H5 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Word({ word, scrollYProgress, start, end,}: {
    word: string;
    scrollYProgress: MotionValue<number>;
    start: number;
    end: number;
}) {
    // const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
    const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
    const y = useTransform(scrollYProgress, [start, end], [4, 0]);

    return (
        <motion.span
            style={{ opacity, y, display: "inline-block" }}
            transition={{ ease: "easeOut" }}
        >
            {word}&nbsp;
        </motion.span>
    );
}

export default function ShiftSection() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "end 0.4"],
    });

    const text ="Posting links in bio isn't selling. Followers watch your content. They trust your taste. But the moment to sell disappears. People want to see products live. Ask questions. Buy instantly. The future of creator commerce is not links. It's live selling. Bazo makes that possible.";

    const words = text.split(" ").filter(Boolean);
    const totalWords = words.length;

    // Each word occupies an overlapping window for a smooth wave effect
    const wordDuration = 0.4 / totalWords + 0.3;

    return (
        <section className="px-4 md:px-6 ">
            <div className="w-full max-w-325 mx-auto py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/media/host/packages.svg" alt="pot-icon" height={140} width={80} className="hidden md:block absolute top-28 left-6 deco-float-3" />
                <Image src="/media/host/skate boards.svg" alt="" height={112} width={63} className="hidden md:block absolute bottom-2 left-0 deco-float-4" />
                <Image src="/media/host/shoes.svg" alt="" height={66} width={174} className="hidden md:block absolute top-50 lg:top-85 right-5 lg:right-9 deco-float-4" />


                <div className="max-w-100 mx-auto relative z-10">
                        <Badge>Shift in 2026</Badge>
                    <div className="mt-4 lg:mt-8">
                        <H5 ref={ref}>
                            {words.map((word, i) => {
                                const start = i / totalWords;
                                const end = Math.min(start + wordDuration, 1);

                                return (
                                    <Word
                                        key={i}
                                        word={word}
                                        scrollYProgress={scrollYProgress}
                                        start={start}
                                        end={end}
                                    />
                                );
                            })}
                        </H5>
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
