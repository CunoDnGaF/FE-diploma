import { useState } from 'react';
import ReviewsItem from './ReviewsItem/ReviewsItem'

const allReviews = [
  {
    user: 'Екатерина Вальнова 1',
    text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
    img: './src/img/reviewImg1.png',
    id: '001',
  },
  {
    user: 'Евгений Стрыкало 1',
    text: 'СМС-сопровождение до посадки, cразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
    img: './src/img/reviewImg2.png',
    id: '002',
  },
  {
    user: 'Екатерина Вальнова 2',
    text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
    img: './src/img/reviewImg1.png',
    id: '003',
  },
  {
    user: 'Евгений Стрыкало 2',
    text: 'СМС-сопровождение до посадки, cразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
    img: './src/img/reviewImg2.png',
    id: '004',
  },
  {
    user: 'Екатерина Вальнова 3',
    text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
    img: './src/img/reviewImg1.png',
    id: '005',
  },
  {
    user: 'Евгений Стрыкало 3',
    text: 'СМС-сопровождение до посадки, cразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
    img: './src/img/reviewImg2.png',
    id: '006',
  },
  {
    user: 'Екатерина Вальнова 4',
    text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
    img: './src/img/reviewImg1.png',
    id: '007',
  },
]



function Reviews() {
  const [checkedPage, setCheckedPage] = useState(0);
  
  const reviews = allReviews.reduce((reviewsArray, item, index) => { 
    const chunkIndex = Math.floor(index/2)
  
    if(!reviewsArray[chunkIndex]) {
      reviewsArray[chunkIndex] = [] 
    }
  
    reviewsArray[chunkIndex].push(item)
  
    return reviewsArray
  }, [])

  return (
    <div className='reviews' id='reviews'>
      <div className='reviews-container'>
        <h2 className='reviews-title'>ОТЗЫВЫ</h2>
        <div className='reviews-content'>
          <div className='reviews-items'>{reviews[checkedPage].map((review) => <ReviewsItem key={review.id} review={review}/>)}</div>
          <div className='reviews-pages'>
            {reviews.map((review) => <div key={reviews.indexOf(review)} className={reviews.indexOf(review) === checkedPage ? 'reviews-page rp-checked' : 'reviews-page'} onClick={() => setCheckedPage(reviews.indexOf(review))}></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews;