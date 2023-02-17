import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  return (
    <>
      <div>
        <h1>Sign up</h1>
      </div>
      <div>
        <div>
          <div>
            <SignUpForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
