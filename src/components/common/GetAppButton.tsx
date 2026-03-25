import Image from "next/image";

export default function GetAppButton() {
    return (
        <Image src="/media/qr-code.svg" alt="qr-code" height={120} width={86} />
    );
}