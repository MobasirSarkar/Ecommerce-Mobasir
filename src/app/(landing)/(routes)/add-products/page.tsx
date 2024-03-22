import React from 'react'
import type { Metadata } from "next";
import prisma from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import { FormSubmitButton } from '@/components/form-submit-button';

export const metadata: Metadata = {
  title: "Add Products - Ecommerce",
  description: "This is a Add products page section"
}

async function addProduct(formData: FormData) {
  "use server"

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields")
  }
  await prisma.product.create({
    data: { name, description, imageUrl, price }
  })
  redirect("/")
  
}
export default function AddProductPage() {
  return (
    <div className={`mt-4`}>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input required type="text" name="name" placeholder="Name" className="input input-bordered w-full mb-3" />
        <textarea required name="description" placeholder="Description" className="textarea-bordered textarea mb-3 w-full" />
        <input required name="imageUrl" placeholder="Image Url" type="url" className="input-bordered mb-3 w-full p-5" />
        <input required name="price" placeholder="Price" type="number" className="input-bordered input mb-3 w-full" />
        <FormSubmitButton className="w-full">Add Product</FormSubmitButton>
      </form>
    </div>
  )
}
