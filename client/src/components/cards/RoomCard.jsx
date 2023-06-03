import React, { useEffect } from 'react';
import { diffDays } from '../../api/rooms';
import { currencyFormatter } from '../../api/stripe';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const RoomCard = ({
  room,
  handleRoomDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='relative'>
        {room.image && room.image.contentType ? (
          <img
            src={`${import.meta.env.VITE_APP_API}/api/room/image/${room._id}`}
            className='w-full h-48 object-cover rounded-t-lg'
            alt='product image'
          />
        ) : (
          <img
            className='w-full h-48 object-cover rounded-t-lg'
            src='https://via.placeholder.com/900x500.png?text=MERN+Booking'
            alt='product image'
          />
        )}
        <div className='absolute top-2 right-2 bg-white rounded-full p-2 shadow'>
          {owner && (
            <div className='text-gray-500'>
              <AiOutlineEdit className='cursor-pointer' />
            </div>
          )}
          {owner && (
            <div className='text-gray-500 mt-2'>
              <AiOutlineDelete
                className='cursor-pointer'
                onClick={() => handleRoomDelete(room._id)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='px-5 py-4'>
        <a href='#'>
          <h3 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {room.title}
          </h3>
        </a>
        <p className='flex items-center text-gray-900 dark:text-white mt-2'>
          {room.location} <GrLocation className='ml-1' />
        </p>
        <p className='text-gray-900 dark:text-white mt-2'>
          {`${room.content.substring(0, 200)}`}
        </p>
        <div className='flex items-center text-gray-900 dark:text-white mt-2'>
          <span className='mr-2'>
            for {diffDays(room.from, room.to)}
            {diffDays(room.from, room.to) <= 1 ? ' day' : ' days'}
          </span>
          <span>{room.bed} bed</span>
        </div>
        <p className='text-gray-900 dark:text-white mt-2'>
          Available from {new Date(room.from).toLocaleDateString()} to{' '}
          {new Date(room.to).toLocaleDateString()}
        </p>
        <div className='flex items-center justify-between mt-4'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>
            {currencyFormatter({
              amount: room.price * 100,
              currency: 'usd',
            })}
          </span>
          {showViewMoreButton && (
            <Link
              to={`/room/${room._id}`}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Show more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
