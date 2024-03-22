import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./price-tag";
import Image from "next/image";
import {ProductDescription} from "./product-description";

interface ProductCardProps {
  product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

  return (
    <div className={`card w-full bg-base-100 hover:shadow-xl transition-shadow`}>
      <Link href={"/products/" + product.id}>
        <figure className="mt-4 mx-3 rounded-md">
          <Image src={product.imageUrl} alt={product.name} width={600} height={500} className="h-40 object-cover" />
        </figure>
        <div className={`card-body`}>
          <h2 className={`card-title`}>{product.name}{isNew && <div className="badge badge-primary">NEW</div>}</h2>
           <ProductDescription description={product.description} maxLength={50} /> 
          <PriceTag price={product.price} />
        </div>
      </Link>
         </div>
  )
}
