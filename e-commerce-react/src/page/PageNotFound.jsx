import React from "react";
import Layout from "../component/Layout/Layout";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error: 404</h1>
          <h2 className="text-xl mb-6">OOPS! Page Not Found!</h2>
          <Link to="/" className="text-blue-500 hover:underline">
            Go Back
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;
