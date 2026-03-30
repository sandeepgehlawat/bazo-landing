import BazoLogo from "@/components/common/BazoLogo";
import { P, Sh0 } from "@/components/typography";
import Spinner from "@/components/ui/Spinner";
import { CheckmarkCircle03Icon, Clock01Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ApplicationPending() {
    return (
        <div className="border border-border-subtlest rounded-2xl p-6 space-y-6 max-w-98.5">
            <div className="bg-amber-50 p-2.5 rounded-full w-fit mx-auto">
                <HugeiconsIcon icon={Clock01Icon} size={27} strokeWidth={1.5} className="text-amber-500" />
            </div>
            <div className="space-y-2 text-center">
                <Sh0>Application Under Review</Sh0>
                <P className="text-text-subtlest">
                    Your application is being reviewed by our team. We&apos;ll notify you once a decision has been made.
                </P>
            </div>
            <div className="w-fit mx-auto">
                <BazoLogo dark={true} className="md:h-8 md:w-8" />
            </div>
        </div>
    );
}

export function ApplicationAccepted() {
    return (
        <div className="border border-border-subtlest rounded-2xl p-6 space-y-6 max-w-98.5">
            <div className="bg-accent p-2.5 rounded-full w-fit mx-auto">
                <HugeiconsIcon icon={CheckmarkCircle03Icon} size={27} strokeWidth={1.5} className="text-secondary" />
            </div>
            <div className="space-y-2 text-center">
                <Sh0>You&apos;re Approved!</Sh0>
                <P className="text-text-subtlest">
                    Congratulations! Your application has been accepted. Download the app and start selling on Bazo.
                </P>
            </div>
            <div className="w-fit mx-auto">
                <BazoLogo dark={true} className="md:h-8 md:w-8" />
            </div>
        </div>
    );
}

export function ApplicationRejected() {
    return (
        <div className="border border-border-subtlest rounded-2xl p-6 space-y-6 max-w-98.5">
            <div className="bg-red-50 p-2.5 rounded-full w-fit mx-auto">
                <HugeiconsIcon icon={CancelCircleIcon} size={27} strokeWidth={1.5} className="text-red-500" />
            </div>
            <div className="space-y-2 text-center">
                <Sh0>Application Not Approved</Sh0>
                <P className="text-text-subtlest">
                    Unfortunately, your application was not approved at this time. You can reach out to our support team for more details.
                </P>
            </div>
            <div className="w-fit mx-auto">
                <BazoLogo dark={true} className="md:h-8 md:w-8" />
            </div>
        </div>
    );
}

export function StatusLoading() {
    return (
        <div className="border border-border-subtlest rounded-2xl p-6 space-y-6 max-w-98.5">
            <div className="p-2.5 w-fit mx-auto">
                <Spinner size="lg" className="text-secondary" />
            </div>
            <div className="space-y-2 text-center">
                <Sh0>Checking Your Application</Sh0>
                <P className="text-text-subtlest">
                    Please wait while we check your application status.
                </P>
            </div>
            <div className="w-fit mx-auto">
                <BazoLogo dark={true} className="md:h-8 md:w-8" />
            </div>
        </div>
    );
}


