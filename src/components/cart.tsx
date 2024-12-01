'use client'
import { useCartStore } from '../store/useCartStore'
import { Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

export function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, isOpen, toggleCart } = useCartStore()

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <Image src={item.image} width={1000} height={1000} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="ml-2">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={clearCart}>Clear Cart</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
