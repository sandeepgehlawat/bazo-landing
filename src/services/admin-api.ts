import api from "@/lib/api";

// Categories
async function getCategories(page = 1, limit = 10) {
    const res = await api.get(`/api/v1/admin/categories?page=${page}&limit=${limit}`);
    return res.data;
}

async function createCategory(data: { name: string; slug: string; image: string }) {
    const res = await api.post("/api/v1/admin/categories", data);
    return res.data;
}

async function updateCategory(categoryId: string, data: { name?: string; slug?: string; image?: string }) {
    const res = await api.put(`/api/v1/admin/categories/${categoryId}`, data);
    return res.data;
}

async function deleteCategory(categoryId: string) {
    const res = await api.delete(`/api/v1/admin/categories/${categoryId}`);
    return res.data;
}

// Tags
async function getTags(categoryId: string, page = 1, limit = 10) {
    const res = await api.get(`/api/v1/admin/categories/${categoryId}/tags?page=${page}&limit=${limit}`);
    return res.data;
}

async function createTag(categoryId: string, data: { name: string; slug: string }) {
    const res = await api.post(`/api/v1/admin/categories/${categoryId}/tags`, data);
    return res.data;
}

async function updateTag(tagId: string, data: { name?: string; slug?: string }) {
    const res = await api.put(`/api/v1/admin/tags/${tagId}`, data);
    return res.data;
}

async function deleteTag(tagId: string) {
    const res = await api.delete(`/api/v1/admin/tags/${tagId}`);
    return res.data;
}

// Subcategories
async function getSubcategories(categoryId: string, page = 1, limit = 10) {
    const res = await api.get(`/api/v1/admin/categories/${categoryId}/subcategories?page=${page}&limit=${limit}`);
    return res.data;
}

async function createSubcategory(categoryId: string, data: { name: string; slug: string }) {
    const res = await api.post(`/api/v1/admin/categories/${categoryId}/subcategories`, data);
    return res.data;
}

async function updateSubcategory(subcategoryId: string, data: { name?: string; slug?: string }) {
    const res = await api.put(`/api/v1/admin/subcategories/${subcategoryId}`, data);
    return res.data;
}

async function deleteSubcategory(subcategoryId: string) {
    const res = await api.delete(`/api/v1/admin/subcategories/${subcategoryId}`);
    return res.data;
}

// Subcategory Rules
async function getSubcategoryRules(subcategoryId: string, page = 1, limit = 10) {
    const res = await api.get(`/api/v1/admin/subcategories/${subcategoryId}/rules?page=${page}&limit=${limit}`);
    return res.data;
}

async function createSubcategoryRule(subcategoryId: string, data: { tag_id: string; is_required?: boolean }) {
    const res = await api.post(`/api/v1/admin/subcategories/${subcategoryId}/rules`, data);
    return res.data;
}

// Seller Applications
async function getSellerApplications(page = 1, limit = 10) {
    const res = await api.get(`/api/v1/admin/seller/applications?page=${page}&limit=${limit}`);
    return res.data;
}

async function updateSellerApplication(applicationId: string, data: { status: 1 | 2; cancel_reason?: string }) {
    const res = await api.put(`/api/v1/admin/seller/applications/${applicationId}`, data);
    return res.data;
}

// Sellers
async function getSellers(page = 1, limit = 10) {
    const res = await api.get(`/api/v1/admin/seller/get-all?page=${page}&limit=${limit}`);
    return res.data;
}

async function updateSellerStatus(sellerId: string, status: 0 | 1) {
    const res = await api.put(`/api/v1/admin/seller/update-status/${sellerId}`, { status });
    return res.data;
}

// Platform Config
async function getConfig() {
    const res = await api.get("/api/v1/admin/config");
    return res.data;
}

async function updateConfig(commissionRate: number) {
    const res = await api.put("/api/v1/admin/config", { commission_rate: commissionRate });
    return res.data;
}

// Payouts
async function getPendingPayouts() {
    const res = await api.get("/api/v1/admin/payouts/pending");
    return res.data;
}

async function settlePayout(sellerId: string, data: { utr_number?: string; notes?: string; period_start: string; period_end: string }) {
    const res = await api.post(`/api/v1/admin/payouts/settle/${sellerId}`, data);
    return res.data;
}

async function getPayoutHistory(page = 1, limit = 20) {
    const res = await api.get(`/api/v1/admin/payouts/history?page=${page}&limit=${limit}`);
    return res.data;
}

// Refunds
async function getPendingRefunds() {
    const res = await api.get("/api/v1/admin/refunds/pending");
    return res.data;
}

async function processRefund(orderId: string) {
    const res = await api.post(`/api/v1/admin/refunds/${orderId}`);
    return res.data;
}

export const adminApi = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getTags,
    createTag,
    updateTag,
    deleteTag,
    getSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoryRules,
    createSubcategoryRule,
    getSellerApplications,
    updateSellerApplication,
    getSellers,
    updateSellerStatus,
    getConfig,
    updateConfig,
    getPendingPayouts,
    settlePayout,
    getPayoutHistory,
    getPendingRefunds,
    processRefund,
};
