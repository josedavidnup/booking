import React, { useState, useCallback, useEffect } from "react";
// import toast from "react-toastify";
import { AddressAutofill, config } from "@mapbox/search-js-react";

const NewRoom = () => {
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const { title, content, location, image, price, from, to, bed } = values;

  const handleImageChange = (e) => {
    //
  };

  const handleChange = (e) => {
    //
  };

  const hotelFrom = () => (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={handleImageChange}
        name="image"
        type="file"
        accept="image/*"
      />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title"
        onChange={handleChange}
        value={title}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Content
      </label>
      <textarea
        name="content"
        value={content}
        rows="4"
        onChange={handleChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Content"
      />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Price
      </label>
      <input
        type="number"
        name="price"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Price"
        onChange={handleChange}
        value={price}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Bed
      </label>
      <input
        type="number"
        name="bed"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Beds"
        onChange={handleChange}
        value={bed}
      />
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Save
      </button>
      <label>Place</label>
      <AddressAutofill accessToken={token}>
        <input
          placeholder="Start typing your address, e.g. 123 Main..."
          autoComplete="address-line1"
          id="mapbox-autofill"
        />
      </AddressAutofill>
    </form>
  );

  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = import.meta.env.VITE_MAPBOX_KEY;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
  }, []);

  return <>{hotelFrom()}</>;
};

export default NewRoom;
