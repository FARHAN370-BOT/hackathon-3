
"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import { Product } from "@/types/products";
import { client } from "@/sanity/lib/client";
import { allproducts, four } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addtocart } from "./actions/actions";



const Home = () =>{
  const [product,setProduct] = useState<Product[]>([])

  useEffect (() =>{
    async function fetchedproduct() {
      const fetchedProduct : Product[] = await client.fetch(allproducts)
      setProduct(fetchedProduct)
      
    }
    fetchedproduct()
    
  },[]);
    

   const handelAddToCart = (e:React.MouseEvent,product:Product)=>{
    e.preventDefault()
    
    addtocart(product)
    
    
    
   }

  return(
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 text-center">Our-Latest-Products</h1>
      <div className="grid grid-col-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

      
      {product.map((product)=>(
        <div key={product._id }
         className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
          <Link href={`/product/${product.slug.current}`}>
          
        {product.image && (
          <Image
          src={urlFor(product.image).url()}
          alt="image"
          width={200}
          height={200}
          />
        )}<h2 className="text-2xl font-semibold mt-4">
        {product.name}</h2>
        <p className="text-xl font-semibold">
        {product.price}</p>
        <p className="font-medium mt-4">
          {product.description}
        </p>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out "
        onClick={(e) => handelAddToCart(e,product)}>
          Add to Cart

        </button>
        </Link>
        
        </div>

      ))}

    </div>
    </div>
  )


}
export default Home;