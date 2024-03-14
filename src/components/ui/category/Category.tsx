
'use client'

import{ useState, type FC } from 'react'
import { CategoryService } from '@/services/category.service';
import { useQuery } from 'react-query'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Spinner } from 'react-bootstrap';
import st from "./Category.module.scss"
import HoverImg from './HoverImg';
import HoverText from './HoverText';

const Category:FC = () => {
  const[activeIndex, setActiveIndex] = useState<number>(2)
  const {data, isLoading} = useQuery({
    queryKey: ['get categories'],
    queryFn: ()  => CategoryService.getAll(),
    select: ({data}) => data
  });

  const pathname = usePathname()
 
  return (
    <section className={st.category}>
      <div className={st.left}>
        <div className={st.block}>
          {
            data?.map((item)=>{
              const isActive  = item.id === activeIndex;
              return ( 
                <HoverText key={item.id} 
                text={item.name} 
                active={isActive}/>)
            })
          }
        </div>
        {/* <img src="./images/kirpich.jpg" alt="" /> */}
        {
          data?.map((item)=>{
            const isActive  = item.id === activeIndex;
            return ( 
              <HoverImg key={item.id} 
              url={item.images} 
              active={isActive}/>)
          })
        }
      </div>
      <div className={st.wrapper}>
        {isLoading ?
          (<Spinner/>) : data ? (<>
              {
                data.map((category)=>(
                  <Link key={category.id}  
                  onMouseEnter={()=>setActiveIndex(category.id)}
                  onMouseLeave={()=> setActiveIndex(2)}
                  style={{color: pathname === `/category/${category.slug}` ? "red" : "black"}} href={`/category/${category.slug}`}>
                    { 
                      category.images && (
                      <img src={category.images} alt="Картинка в категории"/>)
                    }
                    <div className={st.content}>
                      <h3>{category.name}</h3>
                    </div>
                  
                  </Link>
                ))
              }
          </>) 
          : 
        (<div> Категорий нет</div>)
        }
      </div>
    </section>
  )
}

export default Category
