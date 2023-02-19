import React from "react";

const SignUpForm = ({ handleSubmit, user, handleOnChange }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col m-10 max-w-xl max-h-full"
    >
      <div>
        <label>Your name:</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={user.name}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label>Your email:</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          placeholder="Enter password"
          name="password"
          value={user.password}
          onChange={handleOnChange}
        />
      </div>
      <button
        type="submit"
        disabled={!user.name || !user.email || !user.password}
      >
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
