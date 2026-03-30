import api from "@/lib/api";

async function getApplicationStatus() {
    const res = await api.get('/api/v1/seller/application-status')
    return res.data;
}

async function submitApplication(data: any) {
    const res = await api.post('/api/v1/seller/apply', data)
    return res.data;
}
export const sellerApi = {
    submitApplication,
    getApplicationStatus
}