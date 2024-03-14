import { ICartItem } from "@/types/cart.interface"


export interface IListItem{
    id: number, 
    editUrl?:string, 
    viewUrl?: string | undefined, 
    items: (any)[] , 
    image?: string,
    showOrder?: boolean | undefined,
    ordersArrray?:  ICartItem[]
}

export interface IAdminListItem {
    listItem: IListItem,
    removeHadler?:()=> void, 
    mutateUpdate?: ()=> void
}