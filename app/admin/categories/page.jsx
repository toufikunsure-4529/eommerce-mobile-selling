"use client";

import React, { useState } from 'react';
import CategoriesForm from './components/CategoriesForm';
import CategoriesListView from './components/CategoriesListView';
import { useCategories } from '@/lib/firestore/categories/read';

function Page() {
    const { data: categories, error, isLoading } = useCategories();
    const [editingCategory, setEditingCategory] = useState(null);

    const handleEdit = (category) => {
        setEditingCategory(category);
    };

    if (isLoading) {
        return <div className='p-6 text-center text-gray-600'>Loading categories...</div>;
    }

    if (error) {
        return <div className='p-6 text-center text-red-600'>Error: {error}</div>;
    }

    return (
        <div className='p-6 flex flex-col gap-6 md:flex-row'>
            <CategoriesForm
                categories={categories}
                setEditingCategory={setEditingCategory}
                editingCategory={editingCategory}
            />
            <CategoriesListView
                categories={categories}
                handleEdit={handleEdit}
            />
        </div>
    );
}

export default Page;