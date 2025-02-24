import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-current";

import { CartContext } from "../../contexts/cart";
import CartProductItem from "./cart-procuct-item";

const CartSheet = () => {
    const {isOpen,total,toogleCart, products} = useContext(CartContext)
    console.log(products)
    return ( 
        <Sheet open={isOpen} onOpenChange={toogleCart}>
  <SheetContent className="w-[85%]">
    <SheetHeader>
      <SheetTitle className="text-left">Sacola</SheetTitle>

    </SheetHeader>
    <div className="py-5 flex flex-col h-full">
   <div className="flex-auto space-y-2">
   {products.map((product)=>(
      <CartProductItem key={product.id} product={product}/>
    ))}
   </div>
   <Card className="mb-6">
    <CardContent className="p-5">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="text-sm font-semibold">{formatCurrency(total)}</p>
         </div>
    </CardContent>
   </Card>
    <Button className="w-full rounded-full">Finalizar pedido</Button>
    </div>
  </SheetContent>
</Sheet>
     );
}
 
export default CartSheet;