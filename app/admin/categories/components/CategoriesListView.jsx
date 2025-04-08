;
import { Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

function CategoriesListView({ categories, setCategories, handleEdit }) {
    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            setCategories(categories.filter((_, i) => i !== index));
            toast.success("Category deleted successfully!");
        }
    };

    return (
        <div className='bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg border border-gray-300'>
            <h2 className='text-2xl font-bold text-gray-900 mb-5 text-center'>Shop by Category</h2>
            <ul className='divide-y divide-gray-200'>
                {categories.map((category, index) => (
                    <li key={index} className='flex justify-between items-center p-4 hover:bg-gray-50 transition-all rounded-lg'>
                        <div className='flex items-center gap-4'>
                            <img src={category.image} alt={category.name} className='w-12 h-12 rounded-lg object-cover' />
                            <span className='text-lg text-gray-800 font-medium'>{category.name}</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => handleEdit(category, index)} className='text-blue-600 hover:text-blue-800 p-2 rounded-lg transition-all'>
                                <Edit2 size={20} />
                            </button>
                            <button onClick={() => handleDelete(index)} className='text-red-600 hover:text-red-800 p-2 rounded-lg transition-all'>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesListView;
