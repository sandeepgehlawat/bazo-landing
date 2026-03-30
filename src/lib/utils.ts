
export type Platform =
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

export function detectPlatform(url: string): Platform {
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

export function detectCommunityPlatform(url: string): Platform {
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