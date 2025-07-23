"use client";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class CategoriesApiService {
  constructor(_Params = {}) {
    for (const [key, value] of Object.entries(_Params)) {
      this[key] = value;
    }
  }

  getCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/categories`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default CategoriesApiService;
