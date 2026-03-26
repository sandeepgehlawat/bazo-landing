import BazoLogo from "@/components/common/BazoLogo";
import { LinkText, PXs, Sh2 } from "@/components/typography";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { SlSocialInstagram } from "react-icons/sl";
import { TbBrandLinkedin } from "react-icons/tb";

export default function Footer() {
    return (
        <div className="pt-10 md:pt-14">
            {/* Logo */}
            <div className="mb-8">
                <BazoLogo dark={true}/>
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
    )
}