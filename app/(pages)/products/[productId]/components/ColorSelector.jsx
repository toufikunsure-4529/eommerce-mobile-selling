"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ColorSelector({ colors, selectedColor, productId }) {
    const router = useRouter();

    const handleColorChange = (color) => {
        // Update URL with the selected color as a query parameter
        const url = new URL(window.location.href);
        if (color) {
            url.searchParams.set("color", color);
        } else {
            url.searchParams.delete("color");
        }
        router.push(url.pathname + url.search);
    };

    // Auto-submit form when a radio input is selected
    useEffect(() => {
        const handleInputChange = (e) => {
            if (e.target.name === "color") {
                handleColorChange(e.target.value);
            }
        };

        const form = document.getElementById(`color-selector-${productId}`);
        if (form) {
            form.addEventListener("change", handleInputChange);
        }

        return () => {
            if (form) {
                form.removeEventListener("change", handleInputChange);
            }
        };
    }, [productId]);

    // Format color name for display (capitalize first letter)
    const formatColorName = (color) => {
        if (!color) return "";
        return color.charAt(0).toUpperCase() + color.slice(1);
    };

    return (
        <div>
            <form id={`color-selector-${productId}`} className="flex gap-2">
                {colors.map((color) => (
                    <label
                        key={color}
                        className="flex items-center cursor-pointer"
                        title={formatColorName(color)}
                    >
                        <input
                            type="radio"
                            name="color"
                            value={color}
                            defaultChecked={selectedColor === color}
                            className="sr-only"
                            aria-label={`Select ${color}`}
                        />
                        <span
                            className={`h-6 w-6 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-400"}`}
                            style={{ backgroundColor: color }}
                        />
                    </label>
                ))}
            </form>
            {selectedColor && (
                <p className="mt-2 text-sm text-gray-700">
                    Selected color: <span className="font-semibold">{formatColorName(selectedColor)}</span>
                </p>
            )}
        </div>
    );
}