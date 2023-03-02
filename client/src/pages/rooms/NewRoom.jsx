import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { createRoom } from "../../api/rooms";

const NewRoom = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [location, setlocation] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const { title, content, image, price, from, to, bed } = values;

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let roomData = new FormData();
    roomData.append("title", title);
    roomData.append("content", content);
    roomData.append("location", location);
    roomData.append("price", price);
    image && roomData.append("image", image);
    roomData.append("from", from);
    roomData.append("to", to);
    roomData.append("bed", bed);
    console.log(...roomData);

    const res = await createRoom(auth.token, roomData);
    console.log(res);
    toast.success("New room has been created");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const config = import.meta.env.VITE_GOOGLEPLACES_API_KEY;

  const hotelFrom = () => (
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
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={handleImageChange}
        name="image"
        type="file"
        accept="image/*"
      />
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

      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Save
      </button>
    </form>
  );

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
