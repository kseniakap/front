
import { ProductService } from '@/services/product/product.service'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Checkout from './CheckOut'
import MainContainer from '../MainContainer'
import Header from '@/ui/header/Header'
import Footer from '@/ui/footer/Footer'

export const metadata: Metadata = {
    description:"Ваша корзина", 
    ...NO_INDEX_PAGE
}

export const revalidate = 60

export async function getProducts() {
    const data = await ProductService.getAll({
        page:1, 
        perPage:6,
        ratings: ""
    })
    return data
}

export default async function CheckOutPage() {
    const data = await getProducts()
    return (
        <>
        <MainContainer>
            <Header/>
            <Checkout products={data?.products}/>  
        </MainContainer>
        <Footer/>  
        </>     
    )
}
