import { formatPrices } from "@/lib/db/format"

interface PriceTagProps{
  price:number,
  className?:string
}

export default function PriceTag({price,className}:PriceTagProps){
  return (
  <span className={`p-4 badge ${className}`}>{formatPrices(price)}</span>
  )
}
