import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";
import CartProductItem from "./cart-procuct-item";

const CartSheet = () => {
    const {isOpen,toogleCart, products} = useContext(CartContext)
    console.log(products)
    return ( 
        <Sheet open={isOpen} onOpenChange={toogleCart}>
  <SheetContent className="w-[85%]">
    <SheetHeader>
      <SheetTitle className="text-left">Sacola</SheetTitle>

    </SheetHeader>
    <div className="py-5">
    {products.map((product)=>(
      <CartProductItem key={product.id} product={product}/>
    ))}
    </div>
  </SheetContent>
</Sheet>
     );
}
 
export default CartSheet;