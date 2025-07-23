"use client";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class CompanisApiService {
  constructor(_Params = {}) {
    for (const [key, value] of Object.entries(_Params)) {
      this[key] = value;
    }
  }

  getCompanies = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/companies`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default CompanisApiService;
