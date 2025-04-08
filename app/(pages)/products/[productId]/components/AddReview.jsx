'use client';

import { useAuth } from '@/context/AuthContext';
import { addReview } from '@/lib/firestore/reviews/write';
import { useUser } from '@/lib/firestore/user/read';
import { CircularProgress, Rating } from '@mui/material';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

function AddReview({ productId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(4);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuth();
    const { data: userData } = useUser({ uid: user?.uid });
    const maxChars = 300;

    const handleSubmit = async () => {
        if (message.length > maxChars) return; // Prevent submission if over limit
        setIsLoading(true);
        try {
            if (!user) {
                throw new Error("Please Log In First");
            }

            await addReview({
                displayName: userData?.displayName,
                message: message,
                photoURL: userData?.photoURL,
                productId: productId,
                rating: rating,
                uid: user?.uid,
            });

            setMessage("");
            toast.success("Thanks For Your Review");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    const handleMessageChange = (e) => {
        const text = e.target.value;
        if (text.length > maxChars) {
            setError(`Maximum ${maxChars} characters allowed`);
        } else {
            setError("");
        }
        setMessage(text);
    };

    return (
        <div className="p-6 rounded-2xl h-[300px] border border-gray-200 shadow-lg bg-white w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Rate This Product</h2>

            <div className="flex mb-4">
                <Rating size="large" value={rating} onChange={(event, newValue) => setRating(newValue)} />
            </div>

            <textarea
                placeholder="Write your review..."
                className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:ring-2 focus:outline-none resize-none h-24`}
                value={message}
                onChange={handleMessageChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <Button
                className={`w-full mt-4 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition ${isLoading || error ? "bg-blue-200 cursor-not-allowed" : "bg-blue-600"}`}
                isDisabled={isLoading || !!error}
                onClick={handleSubmit}
            >
                Submit Review
                {isLoading && <CircularProgress size={20} thickness={7} color="white" />}
            </Button>
        </div>
    );
}

export default AddReview;
