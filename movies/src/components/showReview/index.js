import React from "react";
import Typography from "@mui/material/Typography";

const ShowReview =  ({ review }) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Review By: {review.author}
      </Typography>

      <Typography variant="h6" component="p">
        {review.content} 
      </Typography>
    </>
  );
};
export default ShowReview