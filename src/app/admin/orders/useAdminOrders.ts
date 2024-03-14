import { useQuery } from "react-query"
import { IListItem } from "@/ui/admin/admin-list/admin-list.interface"
import { getAdminUrl } from "@/config/url.config"
import { OrdersService } from "@/services/order.service"
import { convertPrice } from "@/utils/convertPrice"

export const useAdminAllOrders = ()=>{

    const {data, isFetching} = useQuery(['get admin all orders'], 
    ()=> OrdersService.getAll(),
    {
        select: ({data})=> data.map((order):IListItem=>{
            return {
                id: order.id, 
                showOrder: true,
                // editUrl: getAdminUrl(`/products/edit/${order.id}`),
                items:[
                    `# ${order.id}`,
                    convertPrice(order.total),
                    order.user.name,
                    order.user.phone, 
                    order.status,
                    // order.createAt ???
                ],
                ordersArrray: order.items             
            }
        })
    })
    // const {mutate} = useMutation(
    //     ["delete order"], 
    //     (id:number) => OrdersService.deleteOrder(id), 
    //     {
    //         onSuccess(){
    //             refetch()
    //         }
    //     }
    // )

    return {data, isFetching}
}