export function getDeviceId(): string {
    if (typeof window === "undefined") return "";
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        deviceId = `web_${Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')}`;
        localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
}