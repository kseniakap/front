'use client'

import { useActions } from "@/hooks/useActions"
import { useCart } from "@/hooks/useCart"
import { OrdersService } from "@/services/order.service"
import { IProduct } from "@/types/product.interface"
import Heading from "@/ui/heading/Heading"
import { FC, useState } from "react"
import { useMutation } from "react-query"
import CheckOutItem from "./checkOutItem/CheckOutItem"
import st from "./CheckOut.module.scss"
import { convertPrice } from "@/utils/convertPrice"
import Button from "@/ui/button/Button"
import Link from "next/link"
import CatalogSlider from "@/ui/catalog/catalogSlider/CatalogSlider"
import { useProfile } from "@/hooks/useProfile"
import { UserService } from "@/services/user.service"
import InputMask from 'react-input-mask'
import Modal from "@/ui/modal/Modal"
import { INPUT_COMFIRM, TEXTAREA_INFO } from "./input-textarea.data"



const Checkout:FC<{products: IProduct[]}> = ({products = []})=>{
    const {items, total} = useCart()
    
    const {reset} = useActions()
    const {profile} = useProfile()
    const [formData, setFormData] = useState({
        name: profile?.name || '',
        phone: profile?.phone || '',
        city: profile?.city || '',
        street: profile?.street || '',
        house: profile?.house || '',
        flat: profile?.flat || '',
    });
    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(false)

    const handleCheckboxChange: React.ChangeEventHandler<
    HTMLInputElement> = (e) => {
         setIsChecked(e.target.checked);
    };
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const { mutate } = useMutation(['create order'],
        async () => {
        const data = {
            email: profile?.email,
            name: formData.name,
            phone: formData.phone,
            address: `${formData.city}, ул. ${formData.street}, д. ${formData.house}, кв. ${formData.flat}`,

        }
        if (!data.name || !data.phone || !data.address) {
            setError(true)
            throw new Error('Please fill in all the required fields.');
            
        }
            
        await UserService.updateProfile(data);  
        return OrdersService.placeOrder({
            items: items.map((item) => ({
                price: item.price,
                quantity: item.quantity,
                productId: item.product.id,
            })),
            });
        },
        {
            onSuccess({data}){
                reset()
                //Оплата
                // push(data.comfirmation.comfirmation_url)
            }
        }        
    );


   

    const recomendedProduct =  products.filter(product=>!items.map(item=>item.product.id).includes(product.id)).slice(0, 3)
    
    return (
        <>
            {
                items.length ? (
                  <>
                    <section className={st.checkout}>
                        <div className={st.list}>
                            <Heading>Ваша корзина</Heading>
                           <div className={st.content}>
                            {items.map(item=>(
                                    <CheckOutItem key={item.id} product={item.product} quantity={item.quantity}/>
                                ))}
                           </div>
                        </div>
                        <div className={st.right}>
                            <div className={st.form}>
                                <Heading>Оформление</Heading>
                                <input  name="name"  type="text" value={formData.name} onChange={handleInputChange} placeholder="Введите своё имя"  required/>
                                <InputMask name="phone" mask ="+7 (999) 999-99-99" type="tel"  value={formData.phone} onChange={handleInputChange} placeholder="Введите телефон для связи" required/>
                                <fieldset>
                                    <legend> Введите адрес доставки</legend>
                                    <div>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Город" required />
                                        <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Улица" required />
                                        <input type="text" name="house" value={formData.house} onChange={handleInputChange} placeholder="№ дома" required />
                                        <input type="text" name="flat" value={formData.flat} onChange={handleInputChange} placeholder="№ квартиры" />
                                    </div>
                                </fieldset>

                                {error && <p style={{ fontSize: "14px" }}>*Заполните все обязательные поля</p>}
                                </div>
                            <div className={st.footer}>
                                <div className={st.total}>
                                    <p>Общая стоимость:</p>
                                    <div>{convertPrice(total)}</div>
                                </div>
                                <Button disabled={!isChecked} variant="blue" onClick={()=>mutate()}>Оформить заказ</Button>
                                 <label><input type="checkbox" name="privacy" onChange={handleCheckboxChange} required style={{marginRight:"5px"}}/>
                                 <span onClick={(e)=>{
                                    e.preventDefault()
                                    setOpenModal(true)
                                 }}>{INPUT_COMFIRM}</span>

                                 </label>

                                <Modal isOpen={openModal} closeModal={()=>setOpenModal(false)}> 
                                    <Heading>Согласие на обработку персональных данных</Heading>
                                    <textarea  className={st.texareaInfo}>
                                        {TEXTAREA_INFO}
                                    </textarea>  
                                 </Modal>
                            </div>
                        </div>
                    </section>
                    <section className={st.recommended}>
                        <CatalogSlider title="С этим товаром покупают" products={recomendedProduct}/>
                    </section>
                  </>
                ):(<div>
                    <div>Ваш заказ сфомирован</div>
                    <Link href="/">Вернуться на главную</Link>
                </div>)
            }
        </>
    )
}

export default Checkout