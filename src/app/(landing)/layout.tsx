import React, { ReactNode } from "react"
export default function LayoutHome({ children }: {children:ReactNode}) {
  return (
    <main className={`p-4 max-w-7xl m-auto min-w-[300px] bg-gray-100`}>{children}</main>
  )
}
