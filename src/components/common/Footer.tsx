import Link from "next/link";
import { H1, H2, LinkText, P, PXs, Sh0, Sh1, Sh2 } from "../typography";
import Badge from "../ui/Badge";
import BazoLogo from "./BazoLogo";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { TbBrandLinkedin } from "react-icons/tb";
import { SlSocialInstagram } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className="px-4 md:px-6 mt-3 pb-4">
            <div className="w-full max-w-325 mx-auto bg-[#F2F2F2] rounded-3xl md:rounded-[36px] pt-10 md:pt-26.5 pb-4 md:pb-8.5 px-4 md:px-6 relative overflow-hidden">
                <div className="max-w-220 mx-auto relative">
                    {/* CTA Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-12">
                        {/* Left */}
                        <div className="lg:w-1/2">
                            <Badge>Scroll smarter. Shop live.</Badge>
                            <H2 className="text-grad mt-2">Stop Guessing. Start Seeing.</H2>
                            <Sh1 className="mt-2">Join India's live shopping movement.</Sh1>

                            {/* Dark App Store Buttons */}
                            <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-5 mt-6">
                                <Link href="#" className="flex p-3 justify-center items-center gap-2 rounded-2xl border-2 border-primary transition">
                                    <div className="p-2.25 rounded-[10px]">
                                        <Image src="/media/play-store-icon.png" alt="play-store-icon" height={24} width={24} className="h-6 w-6" />
                                    </div>
                                    <div className="text-left">
                                        <P>Get it on the</P>
                                        <Sh0>Google Play</Sh0>
                                    </div>
                                </Link>
                                <Link href="#" className="flex p-3 justify-center items-center gap-2 rounded-2xl border-2 border-primary bg-background hover:bg-gray-200 transition">
                                    <div className="p-2.25 rounded-[10px] bg-[#0D96F6]">
                                        <Image src="/media/app-store-icon.png" alt="app-store-icon" height={24} width={24} className="h-6 w-6" />
                                    </div>
                                    <div className="text-left">
                                        <P>Dowload on the</P>
                                        <Sh0>App Store</Sh0>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Right - Phone */}
                        <div className="lg:w-1/2 flex justify-end">
                            <Image src="/images/cta-phone-figma.png" alt="Bazo App" height={368} width={368} className="" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-10 md:pt-14">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5 mb-8">
                            <BazoLogo size={48} />
                            <span className="font-body font-bold text-4xl tracking-tight">BAZO</span>
                        </div>

                        {/* Footer Links */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 md:mb-14">
                            <div className="space-y-4">
                                <Sh2 className="font-semibold">Support</Sh2>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Terms of use</LinkText> <GoArrowUpRight /></Link></li>
                                    <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Terms of use</LinkText> <GoArrowUpRight /></Link></li>
                                    <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Seller Agreement</LinkText> <GoArrowUpRight /></Link></li>
                                    <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Refund Policy</LinkText> <GoArrowUpRight /></Link></li>
                                    <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Cookies</LinkText> <GoArrowUpRight /></Link></li>
                                </ul>
                            </div>
                            <div className="flex justify-start md:justify-center">
                                <div className="space-y-4">
                                    <Sh2>Quick Links</Sh2>
                                    <ul className="space-y-2">
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Home</LinkText> <GoArrowUpRight /></Link></li>
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>For creator</LinkText> <GoArrowUpRight /></Link></li>
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>How it works</LinkText> <GoArrowUpRight /></Link></li>
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>FAQS</LinkText> <GoArrowUpRight /></Link></li>
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><LinkText>Start selling</LinkText> <GoArrowUpRight /></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end">
                                <div className="space-y-4">
                                    <Sh2>Socials</Sh2>
                                    <ul className="space-y-2">
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><TbBrandLinkedin /><LinkText>Linkedin</LinkText> <GoArrowUpRight /></Link></li>
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><SlSocialInstagram /><LinkText>Instagram</LinkText> <GoArrowUpRight /></Link></li>
                                        <li><Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><FaXTwitter /><LinkText>x.com</LinkText> <GoArrowUpRight /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Big BAZO */}
                        <div className="text-center">
                            <span className="font-heading font-bold  text-[100px] leading-25 md:text-[120px] md:leading-30 lg:text-[250px] lg:leading-62.5 text-[#0C0C0C] tracking-[-0.04em]">BAZO</span>
                        </div>

                        {/* Copyright */}
                        <div className="text-center flex flex-row gap-5 items-cetner justify-center mt-2 md:mt-0">
                            <PXs className="text-text-muted">© 2026</PXs>
                            <PXs className="text-text-muted">All right reserved by BAZO</PXs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}