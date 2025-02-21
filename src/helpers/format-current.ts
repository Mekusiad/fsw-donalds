export const formatCurrency = (value:number) =>{
    return new Intl.NumberFormat("pt-BT",{
                    style:'currency',
                    currency:"BRL"
                }).format(value)
}