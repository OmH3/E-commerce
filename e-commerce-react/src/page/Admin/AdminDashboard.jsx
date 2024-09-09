import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { useAuth } from '../../context/authContext'

function AdminDashboard() {
    const [auth] = useAuth()
  return (
    <Layout title={"Admin Dashboard"}>
        <div className='container-fluid m-2 p-2'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                        <h1>Name: {auth?.user?.name}</h1>
                        <h1>Email: {auth?.user?.email}</h1>
                        <h1>Phone: {auth?.user?.phone}</h1>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard