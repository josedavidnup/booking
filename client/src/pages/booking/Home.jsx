import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return <div>Home Page</div>;
};

export default Home;
