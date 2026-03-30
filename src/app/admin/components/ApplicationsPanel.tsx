'use client'

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/admin-api";
import Button from "@/components/ui/Button";

export default function ApplicationsPanel() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [rejectId, setRejectId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["admin-applications", page],
        queryFn: () => adminApi.getSellerApplications(page),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, status, cancel_reason }: { id: string; status: 1 | 2; cancel_reason?: string }) =>
            adminApi.updateSellerApplication(id, { status, cancel_reason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
            setRejectId(null);
            setRejectReason("");
        },
    });

    if (isLoading) return <LoadingState />;
    const applications = data?.applications ?? [];
    const pagination = data?.pagination;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Host Applications</h2>

            {applications.length === 0 ? (
                <p className="text-gray-500">No applications found.</p>
            ) : (
                <div className="space-y-3">
                    {applications.map((app: any) => (
                        <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{app.first_name} {app.last_name}</p>
                                    <p className="text-sm text-gray-500">{app.email}</p>
                                    {app.shop_name && <p className="text-sm text-gray-500">Shop: {app.shop_name}</p>}
                                </div>
                                <StatusBadge status={app.status} />
                            </div>

                            {app.gst_number && (
                                <p className="text-sm text-gray-600 mt-2">GST: {app.gst_number}</p>
                            )}

                            {app.status === "PENDING" && (
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        onClick={() => updateMutation.mutate({ id: app.id, status: 1 })}
                                        disabled={updateMutation.isPending}
                                        className="disabled:opacity-50 border border-secondary"
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={() => setRejectId(app.id)}
                                        disabled={updateMutation.isPending}
                                        className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}

                            {rejectId === app.id && (
                                <div className="mt-3 flex gap-2">
                                    <input
                                        value={rejectReason}
                                        onChange={e => setRejectReason(e.target.value)}
                                        placeholder="Rejection reason..."
                                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                                    />
                                    <button
                                        onClick={() => updateMutation.mutate({ id: app.id, status: 2, cancel_reason: rejectReason })}
                                        disabled={!rejectReason.trim() || updateMutation.isPending}
                                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg disabled:opacity-50 cursor-pointer"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => { setRejectId(null); setRejectReason(""); }}
                                        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {app.cancel_reason && app.status === "REJECTED" && (
                                <p className="text-sm text-red-500 mt-2">Reason: {app.cancel_reason}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {pagination && pagination.total_pages > 1 && (
                <Pagination page={page} totalPages={pagination.total_pages} onChange={setPage} />
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        ACCEPTED: "bg-green-100 text-green-700",
        REJECTED: "bg-red-100 text-red-700",
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="text-sm text-gray-600">
                {page} / {totalPages}
            </span>
            <button
                onClick={() => onChange(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
        </div>
    );
}
