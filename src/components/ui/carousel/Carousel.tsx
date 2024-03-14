'use client'

import React, { FC } from 'react'
import { ICarouselItem } from './carousel.interface'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import CarouselNavigation from './CarouselNavigation'
import { TransitionGroup } from 'react-transition-group'
import CSSTransition from '../CSSTransitionGroup'
import styles from "./Carousel.module.scss"
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ICarousel {
    items: ICarouselItem[], 
    className?: string
}

const Carousel:FC<ICarousel> = ({items}) => {
    const {selectedItemIndex} = useTypedSelector(state=> state.carousel)
    const selectedItem = items[selectedItemIndex]
  return (
    <section className={styles.carousel}> 
       
        <TransitionGroup style={{position:"relative", height:"620px", backgroundColor:"#CDCDCD"}}>
          <CSSTransition key={selectedItem.title} timeout={500} classNames={{
            enter: styles['item-enter'],
            enterActive: styles['item-enter-active'],
            exit: styles['item-exit'],
            exitActive: styles['item-exit-active']
          }} unmountOnExit mountOnEnter>
            <div className={styles.item}>
            <CarouselNavigation/>
            <div className={styles.content}>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
                  {
                    selectedItem.link ? (
                      <Link href={selectedItem.link}>Перейти к каталогу</Link>
                    ) : null
                  }
              </div>
              {
                selectedItem.image && <LazyLoadImage src = {selectedItem.image} alt="картинка слайда"/>
              }
             </div>
          </CSSTransition>
        </TransitionGroup>
    </section>
  )
}
export default Carousel