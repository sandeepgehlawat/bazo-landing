"use client";

import Navbar from "@/components/common/Navbar";
import { H1, H2, P, Sh0, Sh1 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
    return (
        <section className="px-4 pt-14 md:px-6 md:pt-6">
            <div className="w-full max-w-325 mx-auto bg-background rounded-3xl md:rounded-[36px] py-2.5 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
                    <Image src="/media/host/packages.svg" alt="" height={107} width={91} className="hidden md:block absolute top-15 lg:top-25 left-2.5 lg:left-5 deco-float-1" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
                    <Image src="/media/host/skate boards.svg" alt="" height={112} width={63} className="hidden md:block absolute bottom-2 left-0 deco-float-1" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
                    <Image src="/media/host/shoes.svg" alt="" height={66} width={174} className="hidden md:block absolute top-50 lg:top-85 right-5 lg:right-9 deco-float-2" />
                </motion.div>

                <div className="flex flex-col justify-center items-center w-full max-w-180 px-2 md:px-0 mx-auto relative z-10 mt-16 md:mt-20 lg:mt-29.5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease }}
                    >
                        <Badge>For creators and online sellers</Badge>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35, ease }}
                    >
                        <H2 className="text-grad text-center w-full mx-auto mt-4">Go Live. Sell Instantly on Bazo.</H2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45, ease }}
                    >
                        <Sh1 className="mt-2 text-center">Start a live stream, show the product, and viewers can buy instantly while watching.</Sh1>
                    </motion.div>
                    <Link href="/become-host"><Button className="border mt-6">Start Selling live</Button></Link>
                </div>

                {/* Hero Illustration */}
                <motion.div
                    className="relative left-0 right-0 flex justify-center mt-8 lg:mt-0"
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease }}
                >
                    <img src="/media/host/hero-image-host.svg" alt="hero image host" className="w-70 sm:w-100 lg:w-149 h-auto object-contain" />
                </motion.div>
            </div>
        </section>
    );
}
//do not delete
// import Navbar from "@/components/common/Navbar";
// import { H1, H2, P, Sh0, Sh1 } from "@/components/typography";
// import Badge from "@/components/ui/Badge";
// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//     return (
//         <section className="px-4 pt-4 md:px-6 md:pt-6">
//             <div className="w-full max-w-325 mx-auto bg-background rounded-3xl md:rounded-[36px] py-2.5 px-4 md:px-6 relative overflow-hidden">
//                 {/* Navbar */}
//                 <Navbar />
//                 {/* Decorations*/}
//                 <Image src="/images/pot.svg" alt="" height={140} width={80} className="hidden md:block absolute top-15 lg:top-25 left-2.5 lg:left-5" />
//                 <Image src="/images/cup.svg" alt="" height={59} width={56} className="hidden md:block absolute top-50 lg:top-85 right-5 lg:right-9" />

//                 <div className="flex flex-col justify-center items-center w-full max-w-220 px-4 md:px-0 mx-auto relative z-10 mt-16 md:mt-20 lg:mt-29.5">
//                     <Badge>Buy Live. From Bazo host</Badge>
//                     <H1 className="text-grad mt-2"> Bazo.</H1>
//                     <H2 className="text-grad text-center">The New Way India Shops.</H2>
//                     <Sh1 className="mt-2">Buy directly from the creators you trust. Live. Real. Limited editions.</Sh1>

//                     {/* App Store Buttons */}
//                     <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
//                         <Link href="#" className="flex p-3 justify-center items-center gap-2 rounded-2xl border-2 border-primary hover:bg-white transition">
//                             <div className="p-2.25 rounded-[10px]">
//                                 <Image src="/media/play-store-icon.png" alt="play-store-icon" height={24} width={24} className="h-6 w-6" />
//                             </div>
//                             <div className="text-left">
//                                 <P>Get it on the</P>
//                                 <Sh0>Google Play</Sh0>
//                             </div>
//                         </Link>
//                         <Link href="#" className="flex p-3 justify-center items-center gap-2 rounded-2xl border-2 border-primary hover:bg-white transition">
//                             <div className="p-2.25 rounded-[10px] bg-[#0D96F6]">
//                                 <Image src="/media/app-store-icon.png" alt="app-store-icon" height={24} width={24} className="h-6 w-6" />
//                             </div>
//                             <div className="text-left">
//                                 <P>Dowload on the</P>
//                                 <Sh0>App Store</Sh0>
//                             </div>
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Hero Illustration - responsive positioning */}
//                 <div className="relative left-0 right-0 flex justify-center mt-8 lg:mt-0">
//                     <img src="/images/hero-image-new.svg" alt="Girl shopping on phone" className="w-70 sm:w-100 lg:w-149 h-auto object-contain" />
//                 </div>
//             </div>
//         </section>
//     );
// }