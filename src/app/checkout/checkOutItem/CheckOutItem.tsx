import { IProduct } from "@/types/product.interface";
import { FC } from "react";
import st from "./CheckOutItem.module.scss"
import Image from "next/image";
import { convertPrice } from "@/utils/convertPrice";
import CartChangeAmount from "@/ui/cart/cart-item/CartChangeAmount";

const CheckOutItem:FC<{product: IProduct, quantity: number}>=({product, quantity}) =>{

   return (
    <div className={st.item}>
        <img src={product.images[0]} alt={product.name}/>
        <p >{product.name}</p>   
        <p>{convertPrice(product.price)}</p>
        <p>{quantity}</p>
        <p>{+quantity * +product.price} ₽</p>
    </div>
   )
}

export default CheckOutItem