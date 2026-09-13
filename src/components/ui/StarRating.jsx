// StarRating.jsx — S: Only renders star rating display

const StarRating = ({ rating = 0, showValue = true, size = 'sm' }) => {
  const filled = Math.round(rating)

  return (
    <div
      className={`star-rating ${size === 'lg' ? 'star-rating--lg' : ''}`}
      aria-label={`Rating: ${rating} out of 5`}
    >
      <div className="star-rating__stars">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`star ${s <= filled ? 'star--filled' : 'star--empty'}`}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
      {showValue && (
        <span className="star-rating__value">({rating.toFixed(1)})</span>
      )}
    </div>
  )
}

export default StarRating
