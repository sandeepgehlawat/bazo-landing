import GetAppButton from "@/components/common/GetAppButton";
import { H3, P, PSm, Sh0 } from "@/components/typography";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

export default function HowItWorksSection() {
    const stepCards = [
        {
            image: "/media/how it works 1.svg",
            title: "Get the App",
            description: "Download BAZO and create your account in seconds. No complexity. Just get started.",
        },
        {
            image: "/media/how it works 2.svg",
            title: "Watch Live",
            description: "Join live sessions from creators you trust. See products demonstrated in real time.",
        },
        {
            image: "/media/how it works 3.svg",
            title: "Ask & Interact",
            description: "Chat directly with the creator before buying. Get clarity instantly.",
        },
        {
            image: "/media/how it works 4.svg",
            title: "Tap to Buy.",
            description: "Secure checkout without leaving the stream. Fast. Seamless. Safe",
        },
        {
            image: "/media/how it works 5.svg",
            title: "Receive & Enjoy",
            description: "Track your order and get it delivered to your door.",
        },
    ];

    return (
        <section className="px-4 md:px-6">
            <div className="w-full max-w-325 mx-auto bg-background rounded-3xl md:rounded-[36px] py-10 md:py-26.5 px-4 md:px-6 relative overflow-hidden">
                {/* Decorations */}
                <Image src="/images/pot.svg" alt="pot-icon" height={140} width={76} className="hidden md:block absolute top-25 left-8" />
                <Image src="/images/cup.svg" alt="cut-icon" height={98} width={56} className="hidden md:block absolute top-100 right-8" />

                <div className="max-w-220 mx-auto relative">
                    {/* Tag centered */}
                    <div className="mx-auto w-fit">
                        <Badge>How Bazo Works</Badge>
                    </div>
                    <H3 className="text-center text-grad mt-4"> Watch. Tap. Done.</H3>

                    {/* Steps */}
                    <div className="mt-8 md:mt-14 space-y-4 md:space-y-6 max-w-115.5 mx-auto">
                        {stepCards.map((item, i) => (
                            <div key={i} className="bg-white rounded-[20px] overflow-hidden p-3 flex flex-col md:flex-row gap-4">
                                <div className="w-fit">
                                    <Image src={item.image} alt={`work-${i}`} height={150} width={150} className="h-37.5 w-37.5"/>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="border bg-accent rounded-full p-1.5 h-8 w-8 text-center">
                                        <PSm className="leading-3.5">{i + 1}</PSm>
                                    </div>
                                    <Sh0>{item.title}</Sh0>
                                    <P>{item.description}</P>
                                </div>
                            </div>
                        ))}
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