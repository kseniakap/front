'use client'
import { FC } from "react"

import Heading from "@/ui/heading/Heading"
import AdminList from "@/ui/admin/admin-list/AdminList"
import { useAdminReviews } from "./useAdminReviews"


const Review:FC = () => {
    const {data, isFetching, mutate} = useAdminReviews()

  return (
    <div style={{marginTop:"50px", width: "100%"}}>
     <Heading>Все отзывы</Heading> 
     <AdminList listItems={data} isLoading={isFetching} removeHadler={mutate}/>
    </div>
  )
}

export default Review
