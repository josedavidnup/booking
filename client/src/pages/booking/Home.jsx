import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  return <div>Home Page</div>;
};

export default Home;
