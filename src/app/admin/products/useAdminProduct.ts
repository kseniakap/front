import { useMutation, useQuery } from "react-query"
import { ProductService } from "@/services/product/product.service"
import { IListItem } from "@/ui/admin/admin-list/admin-list.interface"
import { getAdminUrl } from "@/config/url.config"
import { formDate } from "@/utils/format-date"
import { convertPrice } from "@/utils/convertPrice"

import { IProduct } from "@/types/product.interface"
import { TypeProductData } from "@/services/product/product.types"

//получение всех товаров на странице админа
//refetch для того, чтобы в случае изменений данных(удаление), 
//произоишло изменение без перезагрузки страницы
export const useAdminAllProducts = ()=>{
    const {data, isFetching, refetch} = useQuery(['get admin all products'], 
    ()=> ProductService.getAll(),
    {
        select: data=> data.products.map((product):IListItem=>{
            return {
                id: product.id, 
                viewUrl: `/product/${product.slug}`,
                // editUrl: getAdminUrl(`/createproduct`),
                items:[
                    product.name, 
                    convertPrice(product.price),
                    product.category.name,                
                ],
                image: product.images[0],
            }
        })
    })

    const { mutate: mutateDelete } = useMutation(
        ["delete product"],
        (id: number) => ProductService.delete(id),
        {
            onSuccess() {
                refetch()
            }
        }
    )

    // const { mutate: mutateUpdate } = useMutation(
    //     (updatedProduct: TypeProductData) => ProductService.update(updatedProduct.id, updatedProduct),
    //     {
    //       onSuccess: () => {
    //         refetch();
    //       },
    //     }
    // );



    return { data, isFetching, mutateDelete }
}