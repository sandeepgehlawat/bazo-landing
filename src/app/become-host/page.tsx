'use client'

import BazoLogo from "@/components/common/BazoLogo";
import { ButtonText, H2, LinkText, P, PXs, Sh0, Sh2 } from "@/components/typography";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { useApp } from "@/context/AppContext";
import { getDeviceId } from "@/lib/device";
import { authApi } from "@/services/auth-api";
import { sellerApi } from "@/services/seller-api";
import ApplicationForm from "@/views/becomehost/ApplicationForm";
import { ApplicationPending, ApplicationAccepted, ApplicationRejected, StatusLoading } from "@/views/becomehost/ApplicationStatus";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { SlSocialInstagram } from "react-icons/sl";

type ApplicationStatus = {
    hasApplication: boolean,
    status: "ACCEPTED" | "REJECTED" | "PENDING" | null
}
export default function BecomeHost() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { step, setStep } = useApp()
    const [number, setNumber] = useState('')
    const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''))
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])
    const otp = otpDigits.join('')
    const deviceId = getDeviceId()

    // request Otp
    const { mutate: requestOtp, isPending: isRequesting } = useMutation({
        mutationKey: ['request-otp'],
        mutationFn: () => authApi.requestOtp(number),
        onSuccess: () => { setStep(2) }
    })

    // Verify Otp
    const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
        mutationKey: ['verify-otp'],
        mutationFn: () => authApi.verifyOtp(number, otp, deviceId),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('expires_in', data.expires_in)
            setStep(3)
        }
    })

    // Application status — only runs when on step 3 (authenticated)
    const { data: applicationStatus, isLoading: isStatusLoading } = useQuery<ApplicationStatus>({
        queryKey: ['get-application-status'],
        queryFn: () => sellerApi.getApplicationStatus(),
        enabled: step === 3,
    })

    // resend Otp
    const { mutate: resendOtp, isPending: isResending } = useMutation({
        mutationKey: ['request-otp'],
        mutationFn: () => authApi.resendOtp(number),
        onSuccess: () => {
            console.log('otp resent.')
        }
    })

    // logout
    const { mutate: onLogout, isPending: isloggingout } = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const refresh_token = localStorage.getItem('refresh_token')
            if (!refresh_token) throw new Error("no refresh token")
            return await authApi.logout(refresh_token, deviceId)
        },
        onSuccess: () => {
            localStorage.clear()
            setStep(1)
            console.log('Loged out')
        }
    })

    useEffect(() => {
        if (token) {
            localStorage.setItem("access_token", token);
            window.history.replaceState({}, "", "/become-host");
            setStep(3);
        } else if (localStorage.getItem("access_token")) {
            setStep(3);
        } else {
            setStep(1);
        }
    }, [token]);


    return (
        <section className="h-screen">
            <div className="max-w-325 mx-auto h-screen p-4 md:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                    <BazoLogo dark={true} />
                    {step === 3 &&
                        <Button onClick={() => onLogout()} className="border">Logout {isloggingout && <Spinner />}</Button>
                    }
                </div>
                <div className="px-0 lg:px-20 2xl:px-44 pt-10 lg:pt-20 2xl:pt-0 grid grid-cols-1 lg:grid-cols-2 items-center mx-auto">
                    <div className="space-y-8 lg:space-y-4 max-w-104.25">
                        <H2>{step === 3 ? 'Applying for Your Bazo host Account' : ' Join Bazo & Discover Live shopping'}</H2>
                        <Image src="/media/become-host-hero-image.svg" alt="become-host-hero" height={464} width={177} className="hidden lg:block" />
                    </div>

                    {/* Loading */}
                    {step === 0 && (
                        <div className="border border-border-subtlest rounded-2xl p-6 space-y-6 max-w-98.5">
                            <div className="p-2.5 w-fit mx-auto">
                                <Spinner size="lg" className="text-secondary" />
                            </div>
                            <div className="space-y-2 text-center">
                                <Sh0>Setting Things Up</Sh0>
                                <P className="text-text-subtlest">
                                    Please wait while we verify your session.
                                </P>
                            </div>
                            <div className="w-fit mx-auto">
                                <BazoLogo dark={true} className="md:h-8 md:w-8" />
                            </div>
                        </div>
                    )}

                    {/* Step - 1 */}
                    {
                        step === 1 &&
                        <div className="border border-border-subtlest rounded-2xl p-4 space-y-8 text-center max-w-98.5">
                            <div className="mx-auto w-fit hidden md:block">
                                <BazoLogo dark={true} />
                            </div>
                            <Sh2 className="font-semibold">Sign in or create an account to get started.</Sh2>
                            <div className="space-y-4">
                                <div className="border border-border-subtlest py-3 px-2.5 rounded-lg md:rounded-[10px] flex items-center gap-4 input-shadow">
                                    <div className="flex items-center gap-2">
                                        <Image src="/media/flag.svg" alt="flag" height={16} width={16} />
                                        <ButtonText className="text-text-subtlest font-medium">91-</ButtonText>
                                    </div>
                                    <Input
                                        placeholder="Enter your 10 digit mobile number"
                                        onChange={(e) => setNumber(e.target.value)}
                                        inputMode="decimal"
                                    />
                                </div>
                                <Button
                                    className="border border-primary w-full"
                                    onClick={() => requestOtp()}
                                    disabled={isRequesting}
                                >
                                    {isRequesting ? "Sending otp..." : "Continue"}
                                </Button>
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
                                                <div key={i} className="h-12 w-12 p-1 border border-border-subtlest bg-background rounded-[11px]">
                                                    <Input
                                                        ref={(el) => { otpRefs.current[i] = el }}
                                                        className="bg-background h-10 text-center"
                                                        maxLength={1}
                                                        inputMode="numeric"
                                                        value={otpDigits[i]}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/, '')
                                                            const updated = [...otpDigits]
                                                            updated[i] = val
                                                            setOtpDigits(updated)
                                                            if (val && i < 5) {
                                                                otpRefs.current[i + 1]?.focus()
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Backspace' && !otpDigits[i] && i > 0) {
                                                                otpRefs.current[i - 1]?.focus()
                                                            }
                                                        }}
                                                        onPaste={(e) => {
                                                            e.preventDefault()
                                                            const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
                                                            const updated = [...otpDigits]
                                                            for (let j = 0; j < pasted.length; j++) {
                                                                updated[j] = pasted[j]
                                                            }
                                                            setOtpDigits(updated)
                                                            const focusIndex = Math.min(pasted.length, 5)
                                                            otpRefs.current[focusIndex]?.focus()
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="text-center py-3.25 mt-4" onClick={() => {
                                    setStep(1)
                                    setNumber('')
                                }}>
                                    <ButtonText className="font-semibold text-secondary" >Use Another Number</ButtonText>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-center gap-2">
                                    <P>Didn't receive the code? </P>
                                    <div onClick={() => resendOtp()}>
                                        <LinkText className="font-semibold text-secondary">{isResending ? 'sending...' : 'Resend'}</LinkText>
                                    </div>
                                </div>
                                <Button
                                    className="border border-primary w-full"
                                    onClick={() => verifyOtp()}
                                    disabled={isVerifying}
                                >
                                    {isVerifying ? 'Verifying otp...' : 'Submit code'}
                                </Button>
                            </div>
                        </div>
                    }

                    {/* Application Form */}
                    {/* {<StatusLoading />} */}
                    {step === 3 &&
                        <>
                            {isStatusLoading && <StatusLoading />}
                            {applicationStatus?.hasApplication && applicationStatus.status === 'PENDING' && <ApplicationPending />}
                            {applicationStatus?.hasApplication && applicationStatus.status === 'ACCEPTED' && <ApplicationAccepted />}
                            {applicationStatus?.hasApplication && applicationStatus.status === 'REJECTED' && <ApplicationRejected />}
                            {applicationStatus && !applicationStatus.hasApplication && <ApplicationForm />}
                        </>
                    }
                </div>

                <BecomeHostFooter />
            </div>
        </section>
    )
}

export const BecomeHostFooter = () => {
    return (
        <div className="mt-10 md:mt-0 pb-4 md:pb-0 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-1">
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Terms of use</LinkText> <GoArrowUpRight size={16} /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Privacy policy</LinkText> <GoArrowUpRight size={16} /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Seller agreement</LinkText> <GoArrowUpRight size={16} /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Refund policy</LinkText> <GoArrowUpRight size={16} /></Link>
                <Link href="#" className="flex items-center gap-1 text-text-body"><LinkText>Cookies</LinkText> <GoArrowUpRight size={16} /></Link>
                <div className="flex items-center gap-4 ms-4">
                    <Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><SlSocialInstagram /></Link>
                    <Link href="#" className="inline-flex items-center gap-1 text-[#30302F]"><FaXTwitter /></Link>
                </div>
            </div>
            <div className="text-center flex flex-row gap-4 items-cetner justify-center mt-4 md:mt-0">
                <PXs className="text-text-subtlest">© 2026</PXs>
                <PXs className="text-text-subtlest">All right reserved by BAZO</PXs>
            </div>
        </div>
    )
}