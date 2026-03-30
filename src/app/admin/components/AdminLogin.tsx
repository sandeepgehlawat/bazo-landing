'use client'

import { useState, useRef, useEffect } from "react";
import { authApi } from "@/services/auth-api";

function generateDeviceId() {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem("device_id");
    if (!id) {
        id = "admin-web-" + crypto.randomUUID();
        localStorage.setItem("device_id", id);
    }
    return id;
}

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cooldown, setCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
        return () => clearTimeout(t);
    }, [cooldown]);

    async function handleRequestOtp() {
        if (phone.length !== 10) {
            setError("Enter a valid 10-digit phone number");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await authApi.requestOtp(phone);
            setStep("otp");
            setCooldown(30);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOtp() {
        const otpStr = otp.join("");
        if (otpStr.length !== 6) {
            setError("Enter the 6-digit OTP");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const deviceId = generateDeviceId();
            const data = await authApi.verifyOtp(phone, otpStr, deviceId);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            // Decode JWT to check role
            const payload = JSON.parse(atob(data.access_token.split(".")[1]));
            if (payload.role !== "ADMIN") {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setError("Access denied. Admin only.");
                return;
            }
            onLogin();
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    }

    async function handleResendOtp() {
        if (cooldown > 0) return;
        setLoading(true);
        setError("");
        try {
            await authApi.resendOtp(phone);
            setCooldown(30);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    }

    function handleOtpChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "Enter" && otp.join("").length === 6) {
            handleVerifyOtp();
        }
    }

    function handleOtpPaste(e: React.ClipboardEvent) {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
            newOtp[i] = pasted[i] || "";
        }
        setOtp(newOtp);
        const focusIndex = Math.min(pasted.length, 5);
        inputRefs.current[focusIndex]?.focus();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-1">Admin Panel</h1>
                <p className="text-gray-500 text-center text-sm mb-6">
                    {step === "phone" ? "Enter your admin phone number" : `OTP sent to +91 ${phone}`}
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-4">
                        {error}
                    </div>
                )}

                {step === "phone" ? (
                    <div>
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-400 transition">
                            <span className="px-3 text-gray-500 text-sm bg-gray-50 h-12 flex items-center border-r border-gray-200">+91</span>
                            <input
                                type="tel"
                                maxLength={10}
                                value={phone}
                                onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={e => e.key === "Enter" && handleRequestOtp()}
                                placeholder="Phone number"
                                className="flex-1 h-12 px-4 text-base outline-none"
                                autoFocus
                            />
                        </div>
                        <button
                            onClick={handleRequestOtp}
                            disabled={loading || phone.length !== 10}
                            className="w-full mt-4 h-12 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex gap-2 justify-center mb-4" onPaste={handleOtpPaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => { inputRefs.current[i] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleOtpChange(i, e.target.value)}
                                    onKeyDown={e => handleOtpKeyDown(i, e)}
                                    className="w-11 h-13 text-center text-xl font-semibold border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading || otp.join("").length !== 6}
                            className="w-full h-12 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); setError(""); }}
                                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                Change number
                            </button>
                            <button
                                onClick={handleResendOtp}
                                disabled={cooldown > 0 || loading}
                                className="text-sm text-black font-medium disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
