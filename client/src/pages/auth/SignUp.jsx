import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/signup`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Sign up</h1>
      </div>
      <div>
        <div>
          <div>
            <SignUpForm
              handleSubmit={handleSubmit}
              user={user}
              setUser={setUser}
              handleOnChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
