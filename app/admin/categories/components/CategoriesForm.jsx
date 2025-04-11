import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Loader2, UploadCloud, Save } from 'lucide-react';
import toast from 'react-hot-toast';

function CategoriesForm({ categories, setCategories, editingCategory, setEditingCategory }) {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (editingCategory) {
            setValue('categoryName', editingCategory.name);
            setValue('slug', editingCategory.name.toLowerCase().replace(/\s+/g, '-'));
            setImagePreview(editingCategory.image);
        }
    }, [editingCategory, setValue]);

    const handleCreateOrEdit = (data) => {
        setIsLoading(true);
        try {
            const imageFile = data.image?.[0];
            const updatedCategory = {
                name: data.categoryName,
                image: imageFile ? URL.createObjectURL(imageFile) : imagePreview
            };

            if (editingCategory) {
                // Update category
                const updatedCategories = [...categories];
                updatedCategories[editingCategory.index] = updatedCategory;
                setCategories(updatedCategories);
                toast.success("Category updated successfully!");
            } else {
                // Add new category
                setCategories([...categories, updatedCategory]);
                toast.success("Category created successfully!");
            }

            reset();
            setEditingCategory(null);
            setImagePreview(null);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-md p-6 w-full max-w-lg border border-gray-200 relative'>
            <h1 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
                {editingCategory ? "Edit Category" : "Add New Category"}
            </h1>

            <form onSubmit={handleSubmit(handleCreateOrEdit)} className='space-y-5'>
                <div>
                    <label className='text-sm font-medium text-gray-700 mb-1 flex items-center gap-2'>
                        <UploadCloud className='h-5 w-5 text-blue-600' /> Upload Category Image
                    </label>
                    <input
                        type='file'
                        {...register('image', { required: 'Image is required' })}
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                        accept='image/*'
                        disabled={isLoading}
                        onChange={handleImageChange}

                    />
                    {errors.image && <p className='mt-1 text-sm text-red-600'>{errors.image.message}</p>}


                    {imagePreview && (
                        <div className='mt-4 flex justify-center items-center p-5 flex-col bg-gray-100'>
                            <p className='text-sm text-gray-900 mb-1'>Image Preview:</p>
                            <img src={imagePreview} alt='Preview' className='w-full h-44 object-contain rounded-md border' />
                        </div>
                    )}
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Category Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        {...register('categoryName', { required: 'Category name is required' })}
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                        placeholder='e.g. Electronics, Fashion...'
                        disabled={isLoading}
                    />
                    {errors.categoryName && <p className='mt-1 text-sm text-red-600'>{errors.categoryName.message}</p>}
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Slug <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        {...register('slug', { required: 'Slug is required' })}
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                        placeholder='e.g. Electronics, Fashion...'
                        disabled={isLoading}
                    />
                    {errors.slug && <p className='mt-1 text-sm text-red-600'>{errors.slug.message}</p>}
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md font-medium transition-all flex items-center justify-center gap-2 text-sm'
                >
                    {isLoading ? <Loader2 className='animate-spin h-4 w-4' /> : editingCategory ? <Save className='h-4 w-4' /> : <PlusCircle className='h-4 w-4' />}
                    {editingCategory ? "Update Category" : "Create Category"}
                </button>
            </form>
        </div>
    );
}

export default CategoriesForm;
