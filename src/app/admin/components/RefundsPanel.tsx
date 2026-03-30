'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/admin-api";

export default function RefundsPanel() {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["admin-pending-refunds"],
        queryFn: () => adminApi.getPendingRefunds(),
    });

    const refundMutation = useMutation({
        mutationFn: (orderId: string) => adminApi.processRefund(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-pending-refunds"] });
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
        );
    }

    const orders = data?.orders ?? [];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Pending Refunds</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">No pending refunds.</p>
            ) : (
                <div className="space-y-3">
                    {orders.map((order: any) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                    {order.product?.image && (
                                        <img
                                            src={order.product.image}
                                            alt={order.product.title}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-sm">{order.product?.title || "Unknown Product"}</p>
                                        <p className="text-xs text-gray-500">
                                            Buyer: {order.user?.display_name || order.user?.username} ({order.user?.phone})
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Seller: {order.seller?.user?.display_name || order.seller?.user?.username}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">₹{(order.amount / 100).toFixed(2)}</p>
                                    {order.shipping_cost > 0 && (
                                        <p className="text-xs text-gray-500">+ ₹{(order.shipping_cost / 100).toFixed(2)} shipping</p>
                                    )}
                                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                                        order.shipment_status === "RTO" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                                    }`}>
                                        {order.shipment_status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-400 font-mono">{order.razorpay_payment_id}</p>
                                <button
                                    onClick={() => {
                                        if (confirm(`Refund ₹${(order.amount / 100).toFixed(2)} to ${order.user?.display_name || order.user?.phone}?`)) {
                                            refundMutation.mutate(order.id);
                                        }
                                    }}
                                    disabled={refundMutation.isPending}
                                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {refundMutation.isPending ? "Processing..." : "Process Refund"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
