import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../component/Form/CategoryForm";
import { Modal } from "antd";
function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} has been created!`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("OOPS! Something went wrong in input form!");
    }
  };
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/category/get-category`
      );
      console.log("Full API Response: ", data); // Log the entire response object
      console.log(data.success);
      if (data.success) {
        console.log("Categories: ", data.category); // Log category specifically
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
    getAllCategory();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/category/update-category/${
          selected._id
        }`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("OOPS! Something went wrong.");
    }
  };
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`Category has been deleted`);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("OOPS! Something went wrong.");
    }
  };
  return (
    <Layout title={"Dashboard-Category"}>
      <div className="container-fluid m-2 p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-warning ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
