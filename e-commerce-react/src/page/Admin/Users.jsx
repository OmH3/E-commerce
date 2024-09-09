import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'

function Users() {
  return (
    <Layout title={"Dashboard - Users"}>
        <div className='container-fluid m-2 p-2'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>Users</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users