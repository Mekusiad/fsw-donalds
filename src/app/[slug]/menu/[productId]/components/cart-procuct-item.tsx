import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-current";

import { CartContext, CartProduct } from "../../contexts/cart";

interface CartProductItemProps{
    product: CartProduct
}

const CartProductItem = ({product}: CartProductItemProps) => {
    const {decreaseProductQuantity, increaseProductQuantity} = useContext(CartContext)
    return ( 
    <div className="flex items-center justify-between">
            {/* ESQUERDA */}
<div className="flex items-center gap-4">

<div className="relative h-20 w-20 bg-gray-200 rounded-lg">
    <Image 
    src={product.imageUrl}
    alt={product.name}
    fill/>
</div>
    <div className="space-y-1">
        <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
        <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
        {/* QUANTIDADE */}
        <div className="flex items-center gap-1 text-center">
            <Button variant='outline' className="h-7 w-7 rounded-lg"
            onClick={()=>decreaseProductQuantity(product.id)}>
                <ChevronLeftIcon />
            </Button>
            <p className="w-7">{product.quantity}</p>
            <Button variant='destructive'  className="h-7 w-7 rounded-lg"
            onClick={()=>increaseProductQuantity(product.id)}>
                <ChevronRightIcon />
            </Button>
        </div>
    </div>
</div>
{/* DIREITA */}
<Button variant='outline' className="w-7 h-7 rounded-lg">
    <TrashIcon />
</Button>
    </div> );
}
 
export default CartProductItem;