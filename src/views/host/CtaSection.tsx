import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { H2, Sh1 } from "@/components/typography";
import Footer from "../../components/common/Footer";

export default function CTASection() {
    return (
        <section className="px-4 md:px-6 mt-3 pb-4">
            <div className="w-full max-w-325 mx-auto bg-[#F2F2F2] rounded-3xl md:rounded-[36px] pt-10 md:pt-26.5 pb-4 md:pb-8.5 px-4 md:px-6 relative overflow-hidden">
                <div className="max-w-220 mx-auto relative">
                    {/* CTA Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-12">
                        {/* Left */}
                        <div className="lg:w-1/2">
                            <div className="w-fit">
                                <Badge>Ready to sell</Badge>
                            </div>
                            <H2 className="text-grad mt-2">Become a Bazo Host</H2>
                            <Sh1 className="mt-2">Apply today and start selling to your audience.</Sh1>
                            <Button className="border mt-6">Apply Now</Button>
                        </div>
                        {/* Right - Phone */}
                        <div className="lg:w-1/2 flex justify-center">
                            <Image src="/media/host/cta-image.svg" alt="Bazo App" height={368} width={368} className="" />
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </section>
    );
}