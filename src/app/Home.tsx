import { TypePaginationProducts } from "@/types/product.interface"
import { FC } from "react"
import Category from "@/ui/category/Category"
import { carouselItems } from "@/ui/carousel/carousel.data";
import Carousel from "@/ui/carousel/Carousel";
import Search from "@/ui/search/Search";
import CatalogSlider from "@/ui/catalog/catalogSlider/CatalogSlider";
import Map from "@/ui/map/Map";
import "./../assets/styles/style.scss"
import MainContainer from "./MainContainer";
import Header from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";


const Home: FC<TypePaginationProducts> = ({products}) => {
  return (
    <>
      <MainContainer>
        <Header/>
      </MainContainer>
        <Carousel items={carouselItems} />
      <MainContainer>
          <Search/>
          <Category/>
          <CatalogSlider title ="Новый товар" products={products || []}  />
          <Map/>
      </MainContainer>     
      <Footer/> 
    </>
  )
}

export default Home