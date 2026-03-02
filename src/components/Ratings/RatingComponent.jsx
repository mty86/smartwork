import { FiStar } from 'react-icons/fi'
import { useState } from 'react'

export const RatingComponent = ({ rating, onRatingChange, editable = false }) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => editable && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          disabled={!editable}
          className={`${editable ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <FiStar
            size={24}
            className={`transition-colors ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-lg font-semibold text-gray-700">
        {rating}/5
      </span>
    </div>
  )
}

export default RatingComponent
