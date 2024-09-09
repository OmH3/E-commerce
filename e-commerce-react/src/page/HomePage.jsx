import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../component/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(false)
  const [cart,setCart] = useCart()
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/product-list/${page}`
      );
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("OOPS! Failed to get Products.");
    }
  };
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      } else {
        console.error("API response did not indicate success", data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("OOPS! Something went wrong in getting category.");
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategory();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const loadMore = async()=>{
    try{
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/product-list/${page}`
      );
      setLoading(false)
      setProducts([...products,...data?.products])
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(page===1) return;
    loadMore()
  },[page])
  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Prices</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger mt-4"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 p-0">
            <h1 className="text-center">All Products</h1>
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
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text">$ {p.price}</p>
                    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1" onClick={()=>{
                      setCart([...cart,p])
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Product added to cart.")
                    }}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Load More Button */}
            <div className="text-center mt-3">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
