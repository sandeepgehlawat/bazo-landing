import GetAppButton from "@/components/common/GetAppButton";
import { H2, H3, H6, P, Sh0, Sh1 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function SolutionSection() {
    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto rounded-3xl md:rounded-[36px] py-10 md:py-26.5 md:px-6 relative overflow-hidden">
                <div className="max-w-220 mx-auto">
                    <div className="space-y-4">
                        <div className="w-fit mx-auto"><Badge>Solution</Badge></div>
                        <H3 className="text-center">Bazo Brings Back Trust</H3>
                        <Sh1 className="text-center">Real products. Real creators. In real time.</Sh1>
                    </div>

                    {/* Two columns */}
                    <div className="mt-8 md:mt-14 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
                        <div className="lg:w-[45%] space-y-1">
                            {/* Expanded item */}
                            <div className="bg-[#D6F4F880] rounded-2xl p-3 border-[1.5px] border-[#A4E7EF]">
                                <div className="flex items-start gap-3">
                                    <Image src="/images/solution-icon-1.svg" alt="" height={32} width={32} />
                                    <div className="space-y-1.5">
                                        <Sh0>Verified Creators Only</Sh0>
                                        <P className="font-bold">Every seller is screened before they go live. No anonymous listings. No random storefronts. Just real people with accountability.</P>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-dashed border-[#747572]" />

                            <div className="p-3 flex items-center gap-2.5">
                                <Image src="/images/solution-icon-2.svg" alt="" height={32} width={32} />
                                <Sh0>Live Product Transparency</Sh0>
                            </div>
                            <div className="border-b border-dashed border-[#747572]" />
                            <div className="p-3 flex items-center gap-2.5">
                                <Image src="/images/solution-icon-3.svg" alt="" height={32} width={32} />
                                <Sh0>Ask Before You Decide</Sh0>
                            </div>
                            <div className="border-b border-dashed border-[#747572]" />
                            <div className="p-3 flex items-center gap-2.5">
                                <Image src="/images/solution-icon-4.svg" alt="" height={32} width={32} />
                                <Sh0>Watch Before You Trust</Sh0>
                            </div>
                            <div className="border-b border-dashed border-[#747572]" />
                            <div className="p-3 flex items-center gap-2.5">
                                <Image src="/images/solution-icon-5.svg" alt="" height={32} width={32} />
                                <Sh0>Checkout Without Leaving</Sh0>
                            </div>
                            <div className="border-b border-dashed border-[#747572]" />
                            <div className="p-3 flex items-center gap-2.5">
                                <Image src="/images/solution-icon-6.svg" alt="" height={32} width={32} />
                                <Sh0>Creators Put Their Reputation On The Line</Sh0>
                            </div>
                        </div>

                        {/* Right - Illustration */}
                        <div className="flex items-center justify-end">
                            <Image src="/images/solution-illustration.png" alt="" height={400} width={408} className="rounded-2xl" />
                        </div>
                    </div>
                </div>

                {/* Get App Button */}
                <div className="hidden md:block absolute bottom-4 right-4">
                    <GetAppButton />
                </div>
            </div>
        </section>
    );
}