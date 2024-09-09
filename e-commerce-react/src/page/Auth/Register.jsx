import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
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
    <Layout title={"Register"}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#ffdee9] to-[#b5fffc]">
        <h1 className="text-4xl mt-10">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg p-5 bg-white mt-3 mb-10"
        >
          <div className="mb-3">
            <label htmlFor="Name" className="form-label block mt-2 font-bold">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control border-b border-black rounded-none w-full"
              required
            />
          </div>
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control  border-b border-black rounded-none w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label block font-bold">
              Phone No
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control  border-b border-black rounded-none w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="Address"
              className="form-label block mt-3 font-bold"
            >
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control  border-b border-black rounded-none w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="Answer"
              className="form-label block mt-3 font-bold"
            >
              Answer
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control  border-b border-black rounded-none w-full"
              required
            />
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

export default Register;
