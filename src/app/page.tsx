import Home from '@/app/Home'
import { ProductService } from '@/services/product/product.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    description:"Добро пожаловать! Магазин Декалюр. Декоративный кирпич. 3d панели. "
}

export const revalidate = 60

export async function getProducts() {
    const data = await ProductService.getAll({
        page:1, 
        perPage:8,
        ratings: ""
    })
    return data
}

export default async function HomePage() {
    const data = await getProducts()
    return (
        <Home products ={data.products} length={data.length}/>  
    )
}
