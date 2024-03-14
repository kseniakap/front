"use client"

import { TypePaginationProducts } from "@/types/product.interface";
import { FC, useState } from "react";
import ProductItem from "./product-item/ProductItem";
import Heading from "@/ui/heading/Heading";
import SortDropDown from "../../../app/explorer/sort/SortDropDown";
import Button from "@/ui/button/Button"
import { EnumProductSort } from "@/services/product/product.types";
import { useQuery } from "react-query";
import { ProductService } from "@/services/product/product.service";
import { Spinner } from "react-bootstrap";

interface ICataloAllProducts {
    // data: TypePaginationProducts, 
    title?: string, 
}

const CatalogAllProducts: FC<ICataloAllProducts> = ({ title }) =>{
  const[sortType, setSortType] = useState<EnumProductSort>(EnumProductSort.NEWEST)
  const [page, setPage] = useState(1)
  const numberProductShow = 6

  const {data: response, isLoading} = useQuery({
    queryKey: ['products', sortType, page],
    queryFn: ()  => ProductService.getAll({
        page, 
        perPage: numberProductShow,
        sort: sortType
      }),
  });
  
  if (isLoading) return <Spinner/>

  return (
    <section>
      {title && <Heading>{title}</Heading>}
      {/* <SortDropDown sortType={sortType} setSortType={setSortType} /> */}
      {response?.products.length ? 
          (
          <>
            <div style={{display:"flex", gap:"40px", flexWrap:"wrap"}}>
              {
                response?.products.map(product =>
                  <ProductItem key ={product.id} product={product}/>)
              }
            </div>
            <div className="" style={{display:"flex", gap:"30px"}}>
              {
                Array.from({length:response.length / numberProductShow+1}).map((_, i)=>{
                  const pageNumber = i + 1
                  return (<Button key = {pageNumber} onClick={()=>setPage(pageNumber)}>{pageNumber}</Button>)
                })
              }
            </div>
          </>
          )    
          : <p>Товаров нет</p>}
    </section>
  )
}

export default CatalogAllProducts