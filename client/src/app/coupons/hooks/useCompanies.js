'use client'

import { useCallback, useMemo, useState } from "react";
import CompanisApiService from "../services/CompanisApiService";
import useAxios from "@/hooks/Axios/useAxios";
const CompanisInstance = new CompanisApiService();

const useCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useAxios();

    const requestStatus = (loading, errorMessage, companies, company = null) => {
        setLoading(loading);
        setError(errorMessage);
        setCompanies(companies);
        setCompany(company);
      };

    const handleGetCompanies = useCallback(async () => {
            try {
              setLoading(true);
                const companiesdata = await CompanisInstance.getCompanies();
                const convertCompanies = companiesdata.map(company => ({
                    value: company._id,
                    label: company.name
                }));
                
                requestStatus(false, null, convertCompanies);
            } catch (error) {
              requestStatus(false, error, null);
            }
          }, []);

    const value = useMemo(() => {
        return { isLoading, companies, company, error };
      }, [isLoading, companies, company, error]);
    
    return { value, handleGetCompanies };
}

export default useCompanies