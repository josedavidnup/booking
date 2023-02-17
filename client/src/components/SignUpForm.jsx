import React from "react";

const SignUpForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
