import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl ">
        <h1 className="text-5xl font-black text-center m-2">Create Account </h1>
        <h2 className="text-xl font-black text-center m-2">
          Create to enjoy the Knowledge.AI!
        </h2>
        <form className=" m-12 " onSubmit={handleSubmit}>
          <div className="mb-8 ">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 text-center justify-center items-center"
            ></label>
            <input
              type="email"
              placeholder="Email Address"
              className="  block w-full px-4 h-14 py-2 mt-2 bg-[#F8F8F8] font-black border rounded-md focus:border-purple focus:ring-purple focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              id="username"
              onChange={e => setUsername(e.target.value)}
              required
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
              className="  block w-full px-4 h-14 py-2 mt-2 bg-[#F8F8F8]  border rounded-md font-black focus:border-purple focus:ring-purple focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            ></label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="  block w-full px-4 h-14 py-2 mt-2 bg-[#F8F8F8]  border rounded-md font-black focus:border-purple focus:ring-purple focus:outline-none focus:ring focus:ring-opacity-40"
              name="confirm-password"
              id="confirm-password"
              onChange={e => setPassword2(e.target.value)}
              required
            />
            <p>{password2 !== password ? "Passwords do not match" : ""}</p>
          </div>
          <div className="mt-6">

              <button className="w-3/4 border mx-auto block h-16 text-lg md:text-xl text-purple-600 border-purple-600 lg:text-2xl font-black px-4 py-2 tracking-wide transition-colors duration-200 transform bg-purple rounded-md hover:bg-purple-500 hover:text-white focus:outline-none focus:bg-purple-600 ">
                Create Account
              </button>

          </div>
        </form>

        <p className="mt-8 text-xl font-black text-center text-gray-700">
          Already have an account?
          <Link
            to="/"
            className="font-black text-xl h-14 text-purple-600 hover:underline"
          >
            &nbsp;Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
