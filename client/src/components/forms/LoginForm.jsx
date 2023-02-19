import React from "react";

const LoginForm = ({ handleSubmit, user, handleOnChange }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col m-10 max-w-xl max-h-full"
    >
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
      <button disabled={!user.email || !user.password} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
