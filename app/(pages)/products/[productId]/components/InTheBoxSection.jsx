// components/InTheBoxSection.js
import React from 'react';

const InTheBoxSection = () => {
    return (
        <div className="container mx-auto p-4">
            {/* In The Box Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
                    {/* Header */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th colSpan="2" className="p-2 text-center text-md md:text-lg font-semibold text-gray-800 border-b border-gray-300">
                                IN THE BOX
                            </th>
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody>
                        <tr className="border-b border-gray-300">
                            <td className="p-3 font-medium text-gray-700 border-r border-gray-300 w-1/3">Sales Package</td>
                            <td className="p-3 text-gray-600 text-sm">1 Piece of LCD Touch Folder for Samsung Galaxy S10 Plus (Black)</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-gray-700 border-r border-gray-300">Type</td>
                            <td className="p-3 text-gray-600 text-sm">1 Piece of LCD Touch Folder for Samsung Galaxy S10 Plus (Black)</td>
                        </tr>
                    </tbody>
                </table>

                {/* Compatibility Section */}
                <table className="w-full border-collapse border border-gray-300 bg-white shadow-md mt-6">
                    <thead>
                        <tr className="bg-gray-200">
                            <th colSpan="2" className="p-2 text-center text-md md:text-lg font-semibold text-gray-800 border-b border-gray-300">
                                COMPATIBILITY
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-300">
                            <td className="p-3 font-medium text-gray-700 border-r border-gray-300 w-1/3">Compatible Brand</td>
                            <td className="p-3 text-gray-600 text-sm">1 Piece of LCD Touch Folder for Samsung Galaxy S10 Plus (Black)</td>
                        </tr>
                        <tr>
                            <td className="p-3 text-sm font-medium text-gray-700 border-r border-gray-300">Compatible Brand</td>
                            <td className="p-3 text-gray-600 text-sm">1 Piece of LCD Touch Folder for Samsung Galaxy S10 Plus (Black)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InTheBoxSection;