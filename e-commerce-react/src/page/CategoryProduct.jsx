import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CategoryProduct() {
    const navigate = useNavigate()
  const params = useParams();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/product-category/${
          params.slug
        }`
      );
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container mt-3">
        <h1 className="text-center">{category?.name}</h1>
        <h1 className="text-center">{products?.length} results found</h1>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${
                    import.meta.env.VITE_API_BASE_URL
                  }/product/product-photo/${p._id}`}
                  className="card-img-top img-fluid"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Load More Button */}
          {/* <div className="text-center mt-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
