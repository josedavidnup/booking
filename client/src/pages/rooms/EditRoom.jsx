import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoom, updateRoom } from "../../api/rooms";
import RoomEditForm from "../../components/forms/RoomEditForm";

const EditRoom = () => {
  const { roomId } = useParams();
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const { title, content, price, from, to, bed, location } = values;

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const loadSellerRoom = async () => {
    const res = await getRoom(roomId);
    // console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${import.meta.env.VITE_BASE_URL}/room/image/${res.data._id}`);
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

    try {
      const res = await updateRoom(auth.token, roomData, roomId);
      console.log(res);
      toast.success("New room has been updated");
      //   navigate(`/user/rooms`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSellerRoom();
  }, []);

  return (
    <div>
      <h2>Edit Hotel</h2>
      <div>
        <div>Show edit form</div>
      </div>
      <div>
        <RoomEditForm
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
        <img src={preview} className="p-8 rounded-t-lg" alt="product image" />
      </div>
    </div>
  );
};

export default EditRoom;
