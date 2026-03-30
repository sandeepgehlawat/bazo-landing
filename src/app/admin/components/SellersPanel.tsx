'use client'

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/admin-api";

export default function SellersPanel() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["admin-sellers", page],
        queryFn: () => adminApi.getSellers(page),
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: 0 | 1 }) =>
            adminApi.updateSellerStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-sellers"] });
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
    const pagination = data?.pagination;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Sellers</h2>

            {sellers.length === 0 ? (
                <p className="text-gray-500">No sellers found.</p>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-5 py-3 font-medium text-gray-600">Username</th>
                                <th className="text-left px-5 py-3 font-medium text-gray-600">Phone</th>
                                <th className="text-left px-5 py-3 font-medium text-gray-600">ID</th>
                                <th className="text-right px-5 py-3 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((seller: any) => (
                                <tr key={seller.id} className="border-b border-gray-100 last:border-0">
                                    <td className="px-5 py-3 font-medium">{seller.user?.username ?? "-"}</td>
                                    <td className="px-5 py-3 text-gray-600">{seller.user?.phone ?? "-"}</td>
                                    <td className="px-5 py-3 text-gray-400 text-xs font-mono">{seller.id}</td>
                                    <td className="px-5 py-3 text-right">
                                        <button
                                            onClick={() => statusMutation.mutate({ id: seller.id, status: 0 })}
                                            disabled={statusMutation.isPending}
                                            className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 cursor-pointer mr-2"
                                        >
                                            Block
                                        </button>
                                        <button
                                            onClick={() => statusMutation.mutate({ id: seller.id, status: 1 })}
                                            disabled={statusMutation.isPending}
                                            className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 disabled:opacity-50 cursor-pointer"
                                        >
                                            Activate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page <= 1}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">{page} / {pagination.total_pages}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= pagination.total_pages}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
