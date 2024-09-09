import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import UserMenu from "../../component/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Date</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>{o?.status}</th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createAt).fromNow()}</th>
                        <th>{o?.payment.success ? "Success" : "Failed"}</th>
                        <th>{o?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p,i) => (
                      <div className="row m-2 card flex-row ">
                        <div className="col-md-4">
                          <img
                            src={`${
                              import.meta.env.VITE_API_BASE_URL
                            }/product/product-photo/${p._id}`}
                            className="card-img-top img-fluid"
                            alt={p.name}
                            height={"100px"}
                            width={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <h4 className="py-2">{p.name}</h4>
                          <p className="py-2">
                            {p.description.substring(0, 30)}
                          </p>
                          <h4 className="py-2">Price: {p.price}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
