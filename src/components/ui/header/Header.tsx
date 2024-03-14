'use client'

import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { FaUser } from "react-icons/fa6";
import Cart from "../cart/HeaderCart";
import HeaderFavorite from "../HeaderFavorite";
import LogOutUser from "../LogOutUser";
import { useIsAdminPanel } from "@/hooks/useIsAdminPanel";
import { useAuth } from "@/hooks/useAuth";
import st from "./Header.module.scss"


const Header: FC = () => {
  const {isAdminPanel} = useIsAdminPanel()
  const {user} = useAuth()

    return  (
      <>
        {!isAdminPanel &&
        (
          <header className={st.header}>
          <div className={st.left}>
            <Link href="/">
              <Image priority width={155} height={55} src="/images/logo2.png" alt="логотип магазина Декалюр"/>
           </Link>
            <div>
              <Link href='/explorer'>
                Каталог
              </Link>
              <Link href='/'>
                Доставка и оплата
              </Link>
            </div>
          </div>
         
          <div className={st.right}>
            {/* Переход на админ панель */}
            {
              user?.isAdmin && !isAdminPanel && (
                <Link href="/admin">Админ панель</Link>
              )
            }
          
            <LogOutUser/>
            {
              user?.email && ( <Link href='/favorites'><HeaderFavorite/></Link>)
            }
            {
              !user?.email && (   
                <Link href='/auth'>
                  <FaUser />
                </Link>)
            }
           
         
            {/* {
               user?.email && (<HeaderProfile/>)
            } */}
            <Cart/>
          </div>
        </header>
        )
        }
      </>
   
    )
}

export default Header