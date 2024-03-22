"use client"
import React, { useState, useTransition } from "react"
import { CartSvg } from "./cart-svg"
import {incrementProductQuantity} from "@/app/(landing)/(routes)/products/[id]/actions"

interface AddToCartButtonProps {
  productId: string,
  incrementProductQuantity: (productId:string) => void
}

export function AddtoCartButton({ productId,
}: AddToCartButtonProps): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-success"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId)
            setSuccess(true)
          })
        }}
      >Add To Cart
        <CartSvg />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && <span className="text-success">Added to Cart</span>}
    </div>
  )
}

