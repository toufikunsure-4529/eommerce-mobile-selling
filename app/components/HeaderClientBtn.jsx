"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";


export default function HeaderClientButtons() {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    return (
        <div className="flex items-center gap-1">
            <Link href={`/favorites`}>
                {(data?.favorites?.length ?? 0) != 0 && (
                    <Badge
                        variant="solid"
                        size="sm"
                        className="text-white bg-red-500 text-[9px] text-center flex justify-center items-center "
                        content={data?.favorites?.length ?? 0}
                    >
                        <button
                            title="My Favorites"
                            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
                        >
                            <Heart size={18} />
                        </button>
                    </Badge>
                )}
                {(data?.favorites?.length ?? 0) === 0 && (
                    <button
                        title="My Favorites"
                        className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
                    >
                        <Heart size={18} />
                    </button>
                )}
            </Link>
            <Link href={`/cart`}>
                {(data?.carts?.length ?? 0) != 0 && (
                    <Badge
                        variant="solid"
                        size="sm"
                        className="text-white bg-red-500 text-[9px] text-center flex justify-center items-center "
                        content={data?.carts?.length ?? 0}
                    >
                        <button
                            title="My Cart"
                            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </Badge>
                )}
                {(data?.carts?.length ?? 0) === 0 && (
                    <button
                        title="My Cart"
                        className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
                    >
                        <ShoppingCart size={18} />
                    </button>
                )}
            </Link>
        </div>
    );
}