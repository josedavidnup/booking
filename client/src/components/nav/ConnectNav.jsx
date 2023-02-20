import React from "react";
import { useSelector } from "react-redux";

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <article>
      <h4>{user.name[0]}</h4>
      <h2>{user.name}</h2>
    </article>
  );
};

export default ConnectNav;
