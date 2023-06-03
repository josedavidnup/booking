import React, { useEffect, useState } from 'react';
import { diffDays } from '../../api/rooms';
import { currencyFormatter } from '../../api/stripe';
import { GrLocation } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import OrderModal from '../modals/OrderModal';

const BookingCard = ({ room, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      {room.image && room.image.contentType ? (
        <img
          src={`${import.meta.env.VITE_APP_API}/api/room/image/${room._id}`}
          className='p-8 rounded-t-lg'
          alt='product image'
        />
      ) : (
        <img
          className='p-8 rounded-t-lg'
          src='https://via.placeholder.com/900x500.png?text=MERN+Booking'
          alt='product image'
        />
      )}
      <div className='px-5 pb-5'>
        <a href='#'>
          <h3 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {room.title}
          </h3>
        </a>
        <p className='tracking-tight text-gray-900 dark:text-white'>
          {room.location} <GrLocation />
        </p>
        <p className='tracking-tight text-gray-900 dark:text-white'>
          {`${room.content.substring(0, 200)}`}
        </p>
        <span className='tracking-tight text-gray-900 dark:text-white'>
          for {diffDays(room.from, room.to)}
          {diffDays(room.from, room.to) <= 1 ? ' day' : ' days'}
        </span>
        <p className='tracking-tight text-gray-900 dark:text-white'>
          {room.bed} bed
        </p>
        <p className='tracking-tight text-gray-900 dark:text-white'>
          Available from {new Date(room.from).toLocaleDateString()} to{' '}
          {new Date(room.to).toLocaleDateString()}
        </p>

        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>
            {currencyFormatter({
              amount: room.price * 100,
              currency: 'usd',
            })}
          </span>
          {showModal && (
            <OrderModal
              session={session}
              orderedBy={orderedBy}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
          <button
            onClick={() => setShowModal(!showModal)}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Show Order Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
