import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Search from '../../components/forms/Search';
import { searchListings } from '../../api/rooms';
import RoomCard from '../../components/cards/RoomCard';

const SearchResult = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchBed, setSearchBed] = useState('');
  const [rooms, setSearchRooms] = useState([]);

  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    // console.table({ location, date, bed });
    searchListings({ location, date, bed }).then((res) => {
      setSearchRooms(res.data);
    });
  }, [window.location.search]);

  return (
    <div className='flex flex-col items-center'>
      <div className='text-center'>Show search result</div>
      <div className='mt-4 sm:w-1/2 md:w-1/3'>
        <Search />
      </div>
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
