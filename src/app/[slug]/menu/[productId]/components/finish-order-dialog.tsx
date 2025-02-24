'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import {z} from 'zod'

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';


  type FormSchema = z.infer<typeof formSchema>

  const formSchema = z.object({
    name:z.string().trim().min(1,{
        message:"O nome é obrigatório"
    }),
    email: z.string().email("Insira um email válido")
  })
  
  interface FinishOrderDialogProps{
    open: boolean;
    onOpenChange: (open:boolean)=>void
  }

const FinishOrderDialog = ({open,onOpenChange}:FinishOrderDialogProps) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:""
        },
        shouldUnregister:true
    })

    const onSubmit = (data:FormSchema)=>{
        console.log(data)
    }
    return ( <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger > 
            </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Finalizar pedido</DrawerTitle>
            <DrawerDescription>Insira suas informações abaixo.</DrawerDescription>
          </DrawerHeader>
<div className='p-5'>
<Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <DrawerFooter>
            <Button type='submit' variant='destructive' className='rounded-full'>Finalizar</Button>
            <DrawerClose asChild>
              <Button variant="outline" className='w-full rounded-full'>Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
      </form>
    </Form>
</div>

        </DrawerContent>
      </Drawer>
       );
}
 
export default FinishOrderDialog;