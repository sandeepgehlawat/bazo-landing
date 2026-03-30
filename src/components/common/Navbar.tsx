"use client";

import Link from "next/link";
import { ButtonText } from "../typography";
import Button from "../ui/Button";
import BazoLogo from "./BazoLogo";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY.current;
        // Only hide after scrolling down past 80px, show immediately on scroll up
        if (diff > 0 && latest > 80) {
            setHidden(true);
        } else if (diff < 0) {
            setHidden(false);
        }
        lastScrollY.current = latest;
    });
    return (
        <motion.div
            className={`fixed top-6 md:top-8 z-50 w-full flex items-center justify-center px-6 ${(pathname === '/become-host' || pathname === '/become-host/apply' || pathname.startsWith('/admin')) && 'hidden'}`}
            animate={{ y: hidden ? "-150%" : "0%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <nav className="w-full max-w-199 mx-auto bg-dark rounded-xl md:rounded-2xl p-2.5 flex items-center justify-between" style={{ boxShadow: '0 0 9px 0 rgba(0, 0, 0, 0.10), 0 0 28px -18px rgba(0, 0, 0, 0.24), 0 3px 10px -2px rgba(0, 0, 0, 0.25), 0 3px 5px -3px rgba(0, 0, 0, 0.18)' }}>
                <Link href="/">
                    <BazoLogo />
                </Link>
                <div className="flex items-center gap-1 md:gap-4">
                    <Link href="/host"><Button variant="secondary" className="hidden sm:block"><ButtonText>Become Host</ButtonText></Button></Link>
                    <div className="hidden md:flex">
                        <Button className="hidden md:flex"><ButtonText>Get app</ButtonText></Button>
                    </div>
                </div>
            </nav>
        </motion.div>
    );
}