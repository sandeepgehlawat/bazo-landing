import GetAppButton from "@/components/common/GetAppButton";
import { H2, H3, H5 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function ProblemSection() {
    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto bg-[#F2F2F2] rounded-3xl md:rounded-[36px] py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/cactus.svg" alt="" height={140} width={76} className="hidden md:block absolute top-10 left-8" />
                <Image src="/images/hot-cup.svg" alt="" height={98} width={56} className="hidden md:block absolute top-80 right-8" />

                <div className="max-w-220 mx-auto relative z-10">
                    <div className="text-center mb-8">
                        <Badge>Problem</Badge>
                    </div>
                    <H3 className="text-grad">Shopping online should feel transparent.</H3>
                    <div className="flex flex-col md:flex-row items-center mt-2">
                        <div className="w-full md:w-[55%] mt-4 md:mt-0">
                            <H5 className="">But online shopping gives you - </H5>
                        </div>
                        {/* wheel */}
                        <div className="w-full md:w-[45%] space-y-2 mt-4 md:mt-0">
                            <H5 className="text-[#668D1B] opacity-50">...scripted recommendations.</H5>
                            <H5 className="text-[#668D1B] opacity-50">...paid opinions disguised as advice.</H5>
                            <H5 className="mt-4 mb-4 text-[#668D1B]">...manufactured trust.</H5>
                            <H5 className="text-[#668D1B] opacity-50">...pressure instead of proof.</H5>
                            <H5 className="text-[#668D1B] opacity-50">...algorithms instead of people.</H5>
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