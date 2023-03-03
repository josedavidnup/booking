import React from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { DatePicker } from "antd";
import moment from "moment";
const config = import.meta.env.VITE_GOOGLEPLACES_API_KEY;

const RoomCreateForm = ({
  values,
  setValues,
  handleImageChange,
  handleSubmit,
  location,
  setlocation,
  handleChange,
}) => {
  const { title, content, price, from, to } = values;
  return (
    <form onSubmit={handleSubmit}>
      {JSON.stringify(values)}
      {JSON.stringify(location)}

      <input
        type="text"
        name="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title"
        onChange={handleChange}
        value={title}
      />
      <textarea
        name="content"
        value={content}
        rows="4"
        onChange={handleChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Content"
      />

      <input
        type="number"
        name="price"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Price"
        onChange={handleChange}
        value={price}
      />
      <select
        name="bed"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setValues({ ...values, bed: e.target.value })}
        defaultValue={"DEFAULT"}
      >
        <option value={"DEFAULT"} disabled>
          Number of Beds
        </option>
        <option key={1}>1</option>
        <option key={2}>2</option>
        <option key={3}>3</option>
        <option key={4}>4</option>
      </select>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Upload file
      </label>

      <ReactGoogleAutocomplete
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        placeholder="Location"
        apiKey={config}
        onPlaceSelected={(place) => {
          setlocation(place.formatted_address);
        }}
        style={{ height: "50px" }}
      />

      <DatePicker
        placeholder="Select date start"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        placeholder="Select date end"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment(from).subtract()
        }
      />
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={handleImageChange}
        name="image"
        type="file"
        accept="image/*"
        multiple
      />

      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Save
      </button>
    </form>
  );
};

export default RoomCreateForm;
