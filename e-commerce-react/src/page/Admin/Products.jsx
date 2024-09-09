import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/get-product`
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("OOPS! Something went wrong.");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                    <div className="card m-2" style={{ width: "18rem" }} >
                <img src={`${import.meta.env.VITE_API_BASE_URL}/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
                </Link>
              
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
