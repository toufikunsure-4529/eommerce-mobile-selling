"use client";

import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/lib/firestore/user/read"
import { updateCarts } from "@/lib/firestore/user/write"
import { Button } from "@nextui-org/react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from "next/navigation"

function AddToCartButton({ productId, type }) {
    const { user } = useAuth()
    const { data } = useUser({ uid: user?.uid })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const isAdded = data?.carts?.find((item) => item?.id === productId);

    const handleClick = async () => {
        setIsLoading(true)
        try {
            if (!user?.uid) {
                router.push("/login");
                throw new Error("Please Logged In First!");
            }
            if (isAdded) {
                const newList = data?.carts?.filter((item) => item?.id != productId)
                await updateCarts({ list: newList, uid: user?.uid })

            } else {
                await updateCarts({
                    list: [...(data?.carts ?? []), { id: productId, quantity: 1 }],
                    uid: user?.uid,
                });
            }
            toast.success("Item Successfully added to cart");
        } catch (error) {
            toast.error(error?.message)
        }
        setIsLoading(false)
    }

    if (type === "large") {
        return (
            <Button
                size="sm"
                variant="flat"
                onClick={handleClick}
                isLoading={isLoading}
                isDisabled={isLoading}
                className="bg-black hover:bg-gray-600 text-white px-5 py-5 rounded-md text-sm md:text-base transition-all duration-200 ease-out"
            >
                {!isAdded && <AddShoppingCartIcon fontSize="small" />}
                {isAdded && <ShoppingCartIcon fontSize="small" />}
                {!isAdded && "Add To Cart"}
                {isAdded && "Click To Remove"}
            </Button>
        )
    }


    return (
        <Button
            className={`h-8 w-8 ${isAdded ? " text-gray-900" : "text-gray-600"} bg-gray-100 border border-gray-100 p-4 rounded  shadow-md hover:bg-red-500 hover:text-white  `}
            isIconOnly
            size="sm"
            variant="light"
            onClick={handleClick}
            isLoading={isLoading}
            isDisabled={isLoading}
        >
            {!isAdded && <AddShoppingCartIcon fontSize="small" />}
            {isAdded && <ShoppingCartIcon fontSize="small" />}
        </Button>
    )
}

export default AddToCartButton
