'use client'

import { useCallback, useMemo, useState } from "react";
import CategoriesApiService from "../services/CategoriesApiService";
import useAxios from "@/hooks/Axios/useAxios";
const CategoriesInstance = new CategoriesApiService();

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useAxios();

    const requestStatus = (loading, errorMessage, categories, category = null) => {
        setLoading(loading);
        setError(errorMessage);
        setCategories(categories);
        setCategory(category);
      };

    const handleGetCategories = useCallback(async () => {
            try {
              setLoading(true);
                const categoriesdata = await CategoriesInstance.getCategories();
                const convertCategories = categoriesdata.map(category => ({
                    value: category._id,
                    label: category.name
                }));
                
                requestStatus(false, null, convertCategories);
            } catch (error) {
              requestStatus(false, error, null);
            }
          }, []);

    const value = useMemo(() => {
        return { isLoading, categories, category, error };
      }, [isLoading, categories, category, error]);
    
    return { value, handleGetCategories };
}

export default useCategories