"use client";

import {
    Children,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// ─── SliderItem ────────────────────────────────────────────
export function SliderItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`shrink-0 ${className}`}>
            {children}
        </div>
    );
}

// ─── Slider ────────────────────────────────────────────────
interface SliderProps {
    children: ReactNode;
    /** Gap between items in px */
    gap?: number;
    /** Number of items visible at once */
    itemsToShow?: number;
    /** Show navigation arrows */
    arrows?: boolean;
    /** Show dot indicators */
    dots?: boolean;
    /** Auto-play interval in ms (0 = disabled) */
    autoPlay?: number;
    /** How many items to scroll per step */
    step?: number;
    /** Additional class on the outer wrapper */
    className?: string;
}

export default function Slider({
    children,
    gap = 16,
    itemsToShow = 1,
    arrows = true,
    dots = true,
    autoPlay = 0,
    step = 1,
    className = "",
}: SliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const isTransitioning = useRef(false);

    const items = Children.toArray(children);
    const count = items.length;

    // Clone items for infinite loop
    const clonesCount = Math.max(itemsToShow + 1, Math.min(count, 5));
    const leadClones = items.slice(-clonesCount);
    const trailClones = items.slice(0, clonesCount);
    const allItems = [...leadClones, ...items, ...trailClones];
    const totalCount = allItems.length;
    const realOffset = clonesCount;

    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 35 });

    // Measure item width based on container and itemsToShow
    const measure = useCallback(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const totalGap = gap * (itemsToShow - 1);
        const w = (containerWidth - totalGap) / itemsToShow;
        setItemWidth(w + gap);
    }, [gap, itemsToShow]);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure]);

    // Position track at real start on mount
    useEffect(() => {
        if (itemWidth > 0) {
            const pos = -(realOffset * itemWidth);
            x.jump(pos);
            springX.jump(pos);
        }
    }, [itemWidth, realOffset, x, springX]);

    // Go to a real index (0-based within original items)
    const goTo = useCallback(
        (index: number, animate = true) => {
            const trackIndex = index + realOffset;
            const pos = -(trackIndex * itemWidth);
            if (animate) {
                x.set(pos);
            } else {
                x.jump(pos);
                springX.jump(pos);
            }
            setActiveIndex(((index % count) + count) % count);
        },
        [realOffset, itemWidth, x, springX, count]
    );

    // After spring settles on a clone, silently jump to real position
    useEffect(() => {
        const unsubscribe = springX.on("change", (latest) => {
            if (isTransitioning.current) return;

            const trackIndex = Math.round(-latest / (itemWidth || 1));
            const realIndex = trackIndex - realOffset;

            if (realIndex >= count) {
                isTransitioning.current = true;
                goTo(realIndex % count, false);
                requestAnimationFrame(() => {
                    isTransitioning.current = false;
                });
            } else if (realIndex < 0) {
                isTransitioning.current = true;
                goTo(((realIndex % count) + count) % count, false);
                requestAnimationFrame(() => {
                    isTransitioning.current = false;
                });
            }
        });
        return unsubscribe;
    }, [springX, itemWidth, realOffset, count, goTo]);

    const prev = () => goTo(activeIndex - step);
    const next = () => goTo(activeIndex + step);

    // Auto-play
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            goTo(activeIndex + step);
        }, autoPlay);
        return () => clearInterval(timer);
    }, [autoPlay, step, activeIndex, goTo]);

    // Drag / swipe
    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = itemWidth / 4;
        if (info.offset.x < -threshold) {
            next();
        } else if (info.offset.x > threshold) {
            prev();
        } else {
            goTo(activeIndex);
        }
    };

    // Compute each slide's flex width
    const slideWidth = itemWidth > 0
        ? `${itemWidth - gap}px`
        : `calc((100% - ${gap * (itemsToShow - 1)}px) / ${itemsToShow})`;

    return (
        <div className={`relative ${className}`}>
            {/* Track container */}
            <div className="overflow-hidden" ref={containerRef}>
                <motion.div
                    ref={trackRef}
                    className="flex cursor-grab active:cursor-grabbing"
                    style={{ x: springX, gap: `${gap}px` }}
                    drag="x"
                    dragConstraints={{ left: -((totalCount - 1) * itemWidth), right: 0 }}
                    dragElastic={0.08}
                    onDragEnd={handleDragEnd}
                >
                    {allItems.map((item, i) => (
                        <div
                            key={`slide-${i}`}
                            className="shrink-0"
                            style={{ width: slideWidth }}
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom controls: arrows + dots together */}
            {(arrows || dots) && count > itemsToShow && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    {/* Prev arrow */}
                    {arrows && (
                        <button
                            onClick={prev}
                            aria-label="Previous"
                            className="h-8 w-8 border border-primary rounded-full bg-background flex items-center justify-center backdrop-blur-sm hover:bg-accent cursor-pointer transition-colors"
                        >
                            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
                        </button>
                    )}

                    {/* Dots */}
                    {dots && (
                        <div className="flex items-center gap-1.5">
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className="cursor-pointer"
                                >
                                    <motion.div
                                        className="h-2 rounded-full"
                                        animate={{
                                            width: i === activeIndex ? 24 : 8,
                                            backgroundColor: i === activeIndex ? "#0c0c0c" : "#d4d4d4",
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Next arrow */}
                    {arrows && (
                        <button
                            onClick={next}
                            aria-label="Previous"
                            className="h-8 w-8 border border-primary rounded-full bg-background flex items-center justify-center backdrop-blur-sm hover:bg-accent cursor-pointer transition-colors"
                        >
                            <HugeiconsIcon
                                icon={ArrowRight02Icon}
                                size={18}
                            />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
