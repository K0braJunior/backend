import React from 'react';
import arrowIcon from '../assets/arrowIcon.svg';
import { exclusiveOffers } from '../assets/assets';
import Title from './Title'; // Assure-toi que le fichier Title.jsx est bien dans le dossier components

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>

      {/* Titre + bouton */}
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title
          align='left'
          title='Exclusive Offers'
          subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.'
        />

        <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
          View All Offers
          <img
            src={arrowIcon}
            alt='arrow-icon'
            className='group-hover:translate-x-1 transition-all'
          />
        </button>
      </div>

      {/* Grille des offres */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12'>
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className='group relative flex flex-col justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center h-64'
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className='bg-red-500 px-3 py-1 rounded-full text-sm font-semibold'>
              {item.priceOff}% OFF
            </p>

            <div>
              <p className='text-2xl font-medium font-playfair'>{item.title}</p>
              <p>{item.description}</p>
              <p className='text-xs text-white/70 mt-3'>Expires {item.explryDate}</p>
            </div>

            <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
              View
            </button>

            <div className='absolute bottom-6 left-4'>
              <h3 className='text-xl font-bold'>{item.title}</h3>
              <p className='text-sm'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
