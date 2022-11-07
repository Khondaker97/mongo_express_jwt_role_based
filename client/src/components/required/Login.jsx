// import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImg from "../../assets/login.svg";
import { useState } from "react";
// import { AuthContext } from "../../context/UserContext";

const Login = () => {
  // const { signIn, githubSignIn, googleSignIn, setSignedIn, signedIn } =
  //   useContext(AuthContext);
  const [showError, setShowError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    form.reset();
    try {
      const { data } = await axios.post("login", {
        email,
        password,
      });
      console.log(data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["accessToken"]}`;
    } catch (error) {
      console.log(error);
      const { response } = error;
      if (response.status) {
        setShowError("Your Email or Password isn't correct");
      }
      return;
    }
    //
    //
    navigate(from, { replace: true });
    // signIn(email, password)
    //   .then((result) => {
    //     // const user = result.user;
    //     // console.log(user);
    //     form.reset();
    //     setSignedIn((prev) => !prev);
    //     navigate(from, { replace: true });
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="min-w-scr  return (een min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden w-1/2 bg-indigo-500 p-10 md:flex items-center justify-center">
            <img src={LoginImg} alt="login" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-2">
              <h1 className="text-3xl font-extrabold">Stay With Tech Ichi</h1>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs text-xl font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-700 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-indigo-400 hover:text-slate-100 hover:shadow focus:shadow-md focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Google</span>
                  </button>

                  <button className="w-full max-w-xs text-xl font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-700 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-indigo-400 hover:text-slate-100 hover:shadow focus:shadow-md focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-6" viewBox="0 0 32 32">
                        <path
                          fillRule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">GitHub</span>
                  </button>
                </div>

                <div className="my-6 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 bg-white tracking-wide font-medium  transform translate-y-1/2">
                    Or sign In With E-mail
                  </div>
                </div>

                <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                  {showError && (
                    <p className="text-xs italic text-red-500 mb-2">
                      {showError}
                    </p>
                  )}
                  <input
                    className="w-full p-4 rounded-lg font-medium border-2 bg-gray-100 border-gray-200 placeholder-gray-500 outline-none focus:border-indigo-500 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <input
                    className="w-full p-4 rounded-lg font-medium bg-gray-100 border-2 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign In</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
