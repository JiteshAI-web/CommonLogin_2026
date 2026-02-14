import React, { useState } from "react";
import Layout from "../layout/Layout";
import logo from "./../../assets/image/logo.png";
import { useForm } from "react-hook-form";
import map from "./../../assets/image/Frame.png";
import axios from "axios";

const LoginPage = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get values directly from the input fields
    const identifier = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(`${process.env.REACT_APP_IP}login/`, {
        identifier,
        password,
      });
      console.log("login Successfullly");
      // alert("login successful");
      console.log(response.data.message);
      setResponseMessage(response.data.error);
      console.log(response);
      console.log(response.data.Mob);
      console.log(response.data.category);

      if (response.data.category === "master") {
        const url = `https://newloginbg.bc-pl.com/master?category=${response.data.category}&token=${response.data.csrf_token}&mobno=${response.data.Mob}`;
        window.location.href = url;
      }

      if (response.data.user_category === "Aquafarming") {
        if (response.data.category === "owner") {
          const url = `https://newloginbg.bc-pl.com/manager?category=${response.data.category}&token=${response.data.csrf_token}&mobno=${response.data.Mob}`;
          window.location.href = url;
        } else if (response.data.category === "manager") {
          const url = `https://newloginbg.bc-pl.com/manager?category=${response.data.category}&token=${response.data.csrf_token}&mobno=${response.data.Mob}`;
          window.location.href = url;
        }
      } else if (response.data.user_category === "WaterBody") {
        if (response.data.category === "owner") {
          const url = `https://water.bc-pl.com/manager?category=${response.data.category}&token=${response.data.csrf_token}&mobno=${response.data.Mob}`;
          window.location.href = url;
        } else if (response.data.category === "manager") {
          const url = `https://water.bc-pl.com/manager?category=${response.data.category}&token=${response.data.csrf_token}&mobno=${response.data.Mob}`;
          window.location.href = url;
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleClickForgot = async () => {
    try {
      if (!email) {
        setResponseMessage("Please enter your email.");
        console.log("email not pass");
        return;
      }
      console.log(email);

      const response = await axios.post(
        `${process.env.REACT_APP_IP}forgotpassword/`,
        {
          Email: email,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setResponseMessage("Password reset link sent to your email!");
        setEmail(""); 
        setShowForgotPassword(!showForgotPassword)
      } else {
        setResponseMessage("Failed to send password reset link.");
      }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("An error occurred while sending the reset link.");
    }
  };

  return (
    <Layout title="common login Page">
      <section
        className="dark:bg-gray-900 h-full flex justify-center"
        style={{
          background: "linear-gradient(to right, rgb(0, 101, 236), #94c1ff)",
        }}
      >
        <div className="flex flex-col items-center justify-center px-4 py-8 h-screen lg:py-0 lg:w-1/2">
          <div className="w-full bg-white rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center mb-0">
                <img src={logo} alt="logo" />
              </div>
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white text-center mt-[0px]">
                Log in
              </h1>
              <p
                className="text-md font-semibold leading-tight tracking-tight text-black md:text-md dark:text-white text-center"
                style={{ paddingTop: "0px" }}
              >
                Common Login
              </p>

              {responseMessage && (
                <div className="text-center text-sm font-medium text-red-500 mb-4">
                  {responseMessage}
                </div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your phone number"
                    onClick={() => setShowForgotPassword(false)}
                    required
                    {...register("username", {
                      required: true,
                    })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onClick={() => setShowForgotPassword(false)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-sm font-light text-red-500">
                      Password required
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                  >
                    Forgot Password
                  </button>
                </div>
                {showForgotPassword && (
                  <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter your email to reset password
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    onClick={handleClickForgot}
                    className="bg-blue-600 text-sm text-white p-2 mt-3 rounded hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:cursor-pointer transition-all duration-200 ease-in-out"
                    >
                    Reset
                  </div>
                </div>
                
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link to="/signup">
                    {" "}
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                      Register Here
                    </span>{" "}
                  </Link>
                </p> */}
              </form>
            </div>
          </div>
        </div>
        <div className="hidden bg-cover lg:block lg:w-1/2 m-auto">
          <img src={map} alt="map" className="m-auto w-3/4" />
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
