import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-current";

import { CartContext } from "../../contexts/cart";
import CartProductItem from "./cart-procuct-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
    const {isOpen,total,toggleCart, products} = useContext(CartContext)
    const [finishOrderDialogIsOpen, setFinishDialogIsOpen] = useState(false)

    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
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
   <Button className="w-full rounded-full"
   onClick={()=>setFinishDialogIsOpen(true)}
   >Finalizar pedido</Button>
    </div>
    <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishDialogIsOpen}/>
  </SheetContent>
</Sheet>
     );
}
 
export default CartSheet;