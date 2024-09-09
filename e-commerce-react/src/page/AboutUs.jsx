import React from "react";
import Layout from "../component/Layout/Layout";
function AboutUs() {
  return (
    <Layout title={"About Us"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex">
          <div className="flex-shrink-0 w-1/2">
            <img
              src="https://imgs.search.brave.com/noj_Olg-Q6XK0hPQ4rVRIP7JnZfLahcKkS3vbY7C_0Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODcy/NzU2NDI2L3Bob3Rv/L2Fib3V0LXVzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1B/dWtaVXVOaHQzYXAz/Znk4UUlnY192V0E0/VTByN3BWWnBYM1Nh/Ti1IU2trPQ"
              alt="contactus"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-6">
            <p className="text-justify mt-40">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              officiis obcaecati esse tempore unde ratione, eveniet mollitia,
              perferendis eius temporibus dicta blanditiis doloremque explicabo
              quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
              accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
              commodi illum quidem neque tempora nam.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
