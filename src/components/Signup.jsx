import React, { useRef } from "react";
import { Input, Button } from ".";
import authService from "../appwrite/AuthService";
import { useDispatch } from "react-redux";

import {login} from '../store/authSlice'
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const nameref = useRef(null);

  const dispatch =  useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const password = passwordref.current.value;
    const name = nameref.current.value;
    console.log(email, password, name);

    authService.register({ name, email, password }).then((user) => {
      if (user.success) {
        console.log("user logged in successfully")
        navigate('/login')
      }
    });
  };
  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto mx-10 sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-2">
                <Input
                  label="Name : "
                  placeholder="Enter your Full Name"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  ref={nameref}
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  autoComplete=""
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  ref={emailref}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  label="Password : "
                  placeholder="Enter your password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  autoComplete="current-password"
                  ref={passwordref}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                children="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
