import Image from "next/image"
import { useState } from "react"
import st from "./ProductGallery.module.scss";

interface IProductCallery{
    images: string[]
}

export default function ProductGallery({images}: IProductCallery){
    const [activeImg, setActiveImg] = useState(0)
  
  return (
    <div className={st.gallery}>
        <div className={st.smallImg} >
            {images.length>1 && images.map((img, i)=>(
                <button key={i} onClick={()=>setActiveImg(i)}>
                    <Image src={img} width={120} height={95} alt="картинка-дополнение" priority style={{border: i === activeImg ? "1px solid black" : 'none', objectFit:"cover"}}/>
                </button>
            ))}
        </div>
        <Image src={images[activeImg]} style={{objectFit:"cover"}} width={300} height={300} alt="главная картинка" priority draggable={false}/>
    </div>
  )
}

