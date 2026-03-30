'use client'

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/admin-api";

export default function PayoutsPanel() {
    const [tab, setTab] = useState<"pending" | "history">("pending");

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Payouts</h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-4">
                <button
                    onClick={() => setTab("pending")}
                    className={`px-4 py-1.5 text-sm rounded-md transition cursor-pointer ${tab === "pending" ? "bg-white font-medium shadow-sm" : "text-gray-600"}`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setTab("history")}
                    className={`px-4 py-1.5 text-sm rounded-md transition cursor-pointer ${tab === "history" ? "bg-white font-medium shadow-sm" : "text-gray-600"}`}
                >
                    History
                </button>
            </div>
            {tab === "pending" ? <PendingPayouts /> : <PayoutHistory />}
        </div>
    );
}

function PendingPayouts() {
    const queryClient = useQueryClient();
    const [settleId, setSettleId] = useState<string | null>(null);
    const [settleForm, setSettleForm] = useState({ utr_number: "", notes: "", period_start: "", period_end: "" });

    const { data, isLoading } = useQuery({
        queryKey: ["admin-pending-payouts"],
        queryFn: () => adminApi.getPendingPayouts(),
    });

    const settleMutation = useMutation({
        mutationFn: ({ sellerId, data }: { sellerId: string; data: any }) =>
            adminApi.settlePayout(sellerId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-pending-payouts"] });
            queryClient.invalidateQueries({ queryKey: ["admin-payout-history"] });
            setSettleId(null);
            setSettleForm({ utr_number: "", notes: "", period_start: "", period_end: "" });
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
        );
    }

    const sellers = data?.sellers ?? [];

    if (sellers.length === 0) {
        return <p className="text-gray-500">No pending payouts.</p>;
    }

    return (
        <div className="space-y-3">
            {sellers.map((seller: any) => (
                <div key={seller.seller_id} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{seller.display_name || seller.username || "Unknown"}</p>
                            <p className="text-sm text-gray-500">{seller.order_count} orders</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">₹{(seller.available_amount / 100).toFixed(2)}</p>
                            <button
                                onClick={() => setSettleId(settleId === seller.seller_id ? null : seller.seller_id)}
                                className="mt-1 px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                            >
                                Settle
                            </button>
                        </div>
                    </div>

                    {seller.bank && (
                        <div className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                            <span className="font-medium">{seller.bank.bank_name}</span> &middot; {seller.bank.acc_number} &middot; {seller.bank.ifsc_code}
                        </div>
                    )}

                    {settleId === seller.seller_id && (
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="date"
                                    value={settleForm.period_start}
                                    onChange={e => setSettleForm(p => ({ ...p, period_start: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                                    placeholder="Period start"
                                />
                                <input
                                    type="date"
                                    value={settleForm.period_end}
                                    onChange={e => setSettleForm(p => ({ ...p, period_end: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                                    placeholder="Period end"
                                />
                                <input
                                    value={settleForm.utr_number}
                                    onChange={e => setSettleForm(p => ({ ...p, utr_number: e.target.value }))}
                                    placeholder="UTR Number (optional)"
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                                />
                                <input
                                    value={settleForm.notes}
                                    onChange={e => setSettleForm(p => ({ ...p, notes: e.target.value }))}
                                    placeholder="Notes (optional)"
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                                />
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => settleMutation.mutate({
                                        sellerId: seller.seller_id,
                                        data: settleForm,
                                    })}
                                    disabled={!settleForm.period_start || !settleForm.period_end || settleMutation.isPending}
                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg disabled:opacity-50 cursor-pointer"
                                >
                                    {settleMutation.isPending ? "Settling..." : "Confirm Settlement"}
                                </button>
                                <button
                                    onClick={() => setSettleId(null)}
                                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function PayoutHistory() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["admin-payout-history", page],
        queryFn: () => adminApi.getPayoutHistory(page),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
        );
    }

    const payouts = data?.payouts ?? [];
    const pagination = data?.pagination;

    if (payouts.length === 0) {
        return <p className="text-gray-500">No payout history.</p>;
    }

    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-5 py-3 font-medium text-gray-600">Seller</th>
                            <th className="text-left px-5 py-3 font-medium text-gray-600">Amount</th>
                            <th className="text-left px-5 py-3 font-medium text-gray-600">Orders</th>
                            <th className="text-left px-5 py-3 font-medium text-gray-600">UTR</th>
                            <th className="text-left px-5 py-3 font-medium text-gray-600">Period</th>
                            <th className="text-left px-5 py-3 font-medium text-gray-600">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts.map((p: any) => (
                            <tr key={p.id} className="border-b border-gray-100 last:border-0">
                                <td className="px-5 py-3 font-medium">{p.seller_name || p.seller_username}</td>
                                <td className="px-5 py-3">₹{(p.amount / 100).toFixed(2)}</td>
                                <td className="px-5 py-3">{p.order_count}</td>
                                <td className="px-5 py-3 text-gray-500 text-xs font-mono">{p.utr_number || "-"}</td>
                                <td className="px-5 py-3 text-xs text-gray-500">
                                    {new Date(p.period_start).toLocaleDateString()} - {new Date(p.period_end).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-3 text-xs text-gray-500">
                                    {new Date(p.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && pagination.total_count > pagination.limit && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page <= 1}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">{page}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
