import React, { useEffect, useState } from "react";
import AdminMenu from '../../component/Layout/AdminMenu'
import Layout from '../../component/Layout/Layout'
// import UserMenu from "../../component/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import {Select} from 'antd'
const {Option} = Select;
function AdminOrders() {
    const [status,setStatus] = useState(['Not Process','Processing','Shipped'])
    const [changeStatus,setChangeStatus] = useState("")
    const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async(orderId,value)=>{
    try{
      const {data} = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/auth/order-status/${orderId}`,{status:value})
      getOrders()
    }catch(e){
      console,log(e)
    }
  }
  return (
    <Layout title={"All Orders Data"}>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9">
                <h1 className="text-center">All Orders</h1>
                {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select bordered={false} onChange={(val,oId)=>handleChange(o._id,val)} defaultValue={o?.status}>
                            {
                              status.map((s,i)=>(
                                <Option key={i} value={s}>
                                    {s}
                                </Option>
                              ))
                            }
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
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
    </Layout>
  )
}

export default AdminOrders