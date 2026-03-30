import api from "@/lib/api";

// async function requestOtp(phone: string) {
//     const res = await api.post("/api/v1/user/auth/otp/request", { phone })
//     return res.data;
// }
const requestOtp = async (phone: string) => {
    try {
        const res = await api.post('/api/v1/user/auth/otp/request', { phone });
        return (res.data)
    } catch (error) {
        console.error('Failed to request OTP:', error);
        throw error;
    }
}

async function resendOtp(phone: string) {
    const res = await api.post("/api/v1/user/auth/otp/resend", { phone })
    return res.data;
}

async function verifyOtp(phone: string, otp: string, device_id: string) {
    const res = await api.post("/api/v1/user/auth/otp/verify", { phone, otp, device_id })
    return res.data;
}

async function logout(refresh_token: string, device_id: string) {
    const res = await api.post("/api/v1/user/auth/logout", { refresh_token, device_id })
    return res.data;
}

export const authApi = {
    requestOtp,
    resendOtp,
    verifyOtp,
    logout,
}


// export const authApi = {
//   requestOtp: (phone: string) =>
//     api.post("/auth/otp/request", { phone }),

//   resendOtp: (phone: string) =>
//     api.post("/auth/otp/resend", { phone }),

//   verifyOtp: (phone: string, otp: string, device_id: string) =>
//     api.post("/auth/otp/verify", { phone, otp, device_id }),

//   logout: (refresh_token: string, device_id: string) =>
//     api.post("/auth/logout", { refresh_token, device_id }),
// };
