"use client"
import { ShoppingCart } from '@/lib/db/cart'
import React from 'react'
import { CartSvg } from './cart-svg';
import { formatPrice, formatPrices } from '@/lib/db/format';
import Link from 'next/link';

interface ShoppingCartButtonProps{
  cart : ShoppingCart | null ;
}



export default function ShoppingCartButton({cart}:ShoppingCartButtonProps) {

  function closeDropDown(){
    const elem = document.activeElement as HTMLElement
    if(elem){
      elem.blur()
    }
  }
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <CartSvg />
          <span className="badge badge-sm indicator-item">{cart?.size || 0}</span>
        </div>
      </label>
      <div tabIndex={0} className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30">
        <div className="card-body">
          <span className="text-lg font-bold gap-3">{cart?.size || 0} Item</span>
          <span className="">SubTotal: {formatPrice(cart?.subtotal || 0)}</span>
          <div className="card-actions">
            <Link href="/cart" className="btn btn-primary btn-block" onClick={closeDropDown}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>

  )

}
