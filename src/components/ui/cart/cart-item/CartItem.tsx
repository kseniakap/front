import { ICartItem } from '@/types/cart.interface'
import { convertPrice } from '@/utils/convertPrice'
import Image from 'next/image'
import  { FC } from 'react'
import CartChangeAmount from './CartChangeAmount'
import st from "./CartItem.module.scss"

const CartItem:FC<{item: ICartItem}> = ({item}) => {
  return (
    <div className={st.item}>
      <div className={st.top}>
        <img src={item.product.images[0]} width={80} height={60} alt ={item.product.name}/>
        <div>
          <div className={st.name}>{item.product.name}</div>
          <p>{convertPrice(item.product.price)} / м³</p>
        </div>
      </div>
      <CartChangeAmount item={item}/>
    </div>
  )
}

export default CartItem
