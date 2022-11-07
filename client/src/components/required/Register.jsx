import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../assets/login.svg";
const Register = () => {
  const [showError, setShowError] = useState(null);
  // const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.cpassword.value;
    const fullName = firstName + " " + lastName;
    // const photo = form.photoUrl.value;
    // const agreement = form.agreement.checked;
    if (fullName === "" || email === "" || password === "" || confirm === "") {
      setShowError("Cannot be Empty!");
      return;
    }
    if (password.length < 6) {
      setShowError("Password must be at least 6 characters!");
      return;
    }
    if (password !== confirm) {
      setShowError("Password should match!");
      return;
    }
    console.log(fullName, email, password);
    try {
      const response = await axios.post("register", {
        fullName,
        password,
        email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      return;
    }
    form.reset();
    navigate("/login");
    // if (!agreement) {
    //   setShowError("Please Agree before Register!");
    // } else {
    // createUser(email, password)
    //   .then((result) => {
    //     const { user } = result;
    //     console.log(user);
    //     form.reset();
    //     handleProfile(fullName, photo);
    //   })
    //   .catch((err) => console.log(err));
    // navigate("/login");
    // }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="m-w-[1000px] bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden w-1/2 bg-indigo-500 p-10 md:flex items-center justify-center">
            <img src={LoginImg} alt="login" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <form onSubmit={handleSubmit}>
              {showError && (
                <p className="text-xs italic text-red-500 mb-2">{showError}</p>
              )}
              <div className="flex gap-2 sm:gap-6">
                <div className="w-1/2 mb-5">
                  <label className="text-xs font-semibold px-1">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="John"
                  />
                </div>
                <div className="w-1/2 mb-5">
                  <label className="text-xs font-semibold px-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mb-5">
                  <label className="text-xs font-semibold px-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com"
                  />
                </div>
              </div>
              <div className="flex gap-2 sm:gap-6">
                <div className="w-1/2 mb-5">
                  <label className="text-xs font-semibold px-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="************"
                  />
                </div>
                <div className="w-1/2 mb-5">
                  <label className="text-xs font-semibold px-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="************"
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    REGISTER NOW
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
