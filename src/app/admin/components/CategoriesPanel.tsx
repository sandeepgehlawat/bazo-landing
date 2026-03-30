'use client'

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/admin-api";

export default function CategoriesPanel() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", slug: "", image: "" });
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["admin-categories", page],
        queryFn: () => adminApi.getCategories(page),
    });

    const createMutation = useMutation({
        mutationFn: (data: { name: string; slug: string; image: string }) =>
            adminApi.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: { name?: string; slug?: string; image?: string } }) =>
            adminApi.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminApi.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
        },
    });

    function resetForm() {
        setShowForm(false);
        setEditId(null);
        setForm({ name: "", slug: "", image: "" });
    }

    function startEdit(cat: any) {
        setEditId(cat.id);
        setForm({ name: cat.name, slug: cat.slug, image: cat.image || "" });
        setShowForm(true);
    }

    function handleSubmit() {
        if (!form.name.trim() || !form.slug.trim()) return;
        if (editId) {
            updateMutation.mutate({ id: editId, data: form });
        } else {
            createMutation.mutate(form);
        }
    }

    function handleNameChange(value: string) {
        setForm(prev => ({
            ...prev,
            name: value,
            slug: editId ? prev.slug : value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        }));
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
        );
    }

    const categories = data?.categories ?? [];
    const pagination = data?.pagination;

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Categories</h2>
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                    {showForm ? "Cancel" : "Add Category"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
                    <div className="grid grid-cols-3 gap-3">
                        <input
                            value={form.name}
                            onChange={e => handleNameChange(e.target.value)}
                            placeholder="Name"
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                        />
                        <input
                            value={form.slug}
                            onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                            placeholder="Slug"
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                        />
                        <input
                            value={form.image}
                            onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                            placeholder="Image URL"
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!form.name.trim() || !form.slug.trim() || createMutation.isPending || updateMutation.isPending}
                        className="mt-3 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
                    >
                        {editId ? "Update" : "Create"}
                    </button>
                </div>
            )}

            {categories.length === 0 ? (
                <p className="text-gray-500">No categories yet.</p>
            ) : (
                <div className="space-y-2">
                    {categories.map((cat: any) => (
                        <div key={cat.id} className="bg-white border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between px-5 py-3">
                                <div
                                    className="flex items-center gap-3 cursor-pointer flex-1"
                                    onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
                                >
                                    {cat.image && (
                                        <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg object-cover" />
                                    )}
                                    <div>
                                        <p className="font-medium text-sm">{cat.name}</p>
                                        <p className="text-xs text-gray-400">{cat.slug}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(cat)}
                                        className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => { if (confirm("Delete this category?")) deleteMutation.mutate(cat.id); }}
                                        disabled={deleteMutation.isPending}
                                        className="px-3 py-1.5 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {expandedId === cat.id && (
                                <div className="border-t border-gray-100 px-5 py-4">
                                    <SubcategoriesSection categoryId={cat.id} />
                                    <TagsSection categoryId={cat.id} />
                                </div>
                            )}
                        </div>
                    ))}
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

function SubcategoriesSection({ categoryId }: { categoryId: string }) {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ name: "", slug: "" });
    const [showForm, setShowForm] = useState(false);

    const { data } = useQuery({
        queryKey: ["admin-subcategories", categoryId],
        queryFn: () => adminApi.getSubcategories(categoryId, 1, 50),
    });

    const createMutation = useMutation({
        mutationFn: (data: { name: string; slug: string }) =>
            adminApi.createSubcategory(categoryId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-subcategories", categoryId] });
            setForm({ name: "", slug: "" });
            setShowForm(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminApi.deleteSubcategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-subcategories", categoryId] });
        },
    });

    const subcategories = data?.subcategories ?? [];

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Subcategories</h4>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="text-xs text-black hover:underline cursor-pointer"
                >
                    {showForm ? "Cancel" : "+ Add"}
                </button>
            </div>
            {showForm && (
                <div className="flex gap-2 mb-2">
                    <input
                        value={form.name}
                        onChange={e => setForm({ name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })}
                        placeholder="Name"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
                    />
                    <input
                        value={form.slug}
                        onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                        placeholder="Slug"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
                    />
                    <button
                        onClick={() => createMutation.mutate(form)}
                        disabled={!form.name.trim() || createMutation.isPending}
                        className="px-3 py-1.5 bg-black text-white text-xs rounded-lg disabled:opacity-50 cursor-pointer"
                    >
                        Add
                    </button>
                </div>
            )}
            {subcategories.length === 0 ? (
                <p className="text-xs text-gray-400">No subcategories</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {subcategories.map((sub: any) => (
                        <span key={sub.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-xs">
                            {sub.name}
                            <button
                                onClick={() => deleteMutation.mutate(sub.id)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function TagsSection({ categoryId }: { categoryId: string }) {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ name: "", slug: "" });
    const [showForm, setShowForm] = useState(false);

    const { data } = useQuery({
        queryKey: ["admin-tags", categoryId],
        queryFn: () => adminApi.getTags(categoryId, 1, 50),
    });

    const createMutation = useMutation({
        mutationFn: (data: { name: string; slug: string }) =>
            adminApi.createTag(categoryId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tags", categoryId] });
            setForm({ name: "", slug: "" });
            setShowForm(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminApi.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tags", categoryId] });
        },
    });

    const tags = data?.tags ?? [];

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Tags</h4>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="text-xs text-black hover:underline cursor-pointer"
                >
                    {showForm ? "Cancel" : "+ Add"}
                </button>
            </div>
            {showForm && (
                <div className="flex gap-2 mb-2">
                    <input
                        value={form.name}
                        onChange={e => setForm({ name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })}
                        placeholder="Name"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
                    />
                    <input
                        value={form.slug}
                        onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                        placeholder="Slug"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
                    />
                    <button
                        onClick={() => createMutation.mutate(form)}
                        disabled={!form.name.trim() || createMutation.isPending}
                        className="px-3 py-1.5 bg-black text-white text-xs rounded-lg disabled:opacity-50 cursor-pointer"
                    >
                        Add
                    </button>
                </div>
            )}
            {tags.length === 0 ? (
                <p className="text-xs text-gray-400">No tags</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag: any) => (
                        <span key={tag.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-lg text-xs text-blue-700">
                            {tag.name}
                            <button
                                onClick={() => deleteMutation.mutate(tag.id)}
                                className="text-blue-300 hover:text-red-500 cursor-pointer"
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
