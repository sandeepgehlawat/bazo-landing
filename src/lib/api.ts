import axios from "axios";
const BackendUrl = 'http://192.168.1.9:8085'

const api = axios.create({
    baseURL: BackendUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 → attempt silent token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                const deviceId = localStorage.getItem("device_id");

                if (!refreshToken || !deviceId) throw new Error("No refresh token");

                const { data } = await axios.post(
                    `${BackendUrl}/api/v1/user/auth/token/refresh`,
                    { refresh_token: refreshToken, device_id: deviceId }
                );

                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);

                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);
            } catch {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                // window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
