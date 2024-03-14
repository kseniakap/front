import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { TypeParamsFilters, TypeProductDataFilters } from '@/services/product/product.types'
import { ProductService } from '@/services/product/product.service'
import ProductExplorer from './ProductExplorer'
import MainContainer from '../MainContainer'
import Header from '@/ui/header/Header'
import Footer from '@/ui/footer/Footer'

export const metadata: Metadata = {
    title: 'Каталог',
    ...NO_INDEX_PAGE
}

export const revalidate = 60

export async function getProducts(searchParams: TypeProductDataFilters) {
    const data = await ProductService.getAll(searchParams)
    return data
}

export default async function ExplorerPage({searchParams}: TypeParamsFilters) {
    const data = await getProducts(searchParams)
    return (
        <>
        <MainContainer>
            <Header/>
            <ProductExplorer initialProducts={data}/>
        </MainContainer>
        <Footer/>
        </>
    )  
}
