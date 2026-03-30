'use client'

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/admin-api";

export default function ConfigPanel() {
    const queryClient = useQueryClient();
    const [rate, setRate] = useState("");
    const [saved, setSaved] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["admin-config"],
        queryFn: () => adminApi.getConfig(),
    });

    useEffect(() => {
        if (data?.config) {
            setRate(String(data.config.commission_rate * 100));
        }
    }, [data]);

    const updateMutation = useMutation({
        mutationFn: (commissionRate: number) => adminApi.updateConfig(commissionRate),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-config"] });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        },
    });

    function handleSave() {
        const numRate = parseFloat(rate);
        if (isNaN(numRate) || numRate < 0 || numRate > 100) return;
        updateMutation.mutate(numRate / 100);
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Platform Config</h2>

            <div className="bg-white border border-gray-200 rounded-xl p-5 max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Rate (%)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    Percentage taken from each seller transaction. Currently: {data?.config?.commission_rate ? (data.config.commission_rate * 100).toFixed(1) : "10"}%
                </p>
                <div className="flex gap-3">
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={rate}
                        onChange={e => setRate(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                    <button
                        onClick={handleSave}
                        disabled={updateMutation.isPending}
                        className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
                    >
                        {updateMutation.isPending ? "Saving..." : "Save"}
                    </button>
                </div>
                {saved && (
                    <p className="text-sm text-green-600 mt-2">Commission rate updated.</p>
                )}
                {updateMutation.isError && (
                    <p className="text-sm text-red-500 mt-2">Failed to update. Value must be between 0-100.</p>
                )}
            </div>
        </div>
    );
}
