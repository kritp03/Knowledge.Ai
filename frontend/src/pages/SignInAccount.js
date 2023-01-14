import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
    useEffect(() => {
        let isAuth = JSON.parse(localStorage.getItem('authTokens'));
        if(isAuth && isAuth !== null) {
            navigate("/home");
        }
    }, []);
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden min-w-[300px] md:w-full">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl ">
        <h1 className="text-5xl font-black text-center m-2">Log In</h1>
        <h2 className="text-xl font-black text-center m-2">
          Log in to enjoy the Knowledge.AI!
        </h2>
        <form className="m-12" onSubmit={handleSubmit}>
          <div className="mb-8 ">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 text-center justify-center items-center"
            ></label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="hover:border-purple-200 border-2 block w-full px-4 h-14 py-2 mt-2 bg-[#F8F8F8] font-black border rounded-md focus:border-purple focus:ring-purple focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            ></label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="hover:border-purple-200 border-2 block w-full px-4 h-14 py-2 mt-2 bg-[#F8F8F8]  border rounded-md font-black focus:border-purple focus:ring-purple focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">

            <button className="shadow-xl w-3/4 border mx-auto block h-16 text-2xl border-purple-600 font-black px-4 py-2 tracking-wide text-purple-600 transition-colors duration-200 transform bg-purple hover:text-white rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-600">
              Log in
            </button>


          </div>
        </form>

        <p className="mt-8 text-xl font-black text-center text-gray-700">
          Don't have an account?
          <Link
            to="/signUp"
            className="font-black text-xl text-purple-600 hover:underline"
          >
            &nbsp;Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
