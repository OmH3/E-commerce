import axios from "axios";
import React, { useEffect, useState } from "react";

function useCategory() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}

export default useCategory;
