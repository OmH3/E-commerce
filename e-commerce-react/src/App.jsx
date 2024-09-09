import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./page/HomePage";
import Contact from "./page/Contact";
import AboutUs from "./page/AboutUs";
import PageNotFound from "./page/PageNotFound";
import Policy from "./page/Policy";
import Register from "./page/Auth/Register";
import {Toaster} from 'react-hot-toast'
import Login from "./page/Auth/Login";
import Dashboard from "./page/user/Dashboard";
import PrivateRoute from "./component/Routes/PrivateRoute";
import ForgotPassword from "./page/Auth/ForgotPassword";
import AdminRoute from "./component/Routes/AdminRoute";
import AdminDashboard from "./page/Admin/AdminDashboard";
import CreateCategory from "./page/Admin/CreateCategory";
import CreateProduct from "./page/Admin/CreateProduct";
import Users from "./page/Admin/Users";
import Orders from "./page/user/Orders";
import Profile from "./page/user/Profile";
import Products from "./page/Admin/Products";
import UpdateProduct from "./page/Admin/UpdateProduct";
import Search from "./page/Search";
import ProductDetails from "./page/ProductDetails";
import Catgeories from "./page/Catgeories";
import CategoryProduct from "./page/CategoryProduct";
import CartPage from "./page/CartPage";
function App() {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Catgeories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
