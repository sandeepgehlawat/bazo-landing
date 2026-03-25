import GetAppButton from "@/components/common/GetAppButton";
import { H5 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function ShiftSection() {
    return (
        <section className="px-4 md:px-6 ">
            <div className="w-full max-w-325 mx-auto py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/pot.svg" alt="" height={140} width={80} className="hidden md:block absolute top-28 left-6" />
                <Image src="/images/cup.svg" alt="" height={59} width={56} className="hidden md:block absolute top-70 right-6" />

                <div className="max-w-100 mx-auto relative z-10">
                    <div className="w-fit mx-auto">
                        <Badge>Shift in 2026</Badge>
                    </div>
                    <div className="mt-8">
                        <H5>Still shopping from random listings? </H5>
                        <H5 className="opacity-20">You follow creators for a reason. <br /> You trust them. <br /> So why not buy from them  live?<br /> See it. Question it. Grab it. Before it sells out. <br />Bazo makes scrolling shoppable.
                        </H5>
                        {/* <H5>Still shopping from random listings? <br /> You follow creators for a reason. <br /> You trust them. <br /> So why not buy from them  live?<br /> See it. Question it. Grab it. Before it sells out. <br />Bazo makes scrolling shoppable.
                        </H5> */}
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