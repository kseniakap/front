'use client'

import type{ FC } from "react";
import { IProduct } from "@/types/product.interface";
import ProductItem from "../product-item/ProductItem";
import { Spinner } from "@/ui/spinner/Spinner";
import Heading from "@/ui/heading/Heading";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import st from "./CatalogSlider.module.scss";

interface ICatalog {
    products: IProduct[], 
    isLoading?: boolean,
    title?: string, 
    isPagination?: boolean
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

//Каталог для главной страницы (слайдер)
const CatalogSlider: FC<ICatalog> = ({products, isLoading, title}) =>{
    if (isLoading) return <Spinner/>
    return (
        <section className={st.catalog}>
            {title && <Heading>{title}</Heading>}
            {products.length ? 
                (
                <div className={st.wrapper}>
                  <Carousel responsive={responsive} >
                    {
                      products.map(product =>
                       <ProductItem key ={product.id} product={product}/>)
                    }
                  </Carousel>
								</div>
								)    
                : <p>Товаров нет</p>}
        </section>
    )
}

export default CatalogSlider