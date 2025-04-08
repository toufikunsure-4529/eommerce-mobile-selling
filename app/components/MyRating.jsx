"use client";

import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export default function MyRating({ value }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    if (!visible) return null;

    return (
        <Rating
            name="product-rating"
            defaultValue={value}
            precision={0.5}
            readOnly
            sx={{
                fontSize: {
                    xs: "0.8rem", // small screens
                    sm: "1rem",   // small-medium
                    md: "1.1rem", // medium+
                },
            }}
        />
    );
}
