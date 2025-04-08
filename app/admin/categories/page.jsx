"use client"
import React, { useState } from 'react'
import CategoriesForm from './components/CategoriesForm'
import CategoriesListView from './components/CategoriesListView'

function Page() {
    const [categories, setCategories] = useState([
        { name: 'Mobile', image: '/mobile.webp' },
        { name: 'Touch Glass & Touch Pad', image: '/glass.webp' },
        { name: 'Battery', image: '/battery.webp' },
        { name: 'Middle Frame', image: '/frames.webp' },
    ]);

    const [editingCategory, setEditingCategory] = useState(null);

    const handleEdit = (category, index) => {
        setEditingCategory({ ...category, index });
    };

    return (
        <div className='p-6 flex flex-col gap-6 md:flex-row'>
            <CategoriesForm
                categories={categories}
                setCategories={setCategories}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
            />
            <CategoriesListView
                categories={categories}
                setCategories={setCategories}
                handleEdit={handleEdit}
            />
        </div>
    )
}

export default Page;
