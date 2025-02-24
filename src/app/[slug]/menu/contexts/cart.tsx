'use client'

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product,'id'| 'name'|'price'|'imageUrl'> {
    quantity:number;
 }

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toogleCart: ()=> void;
    addProduct: (product:CartProduct) => void,
    decreaseProductQuantity:(productId: string) => void
    increaseProductQuantity:(productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen:false,
    products:[],
    toogleCart:()=>{},
    addProduct: ()=>{},
    decreaseProductQuantity:()=>{},
    increaseProductQuantity:()=>{}
})


export const CartProvider = ({children}:{children:ReactNode}) =>{
    const [products, setProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toogleCart = ()=>{
        setIsOpen((prev) => !prev)
    }

    const addProduct = (product: CartProduct)=>{
        const productIsAlreadyOntheCart = products.some(prevProduct =>  prevProduct.id === product.id)
            
            if(!productIsAlreadyOntheCart) return setProducts(prev => [...prev,product])

        setProducts((prevProducts)=>{
            return prevProducts.map(prevProduct =>{
                if(prevProduct.id === product.id){
                    return{
                        ...prevProduct,
                        quantity:prevProduct.quantity + product.quantity
                    }
                }
                return prevProduct
            })
        })

    }

    const decreaseProductQuantity = (procuctId: string)=>{
        setProducts(prevProducts =>{
            return prevProducts.map(prevProduct =>{
                if(prevProduct.id !== procuctId){
                    return prevProduct
                }
                if(prevProduct.quantity===1){
                    return prevProduct
                }
                return {...prevProduct,quantity:prevProduct.quantity-1}
            })
        })
    }

    const increaseProductQuantity = (procuctId: string)=>{

        setProducts(prevProducts =>{
            return prevProducts.map(prevProduct =>{
                if(prevProduct.id !== procuctId){
                    return prevProduct
                }
 
                return {...prevProduct,quantity:prevProduct.quantity+1}
            })
        })
    }
    return(
        <CartContext.Provider value={{
            isOpen,
            products,
            toogleCart,
            addProduct,
            decreaseProductQuantity,
            increaseProductQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}