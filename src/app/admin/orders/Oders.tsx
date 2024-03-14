'use client'
import { FC } from "react"

import Heading from "@/ui/heading/Heading"
import AdminList from "@/ui/admin/admin-list/AdminList"
import { useAdminAllOrders } from "./useAdminOrders"


const Orders:FC = () => {
    const {data, isFetching} = useAdminAllOrders()

  return (
    <div style={{marginTop:"50px"}}>
     <Heading>Все заказы</Heading> 
     <AdminList listItems={data} isLoading={isFetching}  />
    </div>
  )
}

export default Orders
