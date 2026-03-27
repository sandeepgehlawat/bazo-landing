"use client";

import { useState } from "react";
import BazoLogo from "@/components/common/BazoLogo";
import { ButtonText, LinkText, P, PSm, PXs, Sh0, Sh2 } from "@/components/typography";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Switch from "@/components/ui/Switch";
import { ArrowLeft01Icon, CancelCircleIcon, CheckmarkCircle03Icon, DiscordIcon, Facebook01Icon, FirstBracketCircleIcon, InstagramIcon, Linkedin01Icon, NewTwitterRectangleIcon, RedditIcon, SlackIcon, TelegramIcon, TwitchIcon, WhatsappIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import type { IconSvgElement } from "@hugeicons/react";
import { div } from "motion/react-client";
import Select from "@/components/ui/Select";

type Platform =
    | "Facebook"
    | "Instagram"
    | "YouTube"
    | "Twitter"
    | "LinkedIn"
    | "Twitch"
    | "Discord"
    | "Telegram"
    | "WhatsApp"
    | "Reddit"
    | "Slack"
    | "Other";
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

function detectPlatform(url: string): Platform {
    const hosts: Record<string, Platform> = {
        "youtube.com": "YouTube",
        "youtu.be": "YouTube",
        "instagram.com": "Instagram",
        "twitter.com": "Twitter",
        "x.com": "Twitter",
        "facebook.com": "Facebook",
        "linkedin.com": "LinkedIn",
        "twitch.tv": "Twitch",
    };
    try {
        const hostname = new URL(url).hostname.replace("www.", "");
        return hosts[hostname] || "Other";
    } catch {
        return "Other";
    }
}

function detectCommunityPlatform(url: string): Platform {
    const hosts: Record<string, Platform> = {
        "facebook.com": "Facebook",
        "discord.gg": "Discord",
        "discord.com": "Discord",
        "t.me": "Telegram",
        "telegram.me": "Telegram",
        "reddit.com": "Reddit",
        "whatsapp.com": "WhatsApp",
        "chat.whatsapp.com": "WhatsApp",
        "slack.com": "Slack",
    };
    try {
        const hostname = new URL(url).hostname.replace("www.", "");
        return hosts[hostname] || "Other";
    } catch {
        return "Other";
    }
}

export default function ApplicationForm() {
    const [step, setStep] = useState(1)
    const [isContentCreator, setIsContentCreator] = useState(false);
    const [isCommunityGroup, setIsCommunityGroup] = useState(false);
    const [isShop, setIsShop] = useState(false);
    const [isBrand, setIsBrand] = useState(false);
    const [socialLinks, setSocialLinks] = useState<string[]>([""]);
    const [communityLinks, setCommunityLinks] = useState<string[]>([""]);
    const [agreement, setAgrement] = useState({
        terms1: false,
        terms2: false,
        terms3: false,
    })

    const [selected, setSelected] = useState<string[]>([]);
    const [storeType, setStoreType] = useState<string[]>([]);

    const updateLink = (index: number, value: string) => {
        const updated = [...socialLinks];
        updated[index] = value;
        setSocialLinks(updated);
    };

    const addLink = () => {
        setSocialLinks([...socialLinks, ""]);
    };

    const removeLink = (index: number) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

    const updateCommunityLink = (index: number, value: string) => {
        const updated = [...communityLinks];
        updated[index] = value;
        setCommunityLinks(updated);
    };

    const addCommunityLink = () => {
        setCommunityLinks([...communityLinks, ""]);
    };

    const removeCommunityLink = (index: number) => {
        setCommunityLinks(communityLinks.filter((_, i) => i !== index));
    };

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
                                        />
                                        <Input
                                            variant="outline"
                                            inputSize="sm"
                                            label="Last Name"
                                            placeholder="Last name"
                                        />
                                    </div>

                                    <Input
                                        variant="outline"
                                        inputSize="sm"
                                        label="Email Address *"
                                        placeholder="Enter email address"
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
                                        <Checkbox checkboxSize="lg" checked={isShop} onCheckedChange={(checked) => setIsShop(checked)} />
                                        <P className="font-medium text-dark">Do You have a Shop? *</P>
                                    </div>
                                    {
                                        isShop &&
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
                                            <Input inputSize="sm" variant="outline" label="Shop Address *" placeholder="shop address" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input inputSize="sm" variant="outline" label="Postal code *" placeholder="123456" inputMode="decimal" />
                                                <Input inputSize="sm" variant="outline" label="State*" placeholder="select" />
                                            </div>
                                            <Input inputSize="sm" variant="outline" label="GSTIN number" placeholder="Enter you GSTIN number here" />
                                        </div>
                                    }

                                    {/* Brand */}
                                    <div className="flex gap-4 py-3">
                                        <Checkbox checkboxSize="lg" checked={isBrand} onCheckedChange={(checked) => setIsBrand(checked)} />
                                        <P className="font-medium text-dark">Are you a product owner or brand owner? *</P>
                                    </div>
                                    {
                                        isBrand &&
                                        <div className="space-y-2">
                                            <Input inputSize="sm" variant="outline" label="Brand name *" placeholder="Brand name" />
                                            <Input inputSize="sm" variant="outline" label="Where are your products made? *" placeholder="Describe your product" />
                                            <Input inputSize="sm" variant="outline" label="Product Website" placeholder="website" />
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
                                            value={selected}
                                            onChange={setSelected}
                                        />
                                        <PSm className="font-normal italic">Can select max 3 categories</PSm>
                                    </div>

                                    <Input
                                        variant="outline"
                                        inputSize="sm"
                                        label="Tell us about yourself *"
                                        placeholder="Tell us about your shop, brand, or content and what you plan to sell."
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
                    <Button className="border border-primary w-full" onClick={() => setStep((prev) => prev + 1)}>{step === 4 ? 'Submit Application' : 'Next'}</Button>
                    :
                    <Button className="border border-primary w-full">Back to Home</Button>
            }
        </div >
    );
}