import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import UserMenu from "../../component/Layout/UserMenu";
// import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  //   const navigate = useNavigate();
  
  useEffect(()=>{
    const {name,email,password,phone,address} = auth.user
    setName(name)
    setEmail(email)
    setPassword(password)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("Profile Updated Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong.");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#ffdee9] to-[#b5fffc]">
              <h1 className="text-4xl mt-10">USER PROFILE</h1>
              <form
                onSubmit={handleSubmit}
                className="shadow-lg p-5 bg-white mt-3 mb-10"
              >
                <div className="mb-3">
                  <label
                    htmlFor="Name"
                    className="form-label block mt-2 font-bold"
                  >
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
                  <label
                    htmlFor="Email"
                    className="form-label block mt-3 font-bold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control  border-b border-black rounded-none w-full"
                    disabled
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="Password"
                    className="form-label block font-bold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control  border-b border-black rounded-none w-full"
                    disabled
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
                <button
                  type="submit"
                  className="btn w-full mt-4 border border-black rounded-md bg-black text-white"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
