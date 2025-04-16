"use client"

import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/lib/firestore/user/read"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function HeaderClientButtons() {
  const { user } = useAuth()
  const { data } = useUser({ uid: user?.uid })

  const favoritesCount = data?.favorites?.length || 0
  const cartCount = data?.carts?.length || 0

  return (
    <div className="flex items-center gap-4">
      {/* Wishlist Button */}
      <Link href="/wishlist" className="relative group flex items-center" aria-label="My Favorites">
        <div className="relative">
          <div className="h-10 w-10 flex justify-center items-center rounded-full group-hover:bg-gray-50 transition-colors">
            <Heart size={20} className="group-hover:text-blue-600 transition-colors" />
          </div>
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favoritesCount > 9 ? "9+" : favoritesCount}
            </span>
          )}
        </div>
        <span className="hidden md:block text-sm text-gray-700 group-hover:text-blue-600">Wishlist</span>
      </Link>

      {/* Cart Button */}
      <Link href="/cart" className="relative group flex items-center " aria-label="My Cart">
        <div className="relative">
          <div className="h-10 w-10 flex justify-center items-center rounded-full group-hover:bg-gray-50 transition-colors">
            <ShoppingCart size={20} className="group-hover:text-blue-600 transition-colors" />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </div>
        <span className="hidden md:block text-sm text-gray-700 group-hover:text-blue-600">Cart</span>
      </Link>
    </div>
  )
}
