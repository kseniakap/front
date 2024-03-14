import type { FC } from "react"
import { IReview } from "@/types/review.interface"
import st from "./ReviewItem.module.scss"
import Image from "next/image"
import { Rating } from "react-simple-star-rating"


const ReviewItem: FC<{review: IReview }> = ({review}) => {
  return (
    <div className={st.review}>
       <div className={st.top}>
          <div>
            <Image src={review.user.avatarPath} alt = {review.user.name} width={30} height={30}/>
            <p>{review.user.name}</p>
          </div>
          <Rating readonly initialValue={+review.rating} SVGstyle={{display:"inline-block"}} size={20} allowFraction transition/>
       </div>
      
        <div className="">{review.text}</div>
    </div>
  )
}

export default ReviewItem