function ReviewsItem({review}) {
  const { user, text, img} = review;

  return (
    <div className='reviews-item'>
      <img className='reviews-item-img' src={img}></img>
      <div className='reviews-item-container'>
        <h3 className='review-item-title'>{user}</h3>
        <span className='review-item-quotation'>
          &ldquo;
          <span className='review-item-content'>{text}</span>
          &bdquo;
        </span>
      </div>
    </div>
  )
}

export default ReviewsItem;