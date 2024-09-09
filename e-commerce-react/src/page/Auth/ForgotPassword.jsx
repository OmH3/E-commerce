import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong.");
    }
  };
  return (
    <Layout title={"Forgot-Password"}>
        <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-b from-[#ffdee9] to-[#b5fffc]">
        <h1 className="text-4xl mt-10">RESET PASSWORD</h1>
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
            <label htmlFor="FavouriteSport" className="form-label block mt-3 font-bold">
              Favourite Sport
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control  border-b border-black rounded-none w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label block font-bold">
             New Password
            </label>
          </div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control  border-b border-black rounded-none w-full"
            required
          />
          <button
            type="submit"
            className="btn w-full mt-4 border border-black rounded-md bg-black text-white"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword