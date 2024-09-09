import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state||"/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong.");
    }
  };
  return (
    <Layout title={"Register"}>
      <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-b from-[#ffdee9] to-[#b5fffc]">
        <h1 className="text-4xl mt-10">LOGIN</h1>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg p-5 bg-white mt-3 mb-10"
        >
          <div className="mb-3">
            <label htmlFor="Email" className="form-label block mt-3 font-bold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control  border-b border-black rounded-none w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label block font-bold">
              Password
            </label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control  border-b border-black rounded-none w-full"
            required
          />
          <div className="mb-2">
          <button
            type="button" onClick={()=>{navigate('/forgot-password')}}
            className="btn w-full mt-4 border border-black rounded-md bg-black text-white"
          >
            Forgot Password
          </button>
          </div>
          <button
            type="submit"
            className="btn w-full mt-4 border border-black rounded-md bg-black text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
