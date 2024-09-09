import React from "react";
import Layout from "../component/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
function Contact() {
  return (
    <Layout title={"Contact Us"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex">
          <div className="flex-shrink-0 w-1/2">
            <img
              src="https://imgs.search.brave.com/TUiTMf0cnBMtsXudh2hz2Xtnd8xTlYsx-om9bxiuVRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1waG9uZS1vbi1h/LWJsdWUtYmFja2dy/b3VuZC13aXRoLWNv/bnRhY3QtdXMuanBn/P3dpZHRoPTEwMDAm/Zm9ybWF0PXBqcGcm/ZXhpZj0wJmlwdGM9/MA"
              alt="contactus"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-6">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-20">
              Any query and info about product feel free to call anytime; we are
              available 24/7.
            </p>
            <p className="mt-3 flex items-center">
              <BiMailSend className="mr-2" />: www.help@ecommerceapp.com
            </p>
            <p className="mt-3 flex items-center">
              <BiPhoneCall className="mr-2" />: 012-3456789
            </p>
            <p className="mt-3 flex items-center">
              <BiSupport className="mr-2" />: 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
