"use client";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//   } from "@/components/ui/carousel"
  
  
  import Link from "next/link";
  import Image from 'next/image'
  import { useState,useEffect } from 'react';
  import Swal from 'sweetalert2';
  import {Product} from "@/app/types/products";
import { client } from "@/sanity/lib/client";
import {allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ADD_TO_CART } from "@/app/actions/actions";
  export default function ProductShowcase() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect (() => {
      async function fetchData() {
        
        const fetchData:Product[]=await client.fetch(allProducts)
        setProducts(fetchData)
      }
      
      fetchData()
    
    
      },[])

      const handleAddToCart = ( e: React.MouseEvent,product:Product) => {
   e.preventDefault()
   Swal.fire({
    position:'top-start',
    icon:'success',
    title:`${product.productName} added to cart`,
    showConfirmButton:false,
    timer:1000

   })
   
   ADD_TO_CART(product)
  }
        return (
      <div className="w-full bg-white max-w-6xl mx-auto px-4 py-8">
         {/* <div className="max-w-6xl mx-auto mb-6"> */}
          <h2 className="text-2xl font-bold text-center mb-6">Best of Air Max</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* <span className="text-sm font-medium flex justify-start">Shop</span> */}
            
       { products.map((product,index) => (
        <div key={product._id} className="flex flex-col items-center border border-gray-200 rounded-lg p-4 shadow-md">
          
           <h3>Product {index + 1}</h3> {/* Using index */}
          <Link href={`/products/${product.slug.current}`}>
          
            {product.image && (<Image 
          src={ urlFor(product.image).url()} alt={product.productName} width={400} height={400}
          className="w-full h-48 object-cover rounded-md" />)
          }
       <h3 className="text-lg font-semibold mt-4 text-center"> {product.productName}</h3>
       <p className="text-gray-500 mt-2 text-center"> {product.price?`$${product.price}`:"price not available"}</p>
       <button 
         onClick={(e) => handleAddToCart(e, product)} 
         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md self-stretch"
       >
         Add to Cart
       </button>
      </Link>
             </div>))}
         {/* <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Best of Air Max</h2>
          <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <span className="text-sm font-medium">Shop</span>
   */}
            {/* Left Chevron */}
             {/* <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#E5E5E5]">
              <ChevronLeft size={24} className="text-gray-900" />
            </div> */}
  
            {/* Right Chevron */}
              {/* <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#E5E5E5]">
              <ChevronRight size={24} className="text-gray-900" />
            </div>  
          </div> */}
  
      </div>
  
 </div>
    )
  }

  
