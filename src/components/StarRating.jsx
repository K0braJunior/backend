import React from 'react';
import { assets } from '../assets/assets';
import starIconFilled from '../assets/starIconFilled.svg';
const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5).fill('').map((_, index) => (
        <img
          key={index}
          src={rating > index ? starIconFilled : assets.starIconOutlined}
          alt="star-icon"
          className='w-4.5 h-4.5'
        />
      ))}
    </>
  );
};

export default StarRating;
