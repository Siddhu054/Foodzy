import React, { useState } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import { useUser } from "../context/UserContext";

const ReviewContainer = styled.div`
  margin: 2rem 0;
`;

const ReviewForm = styled.form`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#e23744" : "#ddd")};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #e23744;
  }
`;

const SubmitButton = styled.button`
  background: #e23744;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #d13238;
  }
`;

function ReviewSection({ restaurantId }) {
  const { userData, addReview } = useUser();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({
      restaurantId,
      rating,
      comment,
    });
    setRating(0);
    setComment("");
  };

  const restaurantReviews = userData.reviews.filter(
    (review) => review.restaurantId === restaurantId
  );

  return (
    <ReviewContainer>
      <h3>Reviews</h3>
      <ReviewForm onSubmit={handleSubmit}>
        <StarRating>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarButton
              key={star}
              type="button"
              filled={star <= rating}
              onClick={() => setRating(star)}
            >
              <StarIcon />
            </StarButton>
          ))}
        </StarRating>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <SubmitButton type="submit">Submit Review</SubmitButton>
      </ReviewForm>

      <ReviewList>
        {restaurantReviews.map((review) => (
          <ReviewCard key={review.id}>
            <StarRating>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  sx={{ color: star <= review.rating ? "#e23744" : "#ddd" }}
                />
              ))}
            </StarRating>
            <p>{review.comment}</p>
            <small>{new Date(review.date).toLocaleDateString()}</small>
          </ReviewCard>
        ))}
      </ReviewList>
    </ReviewContainer>
  );
}

export default ReviewSection;
