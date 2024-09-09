import React from "react";
import Layout from "../component/Layout/Layout";
function Policy() {
  return (
    <Layout title={"Our Policy"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex">
          <div className="flex-shrink-0 w-1/2">
            <img
              src="https://imgs.search.brave.com/kcCDWKoVixrBLLa10iE4yhn56_Frl6MiWMP47ffkBlE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/cml2YWN5LXBvbGlj/eS1pbmZvcm1hdGlv/bi1wcmluY2lwbGUt/c3RyYXRlZ3ktcnVs/ZXMtY29uY2VwdF81/Mzg3Ni0xMjgwNDUu/anBnP3NpemU9NjI2/JmV4dD1qcGc"
              alt="contactus"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-6 ">
            <h1 className="bg-dark p-2 text-white text-center">
              Privacy Policy
            </h1>
            <p className="text-justify mt-40">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              sed ducimus minima necessitatibus possimus iste officia tempora
              non deleniti nesciunt ratione laborum nam iure inventore, facilis
              dignissimos repudiandae quibusdam, nisi laboriosam qui.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
