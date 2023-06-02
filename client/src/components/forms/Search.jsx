import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import moment from 'moment';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
const config = import.meta.env.VITE_GOOGLEPLACES_API_KEY;
const { RangePicker } = DatePicker;
const { Option } = Select;
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [bed, setBed] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <div className='bg-gray-100 py-12'>
      <div className='container mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto'>
          <div className='mb-4'>
            <ReactGoogleAutocomplete
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 h-12 px-4'
              placeholder='Location'
              apiKey={config}
              defaultValue={location}
              onPlaceSelected={(place) => {
                setLocation(place.formatted_address);
              }}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <RangePicker
                onChange={(value, dateString) => setDate(dateString)}
                disabledDate={(current) =>
                  current && current.valueOf() < moment().subtract(1, 'days')
                }
                className='w-full'
              />
            </div>
            <div>
              <Select
                onChange={(value) => setBed(value)}
                placeholder='Number of beds'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              >
                <Option key={1}>1</Option>
                <Option key={2}>2</Option>
                <Option key={3}>3</Option>
                <Option key={4}>4</Option>
              </Select>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className='block w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 px-5 mt-4 text-sm font-medium rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'
          >
            <AiOutlineSearch className='inline-block mr-2' />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
