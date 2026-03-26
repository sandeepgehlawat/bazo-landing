import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { H2, P, Sh0, Sh1 } from "@/components/typography";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import { AppStoreIcon, PlayStoreIcon } from "@/components/svg-icons";

export default function CTASection() {
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
                                       <PlayStoreIcon/>
                                    </div>
                                    <div className="text-left">
                                        <P>Get it on the</P>
                                        <Sh0>Google Play</Sh0>
                                    </div>
                                </Link>
                                <Link href="#" className="flex p-3 justify-center items-center gap-2 rounded-2xl border-2 border-primary bg-background hover:bg-gray-200 transition">
                                    <div className="p-2.25 rounded-[10px] bg-[#0D96F6]">
                                        <AppStoreIcon/>
                                    </div>
                                    <div className="text-left">
                                        <P>Dowload on the</P>
                                        <Sh0>App Store</Sh0>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Right - Phone */}
                        <div className="lg:w-1/2 flex justify-center">
                            <Image src="/media/cta-image.svg" alt="Bazo App" height={368} width={368} className="" />
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </section>
    );
}