'use client'

import{useState, type FC } from "react"
import { IAdminListItem } from "./admin-list.interface"
import AdminActions from "../admin-actions/AdminActions"
import { convertPrice } from "@/utils/convertPrice"
import { formatTel } from "@/utils/formatTel"
import { useAdminAllProducts } from "@/app/admin/products/useAdminProduct"
import st from "./AdminList.module.scss"

const AdminListItem:FC<IAdminListItem> = ({removeHadler, listItem}) => {
  const[showMore, setShowMore] = useState<boolean>(false)
  
  return (
   <>
     <div className={st.item}>
        {listItem?.image &&<img src={listItem?.image} alt="фото товара" />}
        <div className={st.content}>
         {
            listItem.items.map(value => {
              if (value.startsWith('+7')) {
                return (
                <div key={value}>
                  <a href={`tel:${formatTel(value)}`} key={value}>Позвонить</a>
                  <p>{value}</p>
                </div> 
                )
              }
              return <div key={value}>{value}</div>
            })
          }
        </div>    
        <AdminActions viewUrl={listItem.viewUrl} editUrl={listItem.editUrl} removeHadler={removeHadler} showOrder = {listItem.showOrder} showMore={showMore} setShowMore={setShowMore}/>
    </div>
    {
      showMore && (
      <div className={st.moreInfo}>
        <table>
          <thead>
            <tr>
              <th>Цена</th>
              <th>Количество</th>
              <th>Общая цена</th>
              <th>Фотография</th>
            </tr>
          </thead>
          <tbody>
            {
              listItem?.ordersArrray?.map(item => (
                <tr key={item.id}>
                  <td>{convertPrice(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{convertPrice(+item.quantity * +item.price)}</td>
                  <td><img src={item.product.images[0]} alt="изображение товара" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      )
    }
   </>
  )
}

export default AdminListItem