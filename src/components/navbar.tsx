'use client'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCartStore } from '../store/useCartStore'
import Link from 'next/link'

export function Navbar() {
  const toggleCart = useCartStore((state) => state.toggleCart)
  const itemCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0))

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Doting</Link>
        <Button variant="outline" onClick={toggleCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart ({itemCount})
        </Button>
      </div>
    </nav>
  )
}
