import React from "react";
import { Link } from "react-router-dom";

const SignUpForm = ({ handleSubmit, user, handleOnChange }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign up to Urge Viajar
      </h5>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your name:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="text"
          placeholder="Enter name"
          name="name"
          value={user.name}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="text"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="text"
          placeholder="••••••••"
          required
          name="password"
          value={user.password}
          onChange={handleOnChange}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={!user.name || !user.email || !user.password}
      >
        Sign up
      </button>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already have an account?
        <Link
          to="/login"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
