"use client";

import { useState } from "react";
import BazoLogo from "@/components/common/BazoLogo";
import { ButtonText, LinkText, P, PSm, PXs, Sh0, Sh2 } from "@/components/typography";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft01Icon, CancelCircleIcon, CheckmarkCircle03Icon, DiscordIcon, Facebook01Icon, FirstBracketCircleIcon, InstagramIcon, Linkedin01Icon, NewTwitterRectangleIcon, RedditIcon, SlackIcon, TelegramIcon, TwitchIcon, WhatsappIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import type { IconSvgElement } from "@hugeicons/react";
import Select from "@/components/ui/Select";
import { detectCommunityPlatform, detectPlatform, Platform } from "@/lib/utils";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/query-client";

const icons: Record<Platform, IconSvgElement> = {
    "Facebook": Facebook01Icon,
    "Instagram": InstagramIcon,
    "YouTube": YoutubeIcon,
    "Twitter": NewTwitterRectangleIcon,
    "LinkedIn": Linkedin01Icon,
    "Twitch": TwitchIcon,
    "Discord": DiscordIcon,
    "Telegram": TelegramIcon,
    "WhatsApp": WhatsappIcon,
    "Reddit": RedditIcon,
    "Slack": SlackIcon,
    "Other": SlackIcon,
}

export default function ApplicationForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)

    // Step 1 — Personal
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    // Step 2 — Details
    const [isContentCreator, setIsContentCreator] = useState(false);
    const [isCommunityGroup, setIsCommunityGroup] = useState(false);
    const [hasShop, setHasShop] = useState(false);
    const [isBrandOwner, setIsBrandOwner] = useState(false);

    const [socialLinks, setSocialLinks] = useState<string[]>([""]);
    const [communityLinks, setCommunityLinks] = useState<string[]>([""]);

    // Shop fields
    const [storeType, setStoreType] = useState<string[]>([]);
    const [shopAddress, setShopAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [state, setState] = useState('')
    const [gstNumber, setGstNumber] = useState('')

    // Brand fields
    const [brandName, setBrandName] = useState('')
    const [productOrigin, setProductOrigin] = useState('')
    const [productWebsite, setProductWebsite] = useState('')

    // Step 3 — What will you sell
    const [productCategories, setProductCategories] = useState<string[]>([]);
    const [about, setAbout] = useState('')

    // Step 4 — Agreement
    const [agreement, setAgrement] = useState({
        terms1: false,
        terms2: false,
        terms3: false,
    })

    // Submit mutation
    const { mutate: submitApplication, isPending: isSubmitting } = useMutation({
        mutationFn: async () => {
            const res = await api.post('/api/v1/seller/apply', {
                first_name: firstName,
                last_name: lastName || undefined,
                email,
                is_content_creator: isContentCreator,
                social_links: isContentCreator ? socialLinks.filter(Boolean) : undefined,
                has_community: isCommunityGroup,
                community_links: isCommunityGroup ? communityLinks.filter(Boolean) : undefined,
                has_shop: hasShop,
                store_types: hasShop ? storeType : undefined,
                shop_address: hasShop ? shopAddress : undefined,
                postal_code: hasShop ? postalCode : undefined,
                state: hasShop ? state : undefined,
                gst_number: hasShop && gstNumber ? gstNumber : undefined,
                is_brand_owner: isBrandOwner,
                brand_name: isBrandOwner ? brandName : undefined,
                product_origin: isBrandOwner ? productOrigin : undefined,
                product_website: isBrandOwner && productWebsite ? productWebsite : undefined,
                product_categories: productCategories,
                about,
            })
            return res.data
        },
        onSuccess: () => {
            setStep(5)
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['get-application-status'] })
            }, 3000)
        },
    })

    // Social links helpers
    const updateLink = (index: number, value: string) => {
        const updated = [...socialLinks];
        updated[index] = value;
        setSocialLinks(updated);
    };
    const addLink = () => setSocialLinks([...socialLinks, ""]);
    const removeLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));

    // Community links helpers
    const updateCommunityLink = (index: number, value: string) => {
        const updated = [...communityLinks];
        updated[index] = value;
        setCommunityLinks(updated);
    };
    const addCommunityLink = () => setCommunityLinks([...communityLinks, ""]);
    const removeCommunityLink = (index: number) => setCommunityLinks(communityLinks.filter((_, i) => i !== index));

    const handleNext = () => {
        if (step === 4) {
            submitApplication()
        } else {
            setStep((prev) => prev + 1)
        }
    }

    return (
        <div className="space-y-6 max-w-98.5">
            {
                step !== 5 &&
                <>
                    {
                        step > 1 &&
                        <Button size="md" variant="outline" className="px-3" onClick={() => setStep((prev) => prev !== 1 ? prev - 1 : prev)}>
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2.5} />
                            <ButtonText className="font-semibold">Back</ButtonText>
                        </Button>
                    }
                    <div className="space-y-1">
                        <Sh2 className="font-semibold">Step {step}/4</Sh2>
                        <div className="grid grid-cols-4 gap-2">
                            {
                                Array.from({ length: 4 }).map((_, i) => {
                                    const index = i + 1
                                    return (
                                        <div key={i} className="bg-background rounded-md">
                                            <div className={`bg-secondary ${step > index ? 'w-full' : 'w-[20%]'} h-1 rounded-md`} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            }
            {
                step !== 5 &&
                <div className="border border-border-subtlest rounded-2xl overflow-hidden">
                    <div className="max-h-115 overflow-y-auto cus-scrollbar p-4 space-y-8">
                        <div className="mx-auto w-fit">
                            <BazoLogo dark={true} />
                        </div>
                        {
                            step === 1 &&
                            <>
                                <Sh2 className="font-semibold text-center">Tell us about yourself</Sh2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            variant="outline"
                                            inputSize="sm"
                                            label="First Name *"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <Input
                                            variant="outline"
                                            inputSize="sm"
                                            label="Last Name"
                                            placeholder="Last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>

                                    <Input
                                        variant="outline"
                                        inputSize="sm"
                                        label="Email Address *"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </>
                        }

                        {
                            step === 2 &&
                            <>
                                <div className="p-2.5 flex gap-2.5 rounded-l-md rounded-r-xl border-l-2 border-dark bg-background">
                                    <HugeiconsIcon icon={FirstBracketCircleIcon} size={24} strokeWidth={2} />
                                    <PSm className="text-start font-semibold">Select only what applies to you Choose the options that match how you&apos;ll sell on Bazo</PSm>
                                </div>
                                <Sh2 className="font-semibold text-center mb-5">Your details</Sh2>
                                <div className="px-4 space-y-1">
                                    {/* Content Creator */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 py-3">
                                            <Checkbox checkboxSize="lg" checked={isContentCreator} onCheckedChange={(checked) => setIsContentCreator(checked)} />
                                            <P className="font-medium text-dark">Are you a content creator? *</P>
                                        </div>
                                        {isContentCreator && (
                                            <div className="space-y-3 mb-5">
                                                <PXs className="font-semibold text-start mb-1">Share you social media links *</PXs>
                                                {socialLinks.map((link, index) => (
                                                    <div key={index} className="flex items-end gap-2">
                                                        <div className="flex-1">
                                                            <Input
                                                                variant="outline"
                                                                inputSize="sm"
                                                                placeholder="https://instagram.com/yourhandle"
                                                                value={link}
                                                                onChange={(e) => updateLink(index, e.target.value)}
                                                            />
                                                        </div>
                                                        {link && detectPlatform(link) && (
                                                            <div className="bg-accent p-1 rounded-lg border border-border-subtlest">
                                                                <HugeiconsIcon icon={icons[detectPlatform(link)]} size={24} />
                                                            </div>
                                                        )}
                                                        {socialLinks.length > 1 && (
                                                            <Button variant="icon" onClick={() => removeLink(index)}>
                                                                <HugeiconsIcon icon={CancelCircleIcon} size={18} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="w-fit">
                                                    <Button variant="outline" size="sm" onClick={addLink} className="bg-background text-xs">Add more links</Button>
                                                </div>

                                            </div>
                                        )}
                                    </div>

                                    {/* Community Group */}
                                    <div className="flex items-center gap-4 py-3">
                                        <Checkbox checkboxSize="lg" checked={isCommunityGroup} onCheckedChange={(checked) => setIsCommunityGroup(checked)} />
                                        <P className="font-medium text-dark">Do You have a community group? *</P>
                                    </div>
                                    {isCommunityGroup && (
                                        <div className="space-y-3">
                                            <PXs className="font-semibold text-start mb-1">Community Group URLs *</PXs>
                                            {communityLinks.map((link, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="flex-1">
                                                        <Input
                                                            variant="outline"
                                                            inputSize="sm"
                                                            placeholder="https://discord.gg/yourcommunity"
                                                            value={link}
                                                            onChange={(e) => updateCommunityLink(index, e.target.value)}
                                                        />
                                                    </div>
                                                    {link && detectCommunityPlatform(link) && (
                                                        <div className="bg-accent p-1 rounded-lg border border-border-subtlest">
                                                            <HugeiconsIcon icon={icons[detectCommunityPlatform(link)]} size={24} />
                                                        </div>
                                                    )}
                                                    {communityLinks.length > 1 && (
                                                        <Button variant="icon" size="icon" onClick={() => removeCommunityLink(index)}>
                                                            <HugeiconsIcon icon={CancelCircleIcon} size={18} />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="w-fit">
                                                <Button variant="outline" size="sm" onClick={addCommunityLink} className="bg-background text-xs">Add more links</Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Shop */}
                                    <div className="flex items-center gap-4 py-3">
                                        <Checkbox checkboxSize="lg" checked={hasShop} onCheckedChange={(checked) => setHasShop(checked)} />
                                        <P className="font-medium text-dark">Do You have a Shop? *</P>
                                    </div>
                                    {
                                        hasShop &&
                                        <div className="space-y-2">
                                            <Select
                                                variant="outline"
                                                selectSize="sm"
                                                label="Type of Store *"
                                                placeholder="Select"
                                                maxSelect={3}
                                                options={[
                                                    { label: "Clothing", value: "clothing" },
                                                    { label: "Beauty", value: "beauty" },
                                                    { label: "Electronics", value: "electronics" },
                                                    { label: "Other", value: "other" },
                                                ]}
                                                value={storeType}
                                                onChange={setStoreType}
                                            />
                                            <Input
                                                inputSize="sm"
                                                variant="outline"
                                                label="Shop Address *"
                                                placeholder="shop address"
                                                value={shopAddress}
                                                onChange={(e) => setShopAddress(e.target.value)}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    inputSize="sm"
                                                    variant="outline"
                                                    label="Postal code *"
                                                    placeholder="123456"
                                                    inputMode="decimal"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                />
                                                <Input
                                                    inputSize="sm"
                                                    variant="outline"
                                                    label="State*"
                                                    placeholder="select"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                />
                                            </div>
                                            <Input
                                                inputSize="sm"
                                                variant="outline"
                                                label="GSTIN number"
                                                placeholder="Enter you GSTIN number here"
                                                value={gstNumber}
                                                onChange={(e) => setGstNumber(e.target.value)}
                                            />
                                        </div>
                                    }

                                    {/* Brand */}
                                    <div className="flex gap-4 py-3">
                                        <Checkbox checkboxSize="lg" checked={isBrandOwner} onCheckedChange={(checked) => setIsBrandOwner(checked)} />
                                        <P className="font-medium text-dark">Are you a product owner or brand owner? *</P>
                                    </div>
                                    {
                                        isBrandOwner &&
                                        <div className="space-y-2">
                                            <Input
                                                inputSize="sm"
                                                variant="outline"
                                                label="Brand name *"
                                                placeholder="Brand name"
                                                value={brandName}
                                                onChange={(e) => setBrandName(e.target.value)}
                                            />
                                            <Input
                                                inputSize="sm"
                                                variant="outline"
                                                label="Where are your products made? *"
                                                placeholder="Describe your product"
                                                value={productOrigin}
                                                onChange={(e) => setProductOrigin(e.target.value)}
                                            />
                                            <Input
                                                inputSize="sm"
                                                variant="outline"
                                                label="Product Website"
                                                placeholder="website"
                                                value={productWebsite}
                                                onChange={(e) => setProductWebsite(e.target.value)}
                                            />
                                        </div>
                                    }
                                </div>
                            </>
                        }

                        {
                            step === 3 &&
                            <>
                                <Sh2 className="font-semibold text-center">What Will You Sell?</Sh2>
                                <div className="space-y-5">
                                    <div className="space-y-1">
                                        <Select
                                            variant="outline"
                                            selectSize="sm"
                                            label="Product Category*"
                                            placeholder="Select"
                                            maxSelect={3}
                                            options={[
                                                { label: "Fashion", value: "fashion" },
                                                { label: "Beauty", value: "beauty" },
                                                { label: "Electronics", value: "electronics" },
                                                { label: "Other", value: "other" },
                                            ]}
                                            value={productCategories}
                                            onChange={setProductCategories}
                                        />
                                        <PSm className="font-normal italic">Can select max 3 categories</PSm>
                                    </div>

                                    <Input
                                        variant="outline"
                                        inputSize="sm"
                                        label="Tell us about yourself *"
                                        placeholder="Tell us about your shop, brand, or content and what you plan to sell."
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </div>
                            </>
                        }

                        {
                            step === 4 &&
                            <>
                                <Sh2 className="font-semibold text-center">Seller Agreement?</Sh2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <Checkbox checkboxSize="lg" checked={agreement.terms1} onCheckedChange={(checked) => setAgrement({ ...agreement, terms1: checked })} />
                                        <P className="font-medium text-dark">I understand that I am responsible for shipping sold items directly to buyers.</P>
                                    </div>
                                    <div className="flex gap-4">
                                        <Checkbox checkboxSize="lg" checked={agreement.terms2} onCheckedChange={(checked) => setAgrement({ ...agreement, terms2: checked })} />
                                        <div className="flex items-center flex-wrap gap-x-1.5">
                                            <P className="font-medium text-dark">I agree to the</P>
                                            <Link href="#"><LinkText className="text-secondary"> Seller agreement</LinkText></Link>
                                            <P className="font-medium text-dark">and </P>
                                            <Link href="#"><LinkText className="text-secondary">terms of use</LinkText></Link>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Checkbox checkboxSize="lg" checked={agreement.terms3} onCheckedChange={(checked) => setAgrement({ ...agreement, terms3: checked })} />
                                        <P className="font-medium text-dark">I confirm that items listed will be accurately described</P>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
            {
                step === 5 &&
                <div className="border border-border-subtlest rounded-2xl p-4 space-y-6">
                    <div className="bg-accent p-2.5 rounded-full w-fit mx-auto">
                        <HugeiconsIcon icon={CheckmarkCircle03Icon} size={27} strokeWidth={1.5} className="text-secondary" />
                    </div>
                    <div className="space-y-2 text-center">
                        <Sh0>Your application has been submitted</Sh0>
                        <P className="text-text-subtlest">Our team will review your application and get back to you shortly.</P>
                    </div>
                    <div className="w-fit mx-auto">
                        <BazoLogo dark={true} className="md:h-8 md:w-8" />
                    </div>
                </div>
            }
            {
                step !== 5 ?
                    <Button
                        className="border border-primary w-full"
                        onClick={handleNext}
                        disabled={isSubmitting}
                    >
                        {step === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Next'}
                    </Button>
                    :
                    <Button className="border border-primary w-full" onClick={() => router.push('/')}>Back to Home</Button>
            }
        </div >
    );
}
