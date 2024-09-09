import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
function Header() {
  const activeClassName = "border-b-2 border-white";
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart([]);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully!");
  };
  return (
    <>
      <nav className="bg-dark text-white w-full">
        <div className="container mx-auto flex items-center justify-between p-4">
          <NavLink to="/" className="text-lg font-bold">
            🛒 E-Commerce Website
          </NavLink>
          <SearchInput />
          <div className="flex space-x-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
              to="/"
            >
              Home
            </NavLink>
            <li className="nav-item dropdown relative list-none">
              <Link
                className="nav-link dropdown-toggle cursor-pointer"
                to={"/categories"}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <li>
                  <Link
                    className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    to={`/categories`}
                  >
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link
                      className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                  to="/register"
                >
                  Register
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <li className="nav-item dropdown relative inline-block  hover:text-white">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <NavLink
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </ul>
                </li>
              </>
            )}

            <Badge count={cart?.length} showZero className="text-white">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
                to="/cart"
              >
                Cart
              </NavLink>
            </Badge>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
