import product from "@/sanity/schemaTypes/product";
import { Product } from "@/types/products";


export const addtocart = (product :Product)=>{
    const cart:Product[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingProductIndex = cart.findIndex(item => item._id === product._id)
    if(existingProductIndex > -1){
        cart[existingProductIndex].stockLevel += 1
    } 
    else{
        cart.push({
            ... product,stockLevel:1
        })
    }
    localStorage.setItem('cart',JSON.stringify(cart))
}


export const removeFromCart = (productId : string) =>{
    let cart : Product[]= JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id ! == productId)
    localStorage.setItem('cart',JSON.stringify(cart))
}
export const updateCartQuantity =(productId:string, quantity:number) =>{
    const cart:Product[] = JSON.parse(localStorage.getItem('cart') || '[]' )
    const ProductIndex = cart.findIndex(item => item._id === productId)
    if (ProductIndex > -1){
        cart[ProductIndex].stockLevel = quantity
    }

    
}
