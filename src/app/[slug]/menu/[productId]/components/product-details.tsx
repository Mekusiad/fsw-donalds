'use client'

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-current";

interface ProductDetailsProps{

    product: Prisma.ProductGetPayload<{include:{restaurant:{
        select:{
            name:true;
            avatarImageUrl:true}
    }}}>
}

const ProductDetails = ({product}:ProductDetailsProps) => {
    const [quantity, setQuantity]= useState<number>(1)

    const handleDecreaseQuantity =() =>{
        setQuantity((prev) => {
            if(prev === 1) return 1

            return prev-1
        })
    }
    const handleIncreaseQuantity =() =>{
        setQuantity((prev) => prev+1)
    }
    return ( 
        <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex flex-auto flex-col overflow-hidden">
            <div className="flex-auto overflow-hidden">
                       
              {/* RESTAURANTE */}
              <div className="flex items-center gap-1.5 ">
                    <Image
                    src={product.restaurant.avatarImageUrl}
                    alt={product.restaurant.name}
                    width={16}
                    height={16}
                    className="rounded-full" />
                    <p className="text-muted-foreground text-xs space-x-1">{product.restaurant.name}</p>
                </div>
                {/* NOME DO PRODUTO */}
                <h2 className="text-xs font-semibold mt-1">{product.name}</h2>

                <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold"> {formatCurrency(product.price)}</h2>
                {/* PREÇO E QUANTIDADE */}
                <div className="flex items-center gap-3 text-center mt-3">
                    <Button variant='outline' className="h-8 w-8 rounded-xl"
                    onClick={handleDecreaseQuantity}>
                        <ChevronLeftIcon />
                    </Button>
                    <p className="w-4">{quantity}</p>
                    <Button variant='destructive' className="h-8 w-8 rounded-xl"
                     onClick={handleIncreaseQuantity}>
                        <ChevronRightIcon />
                    </Button>
                </div>
                </div>
                <ScrollArea className="h-full">
                
            {/* SOBRE */}
            <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            {/* INGREDIENTES */}
            <div className="mt-6 space-y-3">
               <div className=" flex items-center gap-1.5">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
               </div>
               <ul className="text-muted-foreground list-disc px-5 text-sm">
                {product.ingredients.map(ingredient =>(
                    <li key={ingredient}>{ingredient}</li>  
                ))}
               </ul>
            </div>
            </ScrollArea>
            </div>
             
            <Button className="rounded-full w-full">Adicionar à sacola</Button>
        </div>
     );
}
 
export default ProductDetails;