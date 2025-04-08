"use client";

import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/lib/firestore/user/read"
import { updateFavorites } from "@/lib/firestore/user/write"
import { Button } from "@nextui-org/react"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation"

function FavoriteButton({ productId }) {
    const { user } = useAuth()
    const { data } = useUser({ uid: user?.uid })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const handleClick = async () => {
        setIsLoading(true)
        try {
            if (!user?.uid) {
                router.push("/login");
                throw new Error("Please Logged In First!");
            }
            if (data?.favorites?.includes(productId)) {
                const newList = data?.favorites?.filter((item) => item != productId)
                await updateFavorites({ list: newList, uid: user?.uid })
            } else {
                await updateFavorites({
                    list: [...(data?.favorites ?? []), productId],
                    uid: user?.uid,
                });
            }
            toast.success("Product Added to your wishlist")
        } catch (error) {
            toast.error(error?.message)
        }
        setIsLoading(false)
    }

    const isLiked = data?.favorites?.includes(productId);

    return (
        <Button
            className={`h-8 w-8 ${isLiked ? " text-red-500" : "text-gray-600"} bg-white border border-gray-300 p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white `}
            isIconOnly
            size="sm"
            variant="light"
            onClick={handleClick}
            isLoading={isLoading}
            isDisabled={isLoading}
        >
            {!isLiked && <FavoriteBorderOutlinedIcon fontSize="small" />}
            {isLiked && <FavoriteIcon fontSize="small" />}
        </Button>
    )
}

export default FavoriteButton
