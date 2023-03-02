import React, { useState, useCallback, useEffect } from "react";
import toast from "react-toastify";
import ReactGoogleAutocomplete from "react-google-autocomplete";

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

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const { title, content, location, image, price, from, to, bed } = values;

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelFrom = () => (
    <form onSubmit={handleSubmit}>
      {JSON.stringify(values)}

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
      <label>Place</label>

      <ReactGoogleAutocomplete
        className="form-control m-2"
        placeholder="Location"
        apiKey={configuration}
        onPlaceSelected={(place) => {
          setLocation(place.formatted_address);
        }}
        style={{ height: "50px" }}
      />
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Save
      </button>
    </form>
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
  }, []);

  const configuration = import.meta.env.VITE_GOOGLEPLACES_API_KEY;

  return (
    <>
      <div>Add Hotel</div>
      <div>
        <div>{hotelFrom()}</div>
        <div>
          <img src={preview} alt="preview_image" width={200} />
        </div>
      </div>
    </>
  );
};

export default NewRoom;
