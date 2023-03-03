import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createRoom } from "../../api/rooms";
import RoomCreateForm from "../../components/forms/RoomCreateForm";

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
    console.log(e.target.files[0]);
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

    try {
      const res = await createRoom(auth.token, roomData);
      console.log(res);
      toast.success("New room has been created");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div>Add Hotel</div>
      <div>
        <div>
          <RoomCreateForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            location={location}
            setlocation={setlocation}
          />
        </div>
        <div>
          <img src={preview} alt="preview_image" width={200} />
          <div
            id="default-carousel"
            className="relative"
            data-carousel="static"
          ></div>
        </div>
      </div>
    </>
  );
};

export default NewRoom;
