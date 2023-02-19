import React, { useState } from "react";
import SignUpForm from "../../components/forms/SignUpForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      const response = await signup({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log(response);
      toast.success("Signup user success. Please login");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
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
              handleOnChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
