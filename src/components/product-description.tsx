"use client"
import React, { useState } from 'react';
interface ProductDescriptionProps {
  description: string;
  maxLength: number;
}
export const ProductDescription = ({description,maxLength}:ProductDescriptionProps) => {
  const [expanded,setIsExpanded] = useState(false);

  const words = description.split(' ');
  const showContent = expanded || words.length <= maxLength?description:words.slice(0,maxLength).join(' ')+"..."

  const toggleReadMore = (event:React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  setIsExpanded(!expanded)
  }
  const buttonText = expanded ? "show less" : "read more"
  return(
  <div>
      <p>{showContent}</p>
  </div>
  )
}
