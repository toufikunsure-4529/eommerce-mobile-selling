import { ClipboardList } from 'lucide-react';

function EmptyState({ title, description, className = '' }) {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-6 ${className}`}>
            <ClipboardList className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-500 max-w-md">{description}</p>
        </div>
    );
}

export default EmptyState;