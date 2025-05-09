"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Edit2, Trash2, Search, ChevronLeft, ChevronRight, Download, FileText, File, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ProductListView() {
    const router = useRouter();
    const [pageLimit, setPageLimit] = useState(10);
    const [lastSnapDocList, setLastSnapDocList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isExporting, setIsExporting] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // Fetch all products for export
    const fetchAllProducts = useCallback(async () => {
        setIsLoadingAll(true);
        try {
            const ref = collection(db, "products");
            const q = query(ref);
            const snapshot = await getDocs(q);
            const products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                variantImages: doc.data().variantImages || {},
                qualities: doc.data().qualities || [],
            }));
            setAllProducts(products);
        } catch (error) {
            console.error("Error fetching all products:", error);
            toast.error("Failed to load products");
        } finally {
            setIsLoadingAll(false);
        }
    }, []);

    // Fetch paginated products for display
    const {
        data: paginatedProducts = [],
        isLoading,
        lastSnapDoc,
    } = useProducts({
        pageLimit,
        lastSnapDoc: lastSnapDocList.length === 0 ? null : lastSnapDocList[lastSnapDocList.length - 1],
    });

    // Memoized filtered and sorted products
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...paginatedProducts];
        
        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();
            result = result.filter((product) => {
                const fieldsToSearch = [
                    product.title?.toLowerCase(),
                    product.shortDescription?.toLowerCase(),
                    product.brand?.toLowerCase(),
                    product.series?.toLowerCase(),
                    ...(product.colors || []).map((color) => color.toLowerCase()),
                    ...(product.qualities || []).map((quality) => quality.toLowerCase()),
                ];
                return fieldsToSearch.some(field => field?.includes(query));
            });
        }

        // Apply sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                let aValue, bValue;
                
                switch (sortConfig.key) {
                    case 'price':
                        aValue = a.salePrice || a.price;
                        bValue = b.salePrice || b.price;
                        break;
                    case 'stock':
                        aValue = a.stock;
                        bValue = b.stock;
                        break;
                    case 'orders':
                        aValue = a.orders || 0;
                        bValue = b.orders || 0;
                        break;
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [paginatedProducts, searchQuery, sortConfig]);

    // Sorting handler
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: 
                prev.key === key && prev.direction === 'asc' 
                ? 'desc' 
                : 'asc'
        }));
    };

    // Pagination handlers
    const handleNextPage = useCallback(() => {
        if (lastSnapDoc) {
            setLastSnapDocList(prev => [...prev, lastSnapDoc]);
        }
    }, [lastSnapDoc]);

    const handlePrevPage = useCallback(() => {
        setLastSnapDocList(prev => prev.slice(0, -1));
    }, []);

    // Export to Excel function (all products)
    const exportToExcel = useCallback(async () => {
        setIsExporting(true);
        try {
            if (allProducts.length === 0) {
                await fetchAllProducts();
            }
            
            const data = allProducts.map((product, index) => ({
                "#": index + 1,
                "Title": product.title,
                "Brand": product.brand,
                "Price": `₹${product.price}`,
                "Sale Price": `₹${product.salePrice}`,
                "Stock": product.stock,
                "Orders": product.orders || 0,
                "Status": product.stock - (product.orders || 0) > 0 ? "In Stock" : "Out of Stock",
                "Featured": product.isFeatured ? "Yes" : "No",
            }));

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
            XLSX.writeFile(workbook, `products_${new Date().toISOString().split('T')[0]}.xlsx`);
            toast.success("Exported all products to Excel");
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            toast.error("Failed to export to Excel");
        } finally {
            setIsExporting(false);
        }
    }, [allProducts, fetchAllProducts]);

    // Export to PDF function (all products)
    const exportToPDF = useCallback(async () => {
        setIsExporting(true);
        try {
            if (allProducts.length === 0) {
                await fetchAllProducts();
            }

            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm"
            });
            
            doc.setFontSize(16);
            doc.text("Product List - All Products", 14, 10);
            
            doc.setFontSize(10);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 16);
            
            const tableData = allProducts.map((product, index) => [
                index + 1,
                product.title,
                product.brand,
                `₹${product.price}`,
                `₹${product.salePrice}`,
                product.stock,
                product.orders || 0,
                product.stock - (product.orders || 0) > 0 ? "In Stock" : "Out of Stock",
                product.isFeatured ? "Yes" : "No"
            ]);
            
            autoTable(doc, {
                head: [['#', 'Title', 'Brand', 'Price', 'Sale Price', 'Stock', 'Orders', 'Status', 'Featured']],
                body: tableData,
                startY: 20,
                styles: { 
                    fontSize: 8,
                    cellPadding: 2,
                    overflow: 'linebreak'
                },
                headStyles: { 
                    fillColor: [41, 128, 185],
                    textColor: 255
                },
                columnStyles: {
                    0: { cellWidth: 8 },
                    1: { cellWidth: 40 },
                    2: { cellWidth: 20 },
                    3: { cellWidth: 15 },
                    4: { cellWidth: 15 },
                    5: { cellWidth: 10 },
                    6: { cellWidth: 10 },
                    7: { cellWidth: 15 },
                    8: { cellWidth: 12 }
                }
            });
            
            doc.save(`products_all_${new Date().toISOString().split('T')[0]}.pdf`);
            toast.success("Exported all products to PDF");
        } catch (error) {
            console.error("Error exporting to PDF:", error);
            toast.error("Failed to export to PDF");
        } finally {
            setIsExporting(false);
        }
    }, [allProducts, fetchAllProducts]);

    // Calculate display products
    const displayProducts = filteredAndSortedProducts;

    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                disabled={isExporting}
                                className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                            
                            {isDropdownOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    exportToExcel();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <File className="h-4 w-4" />
                                                Excel (All Data)
                                            </button>
                                            <button
                                                onClick={() => {
                                                    exportToPDF();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <FileText className="h-4 w-4" />
                                                PDF (All Data)
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => router.push('/admin/products/form')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                        >
                            Add New Product
                        </button>
                    </div>
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => handleSort('price')} className="flex items-center gap-1">
                                        Price
                                        {sortConfig.key === 'price' && (
                                            sortConfig.direction === 'asc' ? 
                                            <ArrowUp className="h-3 w-3" /> : 
                                            <ArrowDown className="h-3 w-3" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => handleSort('stock')} className="flex items-center gap-1">
                                        Stock
                                        {sortConfig.key === 'stock' && (
                                            sortConfig.direction === 'asc' ? 
                                            <ArrowUp className="h-3 w-3" /> : 
                                            <ArrowDown className="h-3 w-3" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => handleSort('orders')} className="flex items-center gap-1">
                                        Total Orders
                                        {sortConfig.key === 'orders' && (
                                            sortConfig.direction === 'asc' ? 
                                            <ArrowUp className="h-3 w-3" /> : 
                                            <ArrowDown className="h-3 w-3" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : displayProducts.length > 0 ? (
                                displayProducts.map((item, index) => (
                                    <ProductRow
                                        key={item.id}
                                        index={index + (searchQuery ? 0 : lastSnapDocList.length * pageLimit)}
                                        item={item}
                                        router={router}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        {searchQuery ? "No matching products found" : "No products available"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {!searchQuery && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Items per page:</span>
                        <select
                            value={pageLimit}
                            onChange={(e) => setPageLimit(Number(e.target.value))}
                            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[5, 10, 20, 50].map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            disabled={isLoading || lastSnapDocList.length === 0}
                            onClick={handlePrevPage}
                            className={`flex items-center gap-1 px-3 py-1 border rounded-md ${isLoading || lastSnapDocList.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </button>
                        <button
                            disabled={isLoading || paginatedProducts.length < pageLimit}
                            onClick={handleNextPage}
                            className={`flex items-center gap-1 px-3 py-1 border rounded-md ${isLoading || paginatedProducts.length < pageLimit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function ProductRow({ item, index, router }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Delete this product?")) return;
        setIsDeleting(true);
        try {
            await deleteProduct({ id: item.id });
            toast.success("Product deleted");
        } catch (error) {
            toast.error("Deletion failed");
        } finally {
            setIsDeleting(false);
        }
    };

    const stockStatus = item.stock - (item.orders || 0);

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={item.featureImageURL || "/placeholder-product.jpg"} 
                            alt={item.title} 
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.title}
                        </div>
                        <div className="text-xs text-gray-500">{item.brand}</div>
                        {item.isFeatured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                Featured
                            </span>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    {item.salePrice < item.price && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{item.price?.toLocaleString()}
                        </span>
                    )}
                    <span className="text-sm font-medium text-gray-900">
                        ₹{item.salePrice?.toLocaleString()}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.stock?.toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.orders?.toLocaleString() || 0}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${stockStatus > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {stockStatus > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => router.push(`/admin/products/form?id=${item.id}`)}
                        disabled={isDeleting}
                        className="p-1 text-blue-600 hover:text-blue-900 rounded hover:bg-blue-50"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-1 text-red-600 hover:text-red-900 rounded hover:bg-red-50"
                    >
                        {isDeleting ? (
                            <span className="inline-block h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
}