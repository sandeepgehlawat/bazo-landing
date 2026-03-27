'use client'
import BazoLogo from "@/components/common/BazoLogo";
import { ButtonText, H2, LinkText, P, PXs, Sh2 } from "@/components/typography";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ApplicationForm from "@/views/becomehost/ApplicationForm";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { SlSocialInstagram } from "react-icons/sl";

export default function BecomeHost() {
    const [step, setStep] = useState(1)
    return (
        <section className="h-screen">
            <div className="max-w-325 mx-auto h-screen p-6 flex flex-col justify-between">
                <BazoLogo dark={true} />
                <div className="px-44 grid grid-cols-2 items-center justify-between">
                    <div className="space-y-4 max-w-104.25">
                        <H2>Join Bazo & Discover Live shopping</H2>
                        <Image src="/media/become-host-hero-image.svg" alt="become-host-hero" height={464} width={177} />
                    </div>

                    {/* Step - 1 */}
                    {
                        step === 1 &&
                        <div className="border border-border-subtlest rounded-2xl p-4 space-y-8 text-center max-w-98.5">
                            <div className="mx-auto w-fit">
                                <BazoLogo dark={true} />
                            </div>
                            <Sh2 className="font-semibold">Sign in or create an account to get started.</Sh2>
                            <div className="space-y-4">
                                <div className="border border-border-subtlest py-3 px-2.5 rounded-lg md:rounded-[10px] flex items-center gap-4 input-shadow">
                                    <div className="flex items-center gap-2">
                                        <Image src="/media/flag.svg" alt="flag" height={16} width={16} />
                                        <ButtonText className="text-text-subtlest font-medium">91-</ButtonText>
                                    </div>
                                    <Input placeholder="Enter your 10 digit mobile number" />
                                </div>
                                <Button className="border border-primary w-full" onClick={() => setStep(2)}>Continue</Button>
                            </div>
                            <div className="text-center space-y-1.5">
                                <PXs className="text-text-body font-semibold leading-3">By continuing, you agree to Bazo's </PXs>
                                <div className="flex items-center justify-center gap-4">
                                    <Link href="#" className="text-secondary underline"><PXs className="font-semibold leading-3">Privacy Policy </PXs></Link>
                                    <Link href="#" className="text-secondary underline"><PXs className="font-semibold leading-3">Terms of Service</PXs></Link>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Step - 2 */}
                    {
                        step === 2 &&
                        <div className="space-y-6 max-w-98.5">
                            <Button size="md" variant="outline" onClick={() => setStep(1)}>
                                <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2.5} />
                                <ButtonText className="font-semibold">Back</ButtonText>
                            </Button>
                            <div className="border border-border-subtlest rounded-2xl p-4 text-center">
                                <div className="mx-auto w-fit">
                                    <BazoLogo dark={true} />
                                </div>
                                <div className="space-y-1 mt-8">
                                    <Sh2 className="font-semibold">Verify Your Number</Sh2>
                                    <P className="font-normal">Enter the 6-digit code sent to your phone.</P>
                                </div>
                                <div className="flex items-center gap-2 justify-center mt-8">
                                    {
                                        Array.from({ length: 6 }).map((_, i) => {
                                            return (
                                                <div className="h-12 w-12 p-1 border border-border-subtlest bg-background rounded-[11px]">
                                                    <Input className="bg-background h-10 text-center" maxLength={1} inputMode="decimal" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="text-center py-3.25 mt-4">
                                    <ButtonText className="font-semibold text-secondary">Use Another Number</ButtonText>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-center gap-2">
                                    <P>Didn't receive the code? </P>
                                    <LinkText className="font-semibold text-secondary">Resend</LinkText>
                                </div>
                                <Button className="border border-primary w-full" onClick={()=>setStep(3)}>Submit code</Button>
                            </div>
                        </div>
                    }

                    {/* Application Form */}
                    {step === 3 && <ApplicationForm />}

                </div>

                <BecomeHostFooter />
            </div>
        </section>
    )
}

export const BecomeHostFooter = () => {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-center gap-1">
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Terms of use</LinkText> <GoArrowUpRight /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Privacy policy</LinkText> <GoArrowUpRight /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Seller aggreement</LinkText> <GoArrowUpRight /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Refund policy</LinkText> <GoArrowUpRight /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Cookies</LinkText> <GoArrowUpRight /></Link>
                <div className="flex items-center gap-4 ms-4">
                    <Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><SlSocialInstagram /></Link>
                    <Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><FaXTwitter /></Link>
                </div>
            </div>
            <div className="text-center flex flex-row gap-5 items-cetner justify-center mt-2 md:mt-0">
                <PXs className="text-text-subtlest">© 2026</PXs>
                <PXs className="text-text-subtlest">All right reserved by BAZO</PXs>
            </div>
        </div>
    )
}